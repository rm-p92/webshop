require 'json'

class UpdateBooksJob < ApplicationJob
  queue_as :default

  BOOKS_JSON_PATH = Rails.root.join('storage', 'json', 'books.json')

  def perform
    unless File.exist?(BOOKS_JSON_PATH)
      FileUtils.mkdir_p(BOOKS_JSON_PATH.dirname)
      File.write(BOOKS_JSON_PATH, JSON.pretty_generate([]))
    end

    books_json = JSON.parse(File.read(BOOKS_JSON_PATH))
    books_json.each do |book_data|
      book = Book.find_or_initialize_by(id: book_data["id"])
      book.assign_attributes(book_data)
      book.save! if book.changed?
    end

    Rails.logger.info "UpdateBooksJob completed successfully"
  end
end

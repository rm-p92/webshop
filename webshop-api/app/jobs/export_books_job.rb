require 'json'

class ExportBooksJob < ApplicationJob
  queue_as :default

  BOOKS_JSON_PATH = Rails.root.join('storage', 'json', 'db_books.json')

  def perform
    FileUtils.mkdir_p(BOOKS_JSON_PATH.dirname)
    books = Book.all.map do |book|
      book.attributes.except('created_at', 'updated_at')
    end
    File.write(BOOKS_JSON_PATH, JSON.pretty_generate(books))

    Rails.logger.info "ExportBooksJob completed successfully"
  end
end
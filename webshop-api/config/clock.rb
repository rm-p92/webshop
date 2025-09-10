require_relative '../config/environment'

module Clockwork
  every(1.day, 'update.books.job') do
    UpdateBooksJob.perform_later
  end

  # every(1.day, 'export.books.job') do
  #   ExportBooksJob.perform_later
  # end
end
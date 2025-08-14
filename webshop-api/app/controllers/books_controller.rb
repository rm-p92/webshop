class BooksController < ApplicationController
  def index
    @books = Book.includes(genre: :parent, author: {})

    render json: @books.as_json(
      only: [:title, :description, :price, :cover_image],
      methods: [:genre_hierarchy],
      include: {
        author: { only: [:name] }
      }
    )
  end
end

class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]
  before_action :authorize, only: [:create, :update, :destroy]
  before_action :require_admin, only: [:create, :update, :destroy]

  def index
    @books = Book.includes(genre: :parent, author: {})
    render json: @books.as_json(
      only: [:id, :title, :description, :price, :cover_image],
      methods: [:genre_hierarchy],
      include: { author: { only: [:name] } }
    )
  end

  def show
    render json: @book.as_json(
      only: [:id, :title, :description, :price, :cover_image],
      methods: [:genre_hierarchy],
      include: { author: { only: [:name] } }
    )
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: @book, status: :created
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @book.destroy
    head :no_content
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :description, :cover_image, :price, :author_id, :genre_id)
  end

  def require_admin
    unless current_user&.role&.name == "admin"
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end
end

class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  def index
    authorize! Book, to: :index?
    @books = Book.includes(genre: :parent, author: {})
    @books = @books.by_genre(params[:genre_id]) if params[:genre_id].present?
    @books = @books.by_author(params[:author_id]) if params[:author_id].present?
    if params[:search].present?
      search_term = "%#{params[:search]}%"
      @books = @books.joins(:genre, :author).where(
        "books.title LIKE :search OR books.description LIKE :search OR genres.name LIKE :search OR authors.name LIKE :search",
        search: search_term
      )
    end
    @books = @books.page(params[:page]).per(params[:per_page] || 12)
    render json: {
      books: @books,
      total_pages: @books.total_pages,
      current_page: @books.current_page,
      total_count: @books.total_count
    }
  end

  def show
    authorize! @book, to: :index?
    render json: @book
  end

  def create
    authorize! Book, to: :create?
    @book = Book.new(book_params)
    if @book.save
      render json: @book, status: :created
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_content
    end
  end

  def update
    authorize! @book, to: :update?
    if @book.update(book_params)
      render json: @book
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    authorize! @book, to: :destroy?
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
end

class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  def index
    authorize! Book, to: :index?
    @books = Book.includes(genre: :parent, author: {})
    if params[:search].present?
      search_term = "%#{params[:search]}%"
      @books = @books.joins(:genre, :author).where(
        "books.title LIKE :search OR books.description LIKE :search OR genres.name LIKE :search OR authors.name LIKE :search",
        search: search_term
      )
    end
    render json: @books.as_json(
      only: [:id, :title, :description, :price, :cover_image],
      methods: [:genre_hierarchy],
      include: { author: { only: [:name] } }
    )
  end

  def show
    authorize! @book, to: :index?
    render json: @book.as_json(
      only: [:id, :title, :description, :price, :cover_image],
      methods: [:genre_hierarchy],
      include: { author: { only: [:name] } }
    )
  end

  def create
    authorize! Book, to: :create?
    @book = Book.new(book_params)
    if @book.save
      render json: @book, status: :created
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    authorize! @book, to: :update?
    if @book.update(book_params)
      render json: @book
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
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

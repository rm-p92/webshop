class GenresController < ApplicationController
  def index
    authorize! Genre, to: :index?
    genres = Genre.all.select(:id, :name)
    render json: genres
  end
end
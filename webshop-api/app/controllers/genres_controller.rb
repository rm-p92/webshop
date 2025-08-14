class GenresController < ApplicationController
  def index
    genres = Genre.all.select(:id, :name)
    render json: genres
  end
end
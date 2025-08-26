class AuthorsController < ApplicationController
  def index
    authorize! Author, to: :index?
    authors = Author.all.select(:id, :name)
    render json: authors
  end
end
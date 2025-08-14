class AuthorsController < ApplicationController
  def index
    authors = Author.all.select(:id, :name)
    render json: authors
  end
end
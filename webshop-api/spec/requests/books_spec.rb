require 'rails_helper'
require 'faker'

RSpec.describe "Books API", type: :request do

	let!(:author) { Author.create!(name: Faker::Book.unique.author) }
	let!(:genre) { Genre.create!(name: Faker::Book.unique.genre) }
	let!(:book1) { Book.create!(title: Faker::Book.unique.title, price: 10, author: author, genre: genre) }
	let!(:book2) { Book.create!(title: Faker::Book.unique.title, price: 20, author: author, genre: genre) }
		before do
		allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true)
	end

	describe "GET /books" do
		it "returns a list of books" do
			get "/books"
			expect(response).to have_http_status(:ok)
			json = JSON.parse(response.body)
			expect(json).to be_an(Array)
			expect(json.size).to be >= 2
			expect(json.map { |b| b["title"] }).to include(book1.title, book2.title)
			expect(json.first).to have_key("title")
		end
	end

	describe "GET /books/:id" do
		it "returns a single book" do
			get "/books/#{book1.id}"
			expect(response).to have_http_status(:ok)
			json = JSON.parse(response.body)
			expect(json["title"]).to eq(book1.title)
		end

		it "returns 404 if book not found" do
			get "/books/999999"
			expect(response).to have_http_status(:not_found).or have_http_status(:unprocessable_content)
		end
	end

	describe "POST /books" do
		it "creates a new book" do
			book_params = {
				title: Faker::Book.unique.title,
				price: 30,
				author_id: author.id,
				genre_id: genre.id
			}
			post "/books", params: { book: book_params }
			expect(response).to have_http_status(:created)
			json = JSON.parse(response.body)
			expect(json["title"]).to eq(book_params[:title])
		end

		it "returns errors if book is invalid" do
			post "/books", params: { book: { title: '', price: nil } }
			expect(response).to have_http_status(:unprocessable_content).or have_http_status(:unprocessable_content)
			json = JSON.parse(response.body)
			expect(json["errors"]).to be_present
		end
	end

	describe "PUT /books/:id" do
		it "updates a book" do
			put "/books/#{book1.id}", params: { book: { title: 'Updated Title' } }
			expect(response).to have_http_status(:ok)
			json = JSON.parse(response.body)
			expect(json["title"]).to eq('Updated Title')
		end

		it "returns errors if update is invalid" do
			put "/books/#{book1.id}", params: { book: { title: '' } }
			expect(response).to have_http_status(:unprocessable_content).or have_http_status(:unprocessable_content)
			json = JSON.parse(response.body)
			expect(json["errors"]).to be_present
		end
	end

	describe "DELETE /books/:id" do
		it "deletes a book" do
			expect {
				delete "/books/#{book1.id}"
			}.to change { Book.count }.by(-1)
			expect(response).to have_http_status(:no_content)
		end
	end
end
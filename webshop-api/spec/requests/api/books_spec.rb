require 'openapi_helper'

describe 'Books API', swagger_doc: 'v1/swagger.yaml', type: :request do
	path '/books' do
		get 'Retrieves books' do
			tags 'Books'
			produces 'application/json'
			    response '200', 'books found' do
                schema type: :array,
                items: {
                    type: :object,
                    properties: {
                    id: { type: :integer },
                    title: { type: :string },
                    description: { type: :string },
                    price: { type: :string },
                    cover_image: { type: :string, nullable: true },
                    genre_hierarchy: {
                        type: :array,
                        items: { type: :string }
                    },
                    author: {
                        type: :object,
                        properties: {
                        id: { type: :integer },
                        name: { type: :string }
                        },
                        required: ['id', 'name']
                    }
                    },
                    required: [ 'id', 'title', 'description', 'price', 'cover_image', 'genre_hierarchy', 'author' ]
                }
                run_test!
                end
		end

		post 'Creates a book' do
			tags 'Books'
			consumes 'application/json'
			parameter name: 'book', in: :body, schema: {
				type: :object,
				properties: {
					title: { type: :string },
					description: { type: :string },
					cover_image: { type: :string, nullable: true },
					price: { type: :number },
					author_id: { type: :integer },
					genre_id: { type: :integer }
				},
				required: [ 'title', 'description', 'price', 'author_id', 'genre_id' ]
			}
			response '201', 'book created' do
				let(:book) { { title: 'Sample Book', description: 'A book', price: 9.99, author_id: 1, genre_id: 1 } }
				run_test!
			end
			response '422', 'invalid request' do
				let(:book) { { title: '', description: '', price: nil, author_id: nil, genre_id: nil } }
				run_test!
			end
		end
	end

	path '/books/{id}' do
			get 'Retrieves a book' do
				tags 'Books'
				produces 'application/json'
				parameter name: 'id', in: :path, type: :integer
                response '200', 'book found' do
                schema type: :object,
                properties: {
                    id: { type: :integer },
                    title: { type: :string },
                    description: { type: :string },
                    price: { type: :string },
                    cover_image: { type: :string, nullable: true },
                    genre_hierarchy: {
                    type: :array,
                    items: { type: :string }
                    },
                    author: {
                    type: :object,
                    properties: {
                        id: { type: :integer },
                        name: { type: :string }
                    },
                    required: ['id', 'name']
                    }
                },
                required: [ 'id', 'title', 'description', 'price', 'cover_image', 'genre_hierarchy', 'author' ]
                let(:id) { Book.create(title: 'Sample', description: 'A book', price: '9.99', cover_image: 'https://placehold.co/300x400?text=Sample', author_id: 1, genre_id: 1).id }
                run_test!
                end
			response '404', 'book not found' do
				let(:id) { 'invalid' }
				run_test!
			end
		end

			put 'Updates a book' do
				tags 'Books'
				consumes 'application/json'
				parameter name: 'id', in: :path, type: :integer
				parameter name: 'book', in: :body, schema: {
				type: :object,
				properties: {
					title: { type: :string },
					description: { type: :string },
					cover_image: { type: :string, nullable: true },
					price: { type: :number },
					author_id: { type: :integer },
					genre_id: { type: :integer }
				}
			}
			response '200', 'book updated' do
				let(:id) { Book.create(title: 'Sample', description: 'A book', price: 9.99, author_id: 1, genre_id: 1).id }
				let(:book) { { title: 'Updated Title' } }
				run_test!
			end
			response '422', 'invalid request' do
				let(:id) { Book.create(title: 'Sample', description: 'A book', price: 9.99, author_id: 1, genre_id: 1).id }
				let(:book) { { title: '' } }
				run_test!
			end
		end

		delete 'Deletes a book' do
			tags 'Books'
			parameter name: 'id', in: :path, type: :integer
			response '204', 'book deleted' do
				let(:id) { Book.create(title: 'Sample', description: 'A book', price: 9.99, author_id: 1, genre_id: 1).id }
				run_test!
			end
			response '404', 'book not found' do
				let(:id) { 'invalid' }
				run_test!
			end
		end
	end
end

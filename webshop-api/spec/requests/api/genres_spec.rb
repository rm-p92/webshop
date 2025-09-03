require 'openapi_helper'

describe 'Genres API', swagger_doc: 'v1/swagger.yaml', type: :request do
    path '/genres' do
        get 'Retrieves genres' do
        tags 'Genres'
        produces 'application/json'
        response '200', 'genres found' do
            schema type: :object,
            properties: {
            id: { type: :integer },
            name: { type: :string }
            },
            required: [ 'id', 'name' ]

            run_test!
        end
        end
    end
end
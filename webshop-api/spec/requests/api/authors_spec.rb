
require 'openapi_helper'

describe 'Authors API', swagger_doc: 'v1/swagger.yaml', type: :request do
    path '/authors' do
        get 'Retrieves authors' do
            tags 'Authors'
            produces 'application/json'
            response '200', 'authors found' do
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
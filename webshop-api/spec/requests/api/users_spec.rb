require 'openapi_helper'

describe 'Users API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/signup' do
    post 'User signup' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
          name: { type: :string }
        },
        required: ['email', 'password']
      }
      response '201', 'user created' do
        let(:user) { { email: 'newuser@example.com', password: 'password', name: 'New User' } }
        run_test!
      end
      response '422', 'invalid request' do
        let(:user) { { email: '', password: '', name: '' } }
        run_test!
      end
    end
  end
end

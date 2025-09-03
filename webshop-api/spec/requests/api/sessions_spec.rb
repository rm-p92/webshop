require 'openapi_helper'

describe 'Authentication API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/login' do
    post 'User login' do
      tags 'Authentication'
      consumes 'application/json'
      parameter name: :login, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: ['email', 'password']
      }
      response '200', 'successful login' do
        let(:login) { { email: 'user@example.com', password: 'password' } }
        before { allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true) }
        run_test!
      end
      response '401', 'invalid email or password' do
        let(:login) { { email: 'user@example.com', password: 'wrongpassword' } }
        before { allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true) }
        run_test!
      end
    end
  end
end

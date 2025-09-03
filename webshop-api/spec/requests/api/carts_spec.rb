require 'openapi_helper'

describe 'Carts API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/cart' do
    get 'Show cart' do
      tags 'Cart'
      produces 'application/json'
      response '200', 'cart found' do
        run_test!
      end
    end
  end

  path '/cart/add' do
    post 'Add item to cart' do
      tags 'Cart'
      consumes 'application/json'
      response '200', 'item added' do
        run_test!
      end
    end
  end

  path '/cart/update/{id}' do
    put 'Update cart item' do
      tags 'Cart'
      consumes 'application/json'
      parameter name: 'id', in: :path, type: :integer
      response '200', 'item updated' do
        run_test!
      end
      response '404', 'item not found' do
        run_test!
      end
    end
  end

  path '/cart/remove/{id}' do
    delete 'Remove cart item' do
      tags 'Cart'
      parameter name: 'id', in: :path, type: :integer
      response '204', 'item removed' do
        run_test!
      end
      response '404', 'item not found' do
        run_test!
      end
    end
  end
end

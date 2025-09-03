require 'openapi_helper'

describe 'Orders API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/orders' do
    get 'List orders' do
      tags 'Orders'
      produces 'application/json'
      response '200', 'orders found' do
        run_test!
      end
    end
    post 'Create order' do
      tags 'Orders'
      consumes 'application/json'
      response '201', 'order created' do
        run_test!
      end
    end
  end

  path '/orders/{id}' do
    get 'Show order' do
      tags 'Orders'
      produces 'application/json'
      parameter name: 'id', in: :path, type: :integer
      response '200', 'order found' do
        run_test!
      end
      response '404', 'order not found' do
        run_test!
      end
    end
    put 'Update order' do
      tags 'Orders'
      consumes 'application/json'
      parameter name: 'id', in: :path, type: :integer
      response '200', 'order updated' do
        run_test!
      end
      response '422', 'invalid request' do
        run_test!
      end
    end
    delete 'Delete order' do
      tags 'Orders'
      parameter name: 'id', in: :path, type: :integer
      response '204', 'order deleted' do
        run_test!
      end
      response '404', 'order not found' do
        run_test!
      end
    end
  end

  path '/orders/all' do
    get 'Get all orders' do
      tags 'Orders'
      produces 'application/json'
      response '200', 'all orders found' do
        run_test!
      end
    end
  end
end

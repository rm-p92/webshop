require 'rails_helper'

RSpec.describe "Orders API", type: :request do
  let(:user) { create(:user) }
  let!(:cart) { create(:cart, user: user) }
  let!(:book) { create(:book) }
  let!(:cart_item) { create(:cart_item, cart: cart, book: book, quantity: 1) }
  let(:order) { create(:order, user: user) }
  before do
    allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true)
    allow_any_instance_of(OrdersController).to receive(:current_user).and_return(user)
  end

  describe "GET /orders" do
    it "returns a list of orders" do
      create_list(:order, 2, user: user)
      get "/orders"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
    end
  end

  describe "GET /orders/:id" do
    it "returns a single order" do
      get "/orders/#{order.id}"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to have_key("id")
    end
  end

  describe "POST /orders" do
    it "creates a new order" do
      post "/orders", params: { order: { user_id: user.id } }
      expect([200, 201]).to include(response.status)
      json = JSON.parse(response.body)
      expect(json).to have_key("id")
    end
  end

  describe "PUT /orders/:id" do
    it "updates an order" do
      put "/orders/#{order.id}", params: { status: 'completed' }
      expect(response.status).to eq(200)
      json = JSON.parse(response.body)
      expect(json["status"]).to eq('completed').or eq(json.dig("order", "status"))
    end
  end

  describe "DELETE /orders/:id" do
    it "deletes an order" do
      delete "/orders/#{order.id}"
      expect([200, 204]).to include(response.status)
    end
  end

  describe "GET /orders/all" do
    it "returns all orders (admin only)" do
      get "/orders/all"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
    end
  end
end
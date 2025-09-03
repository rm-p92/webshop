require 'rails_helper'

RSpec.describe "Cart API", type: :request do
  let(:user) { create(:user) }
  let!(:cart) { create(:cart, user: user) }
  let(:book) { create(:book) }
  before do
    allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true)
    allow_any_instance_of(CartsController).to receive(:current_user).and_return(user)
  end

  describe "GET /cart" do
    it "returns the current user's cart" do
      cart
      get "/cart"
      expect(response.status).to eq(200)
      json = JSON.parse(response.body)
      expect(json).to have_key("cart_items")
    end
  end

  describe "POST /cart/add" do
    it "adds an item to the cart" do
      cart
      post "/cart/add", params: { book_id: book.id, quantity: 2 }
      expect([200, 201]).to include(response.status)
      json = JSON.parse(response.body)
      expect(json).to have_key("cart_items")
    end
  end

  describe "PUT /cart/update/:id" do
    let!(:cart_item) { create(:cart_item, cart: cart, book: book, quantity: 1) }
    it "updates a cart item" do
      put "/cart/update/#{cart_item.id}", params: { quantity: 3 }
      expect(response.status).to eq(200)
      json = JSON.parse(response.body)
      expect(json["quantity"]).to eq(3).or eq(json.dig("cart_item", "quantity"))
    end
  end

  describe "DELETE /cart/remove/:id" do
    let!(:cart_item) { create(:cart_item, cart: cart, book: book, quantity: 1) }
    it "removes a cart item" do
      delete "/cart/remove/#{cart_item.id}"
      expect([200, 204]).to include(response.status)
    end
  end
end
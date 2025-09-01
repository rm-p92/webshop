require 'rails_helper'

RSpec.describe Cart, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:cart_items).dependent(:destroy) }
  end

  describe '#total_price' do
    it 'returns the total price of all cart items' do
      user = create(:user)
      cart = create(:cart, user: user)
      book1 = create(:book, price: 10)
      book2 = create(:book, price: 20)
      create(:cart_item, cart: cart, book: book1, quantity: 2)
      create(:cart_item, cart: cart, book: book2, quantity: 1)
      expect(cart.total_price).to eq(40)
    end
  end
end
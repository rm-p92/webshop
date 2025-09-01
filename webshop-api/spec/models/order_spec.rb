require 'rails_helper'

RSpec.describe Order, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:order_items).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:status) }

    it 'defines the correct enum values' do
      expect(Order.statuses.keys).to match_array(%w[pending paid processing shipped completed cancelled])
    end
  end

  describe '#total_price' do
    it 'returns the total price of all order items' do
      user = create(:user)
      order = create(:order, user: user, status: 'pending')
      book1 = create(:book, price: 15)
      book2 = create(:book, price: 25)
      create(:order_item, order: order, book: book1, quantity: 2, price: 15)
      create(:order_item, order: order, book: book2, quantity: 1, price: 25)
      expect(order.total_price).to eq(55)
    end
  end
end
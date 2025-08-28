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
      user = User.create!(email: 'order@example.com', password: 'password', role: Role.create!(name: 'customer'))
      order = Order.create!(user: user, status: 'pending')
      author = Author.create!(name: 'A B')
      genre = Genre.create!(name: 'Fiction')
      book1 = Book.create!(title: 'Book 1', price: 15, author: author, genre: genre)
      book2 = Book.create!(title: 'Book 2', price: 25, author: author, genre: genre)
      OrderItem.create!(order: order, book: book1, quantity: 2, price: 15)
      OrderItem.create!(order: order, book: book2, quantity: 1, price: 25)
      expect(order.total_price).to eq(55)
    end
  end
end
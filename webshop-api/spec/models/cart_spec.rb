require 'rails_helper'

RSpec.describe Cart, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:cart_items).dependent(:destroy) }
  end

  describe '#total_price' do
    it 'returns the total price of all cart items' do
      user = User.create!(email: 'test@example.com', password: 'password', role: Role.create!(name: 'customer'))
      cart = Cart.create!(user: user)
      author = Author.create!(name: 'A B')
      genre = Genre.create!(name: 'Fiction')
      book1 = Book.create!(title: 'Book 1', price: 10, author: author, genre: genre)
      book2 = Book.create!(title: 'Book 2', price: 20, author: author, genre: genre)
      CartItem.create!(cart: cart, book: book1, quantity: 2)
      CartItem.create!(cart: cart, book: book2, quantity: 1)
      expect(cart.total_price).to eq(40)
    end
  end
end
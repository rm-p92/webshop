require 'rails_helper'

RSpec.describe Book, type: :model do
  describe 'associations' do
    it { should belong_to(:author) }
    it { should belong_to(:genre) }
  end

  describe '#genre_hierarchy' do
    it 'returns the genre hierarchy from root to leaf' do
      root = Genre.create!(name: 'Fiction')
      child = Genre.create!(name: 'Fantasy', parent: root)
      leaf = Genre.create!(name: 'Epic', parent: child)
      book = Book.new(genre: leaf)
      allow(book).to receive(:genre).and_return(leaf)
      expect(book.genre_hierarchy).to eq(['Fiction', 'Fantasy', 'Epic'])
    end

    it 'returns only the genre if there is no parent' do
      genre = Genre.create!(name: 'Nonfiction')
      book = Book.new(genre: genre)
      allow(book).to receive(:genre).and_return(genre)
      expect(book.genre_hierarchy).to eq(['Nonfiction'])
    end
  end
end
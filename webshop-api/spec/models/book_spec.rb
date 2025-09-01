require 'rails_helper'

RSpec.describe Book, type: :model do
  describe 'associations' do
    it { should belong_to(:author) }
    it { should belong_to(:genre) }
  end

  describe '#genre_hierarchy' do
    it 'returns the genre hierarchy from root to leaf' do
      root = create(:genre, name: 'Fiction')
      child = create(:genre, name: 'Fantasy', parent: root)
      leaf = create(:genre, name: 'Epic', parent: child)
      book = build(:book, genre: leaf)
      allow(book).to receive(:genre).and_return(leaf)
      expect(book.genre_hierarchy).to eq(['Fiction', 'Fantasy', 'Epic'])
    end

    it 'returns only the genre if there is no parent' do
      genre = create(:genre, name: 'Nonfiction')
      book = build(:book, genre: genre)
      allow(book).to receive(:genre).and_return(genre)
      expect(book.genre_hierarchy).to eq(['Nonfiction'])
    end
  end
end
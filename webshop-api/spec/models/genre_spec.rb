require 'rails_helper'

RSpec.describe Genre, type: :model do
  describe 'associations' do
    it { should belong_to(:parent).class_name('Genre').optional }
    it { should have_many(:children).class_name('Genre').with_foreign_key('parent_id') }
  end

  describe '#ancestors' do
    it 'returns the list of ancestors from root to immediate parent' do
      root = Genre.create!(name: 'Fiction')
      child = Genre.create!(name: 'Fantasy', parent: root)
      leaf = Genre.create!(name: 'Epic', parent: child)
      expect(leaf.ancestors).to eq([root, child])
    end

    it 'returns an empty array if there is no parent' do
      genre = Genre.create!(name: 'Nonfiction')
      expect(genre.ancestors).to eq([])
    end
  end
end
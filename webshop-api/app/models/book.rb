class Book < ApplicationRecord
  belongs_to :author
  belongs_to :genre

  validates :title, presence: true
  
  scope :by_genre, ->(genre_id) { where(genre_id: genre_id) }
  scope :by_author, ->(author_id) { where(author_id: author_id) }

  def genre_hierarchy
    node = genre
    list = []
    while node
      list << node.name
      node = node.parent
    end
    list.reverse
  end
end
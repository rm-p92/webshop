class Book < ApplicationRecord
  belongs_to :author
  belongs_to :genre

  validates :title, presence: true

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

class Genre < ApplicationRecord
  belongs_to :parent, class_name: "Genre", optional: true
  has_many :children, class_name: "Genre", foreign_key: "parent_id"

  def ancestors
    node = self
    list = []
    while node.parent
      list << node.parent
      node = node.parent
    end
    list.reverse # from root to immediate parent
  end
end
class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :cover_image, :genre_hierarchy
  belongs_to :author
end
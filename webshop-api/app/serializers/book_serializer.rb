class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :cover_image, :genre_hierarchy
  belongs_to :author
end
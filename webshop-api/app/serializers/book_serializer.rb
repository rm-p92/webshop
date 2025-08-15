class BookSerializer < ActiveModel::Serializer
    attributes :id, :title, :price, :cover_image
end
class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  belongs_to :book
end
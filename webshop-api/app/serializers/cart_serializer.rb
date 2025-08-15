class CartSerializer < ActiveModel::Serializer
  attributes :id, :total

  has_many :cart_items

  def total
    object.cart_items.sum { |i| i.quantity * i.book.price }
  end
end
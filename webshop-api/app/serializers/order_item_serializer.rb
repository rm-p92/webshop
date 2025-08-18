class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :price, :subtotal

  belongs_to :book

  def subtotal
    (object.quantity * object.price.to_f).round(2)
  end
end

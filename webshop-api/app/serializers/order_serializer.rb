class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :total_price, :created_at, :updated_at

  has_many :order_items
  belongs_to :user

  def total_price
    object.order_items.sum { |item| item.quantity * item.price.to_f }.round(2)
  end
end

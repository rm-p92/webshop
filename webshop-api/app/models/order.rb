class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items, dependent: :destroy

  enum :status, {
    pending: "pending",
    paid: "paid",
    processing: "processing",
    shipped: "shipped",
    completed: "completed",
    cancelled: "cancelled"
  }

  validates :status, presence: true, inclusion: { in: statuses.keys }

  def total_price
    order_items.sum("quantity * price")
  end
end

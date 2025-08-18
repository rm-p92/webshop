class User < ApplicationRecord
  belongs_to :role
  has_secure_password

  has_one :cart, dependent: :destroy
  has_many :orders

  validates :email, presence: true, uniqueness: true

  after_create :create_cart

  private

  def create_cart
      Cart.create(user: self)
  end
end
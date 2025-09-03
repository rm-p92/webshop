class User < ApplicationRecord
  belongs_to :role
  has_secure_password

  has_one :cart, dependent: :destroy
  has_many :orders

  validates :email, presence: true, uniqueness: { case_sensitive: false }

  def role?(name)
    role&.name == name.to_s
  end

  def admin?  = role?(:admin)
  def customer? = role?(:customer)
end
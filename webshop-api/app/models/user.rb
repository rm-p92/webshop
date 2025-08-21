class User < ApplicationRecord
  belongs_to :role
  has_secure_password

  has_one :cart, dependent: :destroy
  has_many :orders

  validates :email, presence: true, uniqueness: true
end
FactoryBot.define do
  factory :cart_item do
    association :cart
    association :book
    quantity { rand(1..3) }
  end
end
FactoryBot.define do
  factory :order_item do
    association :order
    association :book
    quantity { rand(1..3) }
    price { Faker::Commerce.price(range: 5..100) }
  end
end
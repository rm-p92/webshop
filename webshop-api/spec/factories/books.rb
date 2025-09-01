FactoryBot.define do
  factory :book do
    title { Faker::Book.unique.title }
    price { Faker::Commerce.price(range: 5..100) }
    association :author
    association :genre
  end
end
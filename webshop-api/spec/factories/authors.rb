FactoryBot.define do
  factory :author do
    name { Faker::Book.unique.author }
  end
end
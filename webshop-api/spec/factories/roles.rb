FactoryBot.define do
  factory :role do
    name { %w[customer admin].sample }
  end
end
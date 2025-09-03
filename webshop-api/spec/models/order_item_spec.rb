require 'rails_helper'

RSpec.describe OrderItem, type: :model do
  describe 'associations' do
    it { should belong_to(:order) }
    it { should belong_to(:book) }
  end

  describe 'validations' do
    it { should validate_numericality_of(:quantity).is_greater_than(0) }
  end
end
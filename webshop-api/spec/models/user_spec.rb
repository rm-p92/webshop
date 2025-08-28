require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should belong_to(:role) }
    it { should have_one(:cart).dependent(:destroy) }
    it { should have_many(:orders) }
  end

  describe 'validations' do
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }
  end

  describe 'role methods' do
    let(:admin_role) { Role.find_or_create_by!(name: 'admin') }
    let(:customer_role) { Role.find_or_create_by!(name: 'customer') }

    it 'returns true if the user is admin' do
      user = User.new(role: admin_role)
      expect(user.admin?).to be true
    end

    it 'returns true if the user is customer' do
      user = User.new(role: customer_role)
      expect(user.customer?).to be true
    end

    it 'returns false if the user is not admin' do
      user = User.new(role: customer_role)
      expect(user.admin?).to be false
    end

    it 'returns false if the user is not customer' do
      user = User.new(role: admin_role)
      expect(user.customer?).to be false
    end
  end

  describe '#role?' do
    let(:role) { Role.find_or_create_by!(name: 'manager') }
    let(:user) { User.new(role: role) }

    it 'returns true if the user has the given role' do
      expect(user.role?(:manager)).to be true
    end

    it 'returns false if the user does not have the given role' do
      expect(user.role?(:admin)).to be false
    end
  end
end
class UserPolicy < ApplicationPolicy
  def show?
    record.id == user.id
  end

  def create?
    puts "UserPolicy#create? called"
    true
  end
end
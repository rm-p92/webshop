class UserPolicy < ApplicationPolicy
  def show?
    record.id == user.id
  end

  def create?
    true
  end
end
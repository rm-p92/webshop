class CartPolicy < ApplicationPolicy
  def show?
    user.present? && (record.user_id == user.id || admin?)
  end

  def update?
    show?
  end

  def destroy?
    admin?
  end

  def create?
    user.present?
  end
end

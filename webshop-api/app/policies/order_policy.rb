class OrderPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def get_all_orders?
    admin?
  end

  def show?
    admin? || record.user_id == user.id
  end

  def create?
    user.present?
  end

  def update?
    admin?
  end

  def destroy?
    admin?
  end
end

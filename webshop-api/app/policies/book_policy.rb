class BookPolicy < ApplicationPolicy
  def index?
    true;
  end;

  def create?
    admin?
  end

  def update?
    admin?
  end

  def destroy?
    admin?
  end
end

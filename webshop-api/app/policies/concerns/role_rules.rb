module RoleRules
  extend ActiveSupport::Concern

  included do
    private

    def admin?  = user&.admin?
    def customer? = user&.customer?
  end
end

class ApplicationPolicy < ActionPolicy::Base
  include RoleRules
  authorize :user, optional: true
end
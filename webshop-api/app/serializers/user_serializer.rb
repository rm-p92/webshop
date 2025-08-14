class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :role_name

  def role_name
    object.role&.name
  end
end

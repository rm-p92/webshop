class UsersController < ApplicationController
  before_action :authorize, only: [:show]

  def create
    user = User.new(user_params)
    user.role = Role.find_by(name: 'customer')
    if user.save
      Cart.create(user: user)
      token = encode_token({ user_id: user.id })
      render json: { user: UserSerializer.new(user), jwt: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: current_user
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password)
  end
end

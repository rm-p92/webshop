class SessionsController < ApplicationController
  def create
    authorize! User, to: :create?
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { user: UserSerializer.new(user), jwt: token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def show
    authorize! current_user, to: :show?
    render json: current_user
  end
end

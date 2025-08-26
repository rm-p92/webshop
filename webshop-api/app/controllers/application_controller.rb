class ApplicationController < ActionController::API
  include ActionPolicy::Behaviour
  authorize :user, through: :current_user

  SECRET_KEY = ENV['JWT_SECRET_KEY'] || Rails.application.secret_key_base
  
  rescue_from ActionPolicy::Unauthorized do |ex|
    reasons = ex.result&.reasons&.to_h&.values&.first&.first
    message = if reasons.is_a?(Array)
      I18n.t(["action_policy.unauthorized", *reasons].join("."), default: I18n.t("action_policy.unauthorized.default"))
    else
      I18n.t("action_policy.unauthorized.default")
    end
    render json: { error: message }, status: :forbidden
  end

  def encode_token(payload)
    JWT.encode(payload, SECRET_KEY)
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    return unless auth_header

    token = auth_header.split(' ')[1]
    begin
      JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256')
    rescue JWT::DecodeError
      nil
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @current_user ||= User.find_by(id: user_id)
    end
  end
end

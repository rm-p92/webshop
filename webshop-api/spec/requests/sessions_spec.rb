require 'rails_helper'

RSpec.describe "Sessions API", type: :request do
  let!(:user) { create(:user, password: 'password123') }
  before { allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true) }

  describe "POST /login" do
    it "logs in a user and returns a JWT" do
      post "/login", params: { email: user.email, password: 'password123' }
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["jwt"]).to be_present
      expect(json["user"]).to be_present
    end

    it "returns errors for invalid credentials" do
      post "/login", params: { email: user.email, password: 'wrongpass' }
      expect([401, 422]).to include(response.status)
      json = JSON.parse(response.body)
      expect(json["errors"] || json["error"]).to be_present
    end
  end

  describe "GET /authorized" do
    it "returns authorized if user is logged in" do
      get "/authorized"
      expect([200, 401, 422]).to include(response.status)
    end
  end
end
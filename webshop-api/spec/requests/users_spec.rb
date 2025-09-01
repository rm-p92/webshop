require 'rails_helper'
require 'faker'

RSpec.describe "Users API", type: :request do
	let!(:role) { Role.create!(name: 'customer') }

	before do
		allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true)
	end

	describe "POST /signup" do
        puts "RAILS_ENV: #{Rails.env}"
			it "creates a new user and returns user and jwt" do
				email = Faker::Internet.unique.email
				password = Faker::Internet.password(min_length: 8)
				user_params = { email: email, password: password }
				post "/signup", params: user_params
				expect(response).to have_http_status(:created)
				json = JSON.parse(response.body)
				expect(json["user"]).to be_present
				expect(json["user"]["email"]).to eq(email)
				expect(json["jwt"]).to be_present
			end

		it "returns errors if user is invalid" do
			post "/signup", params: { email: '', password: '' }
			expect(response).to have_http_status(:unprocessable_content)
			json = JSON.parse(response.body)
			expect(json["errors"]).to be_present
		end
	end

	describe "GET /user" do
		let!(:user) { User.create!(email: Faker::Internet.unique.email, password: Faker::Internet.password(min_length: 8), role: role) }

		before do
			allow_any_instance_of(UsersController).to receive(:current_user).and_return(user)
		end

		it "returns the current user" do
			get "/user"
			expect(response).to have_http_status(:ok)
			json = JSON.parse(response.body)
			expect(json["email"]).to eq(user.email)
		end
	end
end
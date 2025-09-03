require 'rails_helper'

RSpec.describe "Genres API", type: :request do
  before { allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true) }

  describe "GET /genres" do
    it "returns a list of genres" do
      create_list(:genre, 3)
      get "/genres"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.size).to be >= 3
      expect(json.first).to have_key("name")
    end
  end
end
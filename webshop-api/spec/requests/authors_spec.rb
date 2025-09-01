require 'rails_helper'

RSpec.describe "Authors API", type: :request do
  before { allow_any_instance_of(ApplicationController).to receive(:authorize!).and_return(true) }

  describe "GET /authors" do
    it "returns a list of authors" do
      create_list(:author, 3)
      get "/authors"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.size).to be >= 3
      expect(json.first).to have_key("name")
    end
  end
end
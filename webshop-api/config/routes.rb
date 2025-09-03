Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  
  get "books/index"
  # resources :users
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/authorized", to: "sessions#show"
  get "/user", to: "users#show"

  resources :authors, only: [:index]
  resources :genres, only: [:index]

  resources :books, only: [:index, :show, :create, :update, :destroy]

  get "/cart", to: "carts#show"
  post "/cart/add", to: "carts#add_item"
  put "/cart/update/:id", to: "carts#update_item"
  delete "/cart/remove/:id", to: "carts#remove_item"

  resources :orders, only: [:index, :show, :create, :update, :destroy] do
    collection do
      get :all, to: "orders#get_all_orders"
    end
  end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

Rails.application.routes.draw do
  
  resources :lineups
 
 
  get '/players', to: 'lineups#get_players'
 get '/names/:id', to: 'lineups#get_names'
 
 post "/signup", to: "users#create"
 get "/me", to: "sessions#show"
 get '/users', to: "users#index"
  get '/user/:id', to: "users#show"
  post '/lineups', to: 'lineups#create'
  delete '/lineups', to: 'lineups#destroy'
  post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    post "/username", to: "sessions#username"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

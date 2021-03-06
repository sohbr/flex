Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update] do
      resources :conversations, only: [:index, :create]
    end
    resources :conversations, only: [:show]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :index, :show, :update, :destroy]
    resources :personal_messages, only: [:create]
    resources :reviews, only: [:create, :index, :update, :destroy]
    resources :message, only: [:create]
    resources :bookmarks, only: [:index, :create, :destroy]
  end

  mount ActionCable.server => '/cable'
end

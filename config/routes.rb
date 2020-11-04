Rails.application.routes.draw do
  root 'homes#index'

  get '/campgrounds', to: 'homes#index'
  get '/campgrounds/new', to: 'homes#authenticated'
  get '/campgrounds/update', to: 'homes#authenticated'
  get '/campgrounds/:id', to: 'homes#index'
  
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :campgrounds, only: [:index, :show, :create, :update] do
        resources :reviews, only: [:create]
      end
    end
  end
  
end

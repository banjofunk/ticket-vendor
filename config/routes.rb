Rails.application.routes.draw do
  root to: 'home#show'
  devise_for :users
  namespace :api, :defaults => { :format => 'json' } do
    namespace :v1 do
      namespace :admin do
        resources :attractions, only: [:index, :show, :create, :update, :destroy]
        resources :promotions, only: [:show, :create, :update, :destroy] do
          post :activate_tax
          resources :admissions, only: [:index, :create] do
            collection do
              put :update
              delete :destroy
            end
          end
        end
        resources :taxes, only: [:index, :show, :create, :destroy, :update]
        get 'upload/signature'
      end
      resources :attractions, only: [:index, :show]
      scope :auth do
        get :is_signed_in, to: 'auth#is_signed_in?'
        get :sign_out, to: 'auth#sign_out'
      end
      resources :payments, only:[] do
        collection do
          get 'token'
          post 'send_payment'
        end
      end
      resources :promotions, only: [:index, :show]
    end
  end
  get '/t/:access_token', to: 'transactions#admissions', as:'admissions_link'
  get '/*path' => 'home#show', constraints: { format: 'html' }
end

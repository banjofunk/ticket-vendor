Rails.application.routes.draw do
  root to: 'home#show'
  devise_for :users
  namespace :api, :defaults => { :format => 'json' } do
    namespace :v1 do
      resources :admissions, only: [:index, :create, :destroy, :update]
      resources :attraction_fees, only: [:index, :create, :destroy, :update]
      resources :attractions, only: [:index, :show]
      resources :pages, only: [:index, :create, :destroy, :update]
      resources :promotion_taxes, only: [:index, :create, :destroy, :update]
      resources :promotions, only: [:index, :show]
      resources :redemption_codes, only: [:index, :create, :destroy, :update]
      resources :taxes, only: [:index, :create, :destroy, :update]
      resources :transaction_details, only: [:index, :create, :destroy, :update]
      resources :transactions, only: [:index, :create, :destroy, :update]
      resources :users, only: [:index, :create, :destroy, :update]
    end
  end
  get '/t/:access_token', to: 'transactions#admissions', as:'admissions_link'
  get '/*path' => 'home#show', constraints: { format: 'html' }

  #
  # namespace :api, :defaults => { :format => 'json' } do
  #
  #   namespace :admin do
  #     resources :attractions, only: [:index, :show, :create, :update] do
  #       post 'update_sort' => 'attractions#update_sort'
  #       post 'update_status' => 'attractions#update_status'
  #       post 'update_category' => 'attractions#update_category'
  #       post :create_fee
  #       get 'promotions' => 'attractions#promotions'
  #       get 'upload_csv'
  #       get 'redemptions'
  #       post 'bulk_redemptions' => 'attractions#bulk_redemptions'
  #       delete 'reset_redemptions' => 'attractions#reset_redemptions'
  #     end
  #     resources :taxes, only: [:create, :update]
  #     resources :promotions, only: [:index, :show, :create, :update] do
  #       post 'update_status' => 'promotions#update_status'
  #       post 'update_taxes' => 'promotions#update_taxes'
  #       post 'bulk_admissions' => 'promotions#bulk_admissions'
  #       post 'background_upload' => 'promotions#background_upload'
  #       post 'update_layout' => 'promotions#update_layout'
  #       post 'update_symbology' => 'promotions#update_symbology'
  #       get 'admissions' => 'promotions#admissions'
  #       delete 'reset_inventory' => 'promotions#reset_inventory'
  #     end
  #     post 'transactions/:id/resend' => 'transactions#resend'
  #     get 'transactions' => 'transactions#index'
  #     get 'transactions/admissions_report' => 'transactions#admissions_report'
  #     get 'upload/signature' => 'upload#signature'
  #     post 'upload/completed' => 'upload#completed'
  #
  #     #Had to use 'wide_pics' because 'banners' was setting off adblock
  #     get 'wide_pics' => 'banners#index'
  #     post 'wide_pics/push' => 'banners#push_banner'
  #     post 'wide_pics/remove' => 'banners#remove_banner'
  #     post 'wide_pics/delete' => 'banners#delete_banner'
  #
  #     get 'images/promotion_images' => 'images#promotion_images'
  #     get 'images/logo_images' => 'images#logo_images'
  #     post 'pages/update_page' => 'pages#update_page'
  #   end
  #   resources :redemption_codes, only: [:show]
  #   resources :attractions, only: [:index, :show] do
  #     get 'promotions' => 'attractions#promotions'
  #   end
  #
  #   get 'payments/client_token' => 'payments#client_token'
  #   post 'payments/send_payment' => 'payments#send_payment'
  #
  #   get 'pages/get_page' => 'pages#get_page'
  #   post 'pages/send_contact_form' => 'pages#send_contact_form'
  #   resources :pages, only: [:show]
  #   get 'promotions' => 'promotions#index'
  #   get 'promotions/get_promos' => 'promotions#get_promos'
  #   get 'promotions/agent' => 'promotions#agent'
  # end
  #
  # get '/promotion_background/:id', to: 'promotions#background', as: "background_attraction_promotion"
  # get '/t/:access_token', to: 'transactions#admissions', as:'admissions_link'
  # get '/tst/:promotion_id', to: 'transactions#test_admissions', as:'admissions_link_test'
  # get '/*path' => 'home#show', constraints: { format: 'html' }
end

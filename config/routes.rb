Rails.application.routes.draw do
  root to: 'home#show'
  devise_for :users

  namespace :api, :defaults => { :format => 'json' } do
    namespace :admin do
      resources :affiliates, only: [:index, :show, :create, :update] do
        post 'update_sort' => 'affiliates#update_sort'
        post 'update_status' => 'affiliates#update_status'
        post 'update_category' => 'affiliates#update_category'
        get 'promotions' => 'affiliates#promotions'
        get 'upload_csv'
        get 'redemptions'
        post 'bulk_redemptions' => 'affiliates#bulk_redemptions'
        delete 'reset_redemptions' => 'affiliates#reset_redemptions'
      end
      resources :taxes, only: [:create, :update]
      resources :promotions, only: [:index, :show, :create, :update] do
        post 'update_status' => 'promotions#update_status'
        post 'update_taxes' => 'promotions#update_taxes'
        post 'bulk_admissions' => 'promotions#bulk_admissions'
        post 'background_upload' => 'promotions#background_upload'
        post 'update_layout' => 'promotions#update_layout'
        post 'update_symbology' => 'promotions#update_symbology'
        get 'admissions' => 'promotions#admissions'
        delete 'reset_inventory' => 'promotions#reset_inventory'
      end
      post 'transactions/:id/resend' => 'transactions#resend'
      get 'transactions' => 'transactions#index'
      get 'transactions/admissions_report' => 'transactions#admissions_report'
      get 'upload/signature' => 'upload#signature'
      post 'upload/completed' => 'upload#completed'

      #Had to use 'wide_pics' because 'banners' was setting off adblock
      get 'wide_pics' => 'banners#index'
      post 'wide_pics/push' => 'banners#push_banner'
      post 'wide_pics/remove' => 'banners#remove_banner'
      post 'wide_pics/delete' => 'banners#delete_banner'

      get 'images/promotion_images' => 'images#promotion_images'
      get 'images/logo_images' => 'images#logo_images'
      post 'pages/update_page' => 'pages#update_page'
    end
    resources :redemption_codes, only: [:show]
    resources :affiliates, only: [:index, :show] do
      get 'promotions' => 'affiliates#promotions'
    end

    get 'payments/client_token' => 'payments#client_token'
    post 'payments/send_payment' => 'payments#send_payment'

    get 'pages/get_page' => 'pages#get_page'
    post 'pages/send_contact_form' => 'pages#send_contact_form'
    get 'promotions' => 'promotions#index'
    get 'promotions/get_promos' => 'promotions#get_promos'
    get 'promotions/agent' => 'promotions#agent'
  end
  resources :attractions do
    resources :skus, controller: 'attraction_skus' do
      member do
        get 'background'
        post 'bulk_admissions'
      end
    end
  end

  get '/affiliates/:affiliate_id/promotions/:id/background', to: 'promotions#background', as: "background_affiliate_promotion"
  get '/affiliates/:affiliate_id/promotions/:id/test_ticket', to: 'promotions#test_ticket', as: "test_ticket_affiliate_promotion"
  get '/t/:access_token', to: 'transactions#admissions', as:'admissions_link'
  get '/tst/:promotion_id', to: 'transactions#test_admissions', as:'admissions_link_test'
  get '/users/roles' => 'users#roles'
  get '/*path' => 'home#show'
end

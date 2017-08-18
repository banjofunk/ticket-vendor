class Api::AffiliatesController < ApplicationController

  def index
    @affiliates =
      if params['category']
        Affiliate.active.public_send(params['category'].pluralize)
      else
        Affiliate.active
      end
  end

  def show
    @affiliate = Affiliate.find params['id'].to_i
  end

  def promotions
    affiliate = Affiliate.find params['affiliate_id'].to_i
    @promotions = affiliate.promotions.active
  end
end

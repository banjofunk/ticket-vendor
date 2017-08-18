class Api::PromotionsController < ApplicationController

  def index
    @promotions = Promotion.active
  end

  def agent
    @promotions = Promotion.active
    render :index
  end

  def show
    @promotion = Promotion.find params['id']
  end

  def get_promos
    @promotions = []
    if params['ids']
      params['ids'].split(',').each do |id|
        @promotions << Promotion.find(id.to_i)
      end
    end
    render :index
  end

end

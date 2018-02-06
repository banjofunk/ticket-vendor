class Api::V1::PromotionsController < ApplicationController
  before_action :set_promotion, only: [:show]

  def index
    @promotions = Promotion.active
    render json: @promotions.map(&:to_summary)
  end

  def show
    render json: @promotion.to_detail
  end

  private

  def set_promotion
    @promotion = Promotion.find params[:id]
  end

end

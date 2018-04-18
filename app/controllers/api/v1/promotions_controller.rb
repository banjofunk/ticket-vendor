class Api::V1::PromotionsController < ApplicationController
  before_action :set_promotion, only: [:show]

  def index
    @promotions = Promotion.all
    render json: @promotions.map { |p| [p.id, p.to_detail] }.to_h
  end

  def show
    render json: @promotion.to_detail
  end

  private

  def set_promotion
    @promotion = Promotion.find params[:id]
  end

end

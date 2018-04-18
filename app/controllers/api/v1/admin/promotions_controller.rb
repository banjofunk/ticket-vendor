class Api::V1::Admin::PromotionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_promotion, only: [:show, :update, :destroy]

  def show
    render json: @promotion.to_detail
  end

  def create
    @promotion = Promotion.create(promotion_params)
    render json: @promotion.to_detail
  end

  def update
    @promotion.update_attributes(promotion_params)
    render json: @promotion.to_detail
  end

  def destroy
    if @promotion.admissions.count > 0
      @promotion.update_attributes(deleted:true)
    else
      @promotion.destroy
    end
    render json: @promotion.to_detail
  end

  def activate_tax
    tax = Tax.find(params[:tax_id])
    promotion = Promotion.find(params[:promotion_id])
    if promotion.taxes.include? tax
      promotion.taxes.delete tax
    else
      promotion.taxes << tax
    end
    render json: promotion.to_detail
  end

  private

  def set_promotion
    @promotion = Promotion.find params[:id]
  end


  def promotion_params
    params.require(:promotion).permit(
      :active,
      :attraction_id,
      :position,
      :title,
      :msrp,
      :net_price,
      :background
    )
  end
end

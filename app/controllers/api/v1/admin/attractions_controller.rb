class Api::V1::Admin::AttractionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_attraction, only: [:show, :update, :destroy]

  def index
    @attractions = Attraction.all.order(:name)
    render json: @attractions.map(&:to_summary)
  end

  def show
    render json: @attraction.to_detail
  end

  def create
    @attraction = Attraction.create(attraction_params)
    render json: @attraction.to_detail
  end

  def update
    @attraction.update_attributes(attraction_params)
    render json: @attraction.to_detail
  end

  def destroy
    if @attraction.promotions.count > 0
      @attraction.update_attributes(deleted:true)
    else
      @attraction.destroy
    end
    render json: @attraction.to_detail
  end

  private

  def set_attraction
    @attraction = Attraction.find params[:id]
  end


  def attraction_params
    params.require(:attraction).permit(
      :name,
      :active,
      :logo,
      :attraction_image,
      :description,
      :layout,
      :redemption_prefix,
      :expiry_window,
      :symbology,
      :position
    )
  end
end

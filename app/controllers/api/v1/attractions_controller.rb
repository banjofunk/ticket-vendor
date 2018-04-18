class Api::V1::AttractionsController < ApplicationController
  before_action :set_attraction, only: [:show]

  def index
    @attractions = Attraction.active
    render json: @attractions.map(&:to_summary)
  end

  def show
    render json: @attraction.to_detail
  end

  private

  def set_attraction
    @attraction = Attraction.find params[:id]
  end
end

include CurrencyHelper

class Api::RedemptionCodesController < ApplicationController

  def show
    code = params[:id].upcase.strip
    redemption_code = RedemptionCode.where("UPPER(code) = ? AND transaction_id IS NULL", code).first
    attraction = redemption_code.try(:attraction)
    golf_attractions = [12, 9, 5]
    if (attraction && golf_attractions.include?(attraction.id))
      promotions = []
      golf_attractions.each do |g_id|
        attraction = Attraction.find(g_id)
        promo = attraction.try(:redemption_promotion)
        promotions << promo
      end
    elsif params[:id].upcase.strip == "COMPIT"
      promotions = Promotion.active
    else
      rcode = attraction.try(:redemption_promotion)
      promotions = rcode ? [rcode] : []
    end
    if promotions.flatten.length > 0
      promotions_json = promotions.flatten.map do |promotion|
        {
          id: promotion.id,
          code: code,
          attraction: promotion.attraction.name,
          description: promotion.short_description,
          price: number_to_currency(promotion.net_price.to_f/100)
        }
      end
      render json: promotions_json
    else
      render json: false
    end
  end
end

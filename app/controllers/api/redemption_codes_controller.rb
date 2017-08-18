include ActionView::Helpers::NumberHelper

class Api::RedemptionCodesController < ApplicationController

  def show
    code = params[:id].upcase.strip
    redemption_code = RedemptionCode.where("UPPER(code) = ? AND transaction_id IS NULL", code).first
    affiliate = redemption_code.try(:affiliate)
    golf_affiliates = [12, 9, 5]
    if (affiliate && golf_affiliates.include?(affiliate.id))
      promotions = []
      golf_affiliates.each do |g_id|
        affiliate = Affiliate.find(g_id)
        promo = affiliate.try(:redemption_promotion)
        promotions << promo
      end
    elsif params[:id].upcase.strip == "COMPIT"
      promotions = Promotion.active
    else
      rcode = affiliate.try(:redemption_promotion)
      promotions = rcode ? [rcode] : []
    end
    if promotions.flatten.length > 0
      promotions_json = promotions.flatten.map do |promotion|
        {
          id: promotion.id,
          code: code,
          affiliate: promotion.affiliate.name,
          description: promotion.short_description,
          price: number_to_currency(promotion.discount_in_cents.to_f/100)
        }
      end
      render json: promotions_json
    else
      render json: false
    end
  end
end

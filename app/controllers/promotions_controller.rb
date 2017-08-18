require 'barby/barcode/code_39'
require 'barby/barcode/code_128'
require 'barby/outputter/svg_outputter'

class PromotionsController < ApplicationController
  before_action :set_affiliate
  before_action :set_promotion

  def background
    send_data @promotion.background, type: 'image/jpeg', diposition: 'inline'
  end

  def test_ticket
    code = "1111111"
    mustache_params = {
      code: code,
      expire_day: '12',
      expire_month: '28',
      expire_year: '2020',
      ticket_data: {}
    }

    if (symbology_kind = @affiliate.symbology).present?
      symbology = Barby.const_get(symbology_kind)
      canvas_node = Nokogiri::HTML(symbology.new(code).to_svg(height: 120, xdim: 3, margin: 0)).css('#canvas').first
      mustache_params[:barcode] = canvas_node.to_s
    end

    admission = {}
    if @affiliate.layout
      admission = {
        background_url: background_affiliate_promotion_url(@affiliate, @promotion),
        layout: Mustache.render(@affiliate.layout, mustache_params)
      }
    end

    svg = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 600 1200' preserveAspectRatio='xMidYMid meet'>
      <g>
        <image x='0' y='0' width='600' height='1200' xlink:href='#{background_affiliate_promotion_url(@affiliate, @promotion)}' />
      </g>
      #{ Mustache.render(@affiliate.layout, mustache_params).html_safe}
    </svg>"

    respond_to do |format|
      format.svg { render inline: svg}
    end
  end

  private
  def set_affiliate
    @affiliate = Affiliate.find(params[:affiliate_id])
  end

  def set_promotion
    @promotion = @affiliate.promotions.find(params[:id])
  end

  def promotion_params
    params
      .fetch(:promotion, {})
      .permit(
        :background,
        :retail_in_cents,
        :discount_in_cents,
        :description,
        :short_description,
        :redemption_default
      )
  end
end

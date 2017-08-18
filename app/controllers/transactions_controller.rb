require 'barby/barcode/code_39'
require 'barby/barcode/code_128'
require 'barby/outputter/svg_outputter'

class TransactionsController < ApplicationController
  def admissions
    access_token = (params[:access_token] || '').strip

    unless access_token.present?
      render plain: 'No access token provided', status: :not_found
      return
    end

    txn = Transaction.find_by(access_token: access_token)

    unless txn.present?
      render plain: 'Unable to find transaction for given access token', status: :not_found
      return
    end

    @admissions = render_admissions(txn)

    render 'admissions', layout: false

    # UpdateAccessedJob.perform_later(txn, request.ip)
  end

  def test_admissions
      promotion = Promotion.find(params[:promotion_id])
      symbology = promotion.affiliate.symbology || 'Code'
      codes = {
        'Code128' => "GA17ADU7562",
        'Code128B' => "GA17ADU7562",
        'Code39' => "GA17$70DN6TV1JZ92G",
        'Code' => "TESTCODE"
      }
      mustache_params = {
        code: codes[symbology],
        expire_day: Time.now.try(:day),
        expire_month: Time.now.try(:month),
        expire_year: Time.now.try(:year),
        ticket_data: {}
      }

      if (symbology_kind = promotion.affiliate.symbology).present?
        symbology = Barby.const_get(symbology_kind)
        canvas_node = Nokogiri::HTML(symbology.new(codes[symbology_kind]).to_svg(height: 120, xdim: 3, margin: 0)).css('#canvas').first
        mustache_params[:barcode] = canvas_node.to_s
      end

      @ticket = {}
      if promotion.affiliate.layout
        @ticket = {
          background_url: background_affiliate_promotion_url(promotion.affiliate, promotion),
          layout: Mustache.render(promotion.affiliate.layout, mustache_params)
        }
      end
      render 'test_admissions', layout: false
  end

  private
  def render_admissions(txn)
    txn.admissions.map do |admission|
      expires = admission.try(:expires_at)
      mustache_params = {
        code: admission.code,
        expire_day: expires.try(:day),
        expire_month: expires.try(:month),
        expire_year: expires.try(:year),
        ticket_data: admission.ticket_data
      }

      if (symbology_kind = admission.promotion.affiliate.symbology).present?
        symbology = Barby.const_get(symbology_kind)
        canvas_node = Nokogiri::HTML(symbology.new(admission.code).to_svg(height: 120, xdim: 3, margin: 0)).css('#canvas').first
        mustache_params[:barcode] = canvas_node.to_s
      end

      descriptor = {}
      if admission.promotion.affiliate.layout
        descriptor = {
          background_url: background_affiliate_promotion_url(admission.promotion.affiliate, admission.promotion),
          layout: Mustache.render(admission.promotion.affiliate.layout, mustache_params)
        }
      end

      descriptor
    end
  end
end

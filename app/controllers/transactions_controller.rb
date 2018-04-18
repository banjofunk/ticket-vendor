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
  end

  private
  def render_admissions(txn)
    txn.admissions.map do |admission|
      expires = admission.try(:expires_at)
      code = admission.code.try(:remove, '*')

      mustache_params = {
        code: code,
        expire_day: expires.try(:day),
        expire_month: expires.try(:month),
        expire_year: expires.try(:year),
        ticket_data: admission.ticket_data
      }

      if (sym_kind = admission.promotion.attraction.symbology).present?
        symbology = Barby.const_get(sym_kind)
        extend_encoding = false
        svg_opt = {
          height:120,
          xdim:3,
          margin:0
        }

        if sym_kind.eql? 'Code39'
          svg_opt[:xdim] = 2.05
          canvas_node = Nokogiri::HTML(
            symbology.new(code, extend_encoding).to_svg(svg_opt)
          ).css('#canvas').first
        else
          canvas_node = Nokogiri::HTML(
            symbology.new(code).to_svg(svg_opt)
          ).css('#canvas').first
        end
        mustache_params[:barcode] = canvas_node.to_s
      end

      descriptor = {}
      if admission.promotion.layout
        descriptor = {
          background_url: admission.promotion.background,
          layout: Mustache.render(admission.promotion.layout, mustache_params)
        }
      end

      descriptor
    end
  end
end

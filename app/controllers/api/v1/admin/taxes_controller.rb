class Api::V1::Admin::TaxesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tax, only: [:show, :update, :destroy]

  def index
    render json: Tax.all.map(&:to_summary)
  end

  def show
    render json: @tax.to_detail
  end

  def create
    @tax = Tax.create(tax_params)
    render json: @tax.to_detail
  end

  def update
    @tax.update_attributes(tax_params)
    render json: @tax.to_detail
  end

  def destroy
    @tax.destroy
    render json: @tax.to_detail
  end

  private

  def set_tax
    @tax = Tax.find params[:id]
  end


  def tax_params
    params.require(:tax).permit(
      :kind,
      :amount,
      :description
    )
  end
end

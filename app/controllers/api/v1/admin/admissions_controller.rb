class Api::V1::Admin::AdmissionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_promotion

  def show
    render json: @promotion.to_detail
  end

  def index
    @admissions = @promotion.try(:admissions) || []
    aff_name = @promotion.try(:attraction).try(:name).gsub(' ','_').downcase
    promo_name = @promotion.try(:title).gsub(' ','_').downcase
    respond_to do |format|
      format.csv do
        filename = "Admissions-#{aff_name}-#{promo_name}.csv"
        headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end
  end

  def create
    if admissions_params[:file]
      Admission.csv_import(@promotion, admissions_params[:file])
    end
    render json: @promotion.to_detail
  end

  def destroy
    @promotion.admissions.delete_all
    render json: @promotion.to_detail
  end

  private

  def set_promotion
    @promotion = Promotion.find params[:promotion_id]
  end

  def admissions_params
    params.permit(:file)
  end

end

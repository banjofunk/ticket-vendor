class Api::Admin::PromotionsController < ApplicationController
  before_action :authenticate_user!

  def index
    @promotions = Promotion.includes(:taxes).all.order(:position)
    respond_to do |format|
      format.json
      format.csv do
        filename = "Inventory_#{Time.now.strftime('%m-%d-%y_%H%M%S')}.csv"
        headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end
  end

  def show
    @promotion = Promotion.find(params['id'])
  end

  def create
    data = JSON.parse(params['json'])['formValue']
    retailFltStr = data['retail'].scan(/(\d|\.)/).join('')
    retail = sprintf('%.2f', retailFltStr).gsub('.','').to_i
    discountFltStr = data['discounted'].scan(/(\d|\.)/).join('')
    discount = sprintf('%.2f', discountFltStr).gsub('.','').to_i
    @promotion = Promotion.create(
      affiliate_id: data['affiliate_id'],
      active?:true,
      title: data['title'],
      subtitle: data['subtitle'],
      short_description: data['shortDescription'],
      description: data['description'],
      image_id: data['image_id'],
      retail_in_cents: retail,
      discount_in_cents: discount
    )
    render :show
  end

  def update
    data = JSON.parse(params['json'])['formValue']
    @promotion = Promotion.find(data['id'])
    @promotion.update_attributes({
      position: data['position'],
      affiliate_id: data['affiliate_id'],
      image_id: data['image_id'],
      title: data['title'],
      subtitle: data['subtitle'],
      short_description: data['shortDescription'],
      description: data['description'],
      retail_in_cents: sprintf('%.2f', data['retail']).gsub('.','').to_i,
      discount_in_cents: sprintf('%.2f', data['discounted']).gsub('.','').to_i
    })
    render :show
  end

  def update_status
    data = JSON.parse(params['json'])
    @promotion = Promotion.find params['promotion_id'].to_i
    @promotion.update_attribute(:call_center?, data['callCenter']) if !data['callCenter'].nil?
    @promotion.update_attribute(:active?, data['active']) if !data['active'].nil?
    @promotion.update_attribute(:redemption_default, data['redemption']) if !data['redemption'].nil?
    render :show
  end

  def update_taxes
    data = JSON.parse(params['json'])
    @promotion = Promotion.find data['promotion_id'].to_i
    tax = Tax.find data['tax_id'].to_i
    if data['value'] === true
      @promotion.taxes << tax
    else
      @promotion.taxes.delete tax
    end
    render :show
  end

  def reset_inventory
    @promotion = Promotion.find(params[:promotion_id])
    @promotion.admissions.delete_all if current_user.roles.include? "admin"
    render :show
  end

  def admissions
    @promotion = Promotion.find(params[:promotion_id])
    @admissions = @promotion.try(:admissions) || []
    aff_name = @promotion.try(:affiliate).try(:name).gsub(' ','_').downcase
    promo_name = @promotion.try(:short_description).gsub(' ','_').downcase
    respond_to do |format|
      format.json
      format.csv do
        filename = "Admissions-#{aff_name}-#{promo_name}.csv"
        headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end
  end

  def bulk_admissions
    params.permit!
    @promotion = Promotion.find(params[:promotion_id])
    if params[:file]
      Admission.csv_import(@promotion, params[:file])
    end
    render :show
  end

  def background_upload
    params.permit!
    @promotion = Promotion.find(params[:promotion_id])
    if params[:file]
      @promotion.update_attributes(background: open(params[:file]).read)
    end
    render :show
  end

  def update_layout
    params.permit!
    data = JSON.parse(params['json'])
    @promotion = Promotion.find(params[:promotion_id])
    @promotion.affiliate.update_attributes(layout: data['layout'])
    @promotion.reload
    render :show
  end

  def update_symbology
    params.permit!
    data = JSON.parse(params['json'])
    @promotion = Promotion.find(params[:promotion_id])
    symbology = data['symbology']
    symbology = nil if symbology === 'none'
    @promotion.affiliate.update_attributes(symbology: symbology)
    @promotion.reload
    render :show
  end

end

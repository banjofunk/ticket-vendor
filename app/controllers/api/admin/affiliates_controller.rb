class Api::Admin::AffiliatesController < ApplicationController
  before_action :authenticate_user!

  def index
    @affiliates = Affiliate.all.order(:id)
  end

  def show
    @affiliate = Affiliate.find params['id'].to_i
  end

  def create
    data = JSON.parse(params['json'])['formValue']
    @affiliate = Affiliate.create(
      name: data['name'],
      active?: true,
      logo_image_id: data['logoImageId'],
      description: data['description'],
      short_description: data['shortDescription'],
      redemption_prefix: data['redemptionPrefix'].try(:upcase)
    )
    render :show
  end

  def update
    data = JSON.parse(params['json'])['formValue']
    @affiliate = Affiliate.find(data['id'])
    @affiliate.update_attributes({
      name: data['name'],
      logo_image_id: data['logoImageId'],
      description: data['description'],
      short_description: data['shortDescription'],
      redemption_prefix: data['redemptionPrefix'].try(:upcase)
    })
    render :show
  end

  def promotions
    affiliate = Affiliate.find params['affiliate_id'].to_i
    @promotions = affiliate.promotions
  end

  def upload_csv
    @affiliate = Affiliate.find params[:affiliate_id].to_i

    respond_to do |format|
        format.html { render :upload_csv }
    end
  end


  def reset_redemptions
    @affiliate = Affiliate.find params[:affiliate_id].to_i
    @affiliate.redemption_codes.delete_all if current_user.roles.include? "admin"
    render :show
  end

  def redemptions
    @affiliate = Affiliate.find params[:affiliate_id].to_i
    @redemptions = @affiliate.try(:redemption_codes) || []
    aff_name = @affiliate.try(:name).gsub(' ','_').downcase
    respond_to do |format|
      format.json
      format.csv do
        filename = "Redemptions-#{aff_name}.csv"
        headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end
  end

  def bulk_redemptions
    @affiliate = Affiliate.find params['affiliate_id'].to_i
    if params[:file]
      @affiliate.redemption_import(params[:file])
    end
    render :show
  end

  def update_sort
    affiliate = Affiliate.find params['id'].to_i
    affiliate.write_attribute("#{params['category']}_sort", params['position'].to_i)
    affiliate.save
  end

  def update_category
    data = JSON.parse(params['json'])
    @affiliate = Affiliate.find params['affiliate_id'].to_i
    @affiliate.write_attribute("#{data['category']}?", data['checked'])
    @affiliate.save
    render :show
  end

  def update_status
    data = JSON.parse(params['json'])
    @affiliate = Affiliate.find params['affiliate_id'].to_i
    @affiliate.update_attributes({active?: data['active']})
    render :show
  end

end

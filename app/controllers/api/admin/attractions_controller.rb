class Api::Admin::AttractionsController < ApplicationController
  before_action :authenticate_user!

  def index
    @attractions = Attraction.all.order(:id)
  end

  def show
    @attraction = Attraction.find params['id'].to_i
  end

  def create
    data = JSON.parse(params['json'])['formValue']
    @attraction = Attraction.create(
      name: data['name'],
      active?: true,
      logo_image_id: data['logoImageId'],
      description: data['description'],
      subtitle: data['shortDescription'],
      redemption_prefix: data['redemptionPrefix'].try(:upcase)
    )
    render :show
  end

  def update
    data = JSON.parse(params['json'])['formValue']
    @attraction = Attraction.find(data['id'])
    @attraction.update_attributes({
      name: data['name'],
      logo_image_id: data['logoImageId'],
      description: data['description'],
      subtitle: data['shortDescription'],
      redemption_prefix: data['redemptionPrefix'].try(:upcase)
    })
    render :show
  end

  def create_fee
    data = JSON.parse(params['json'])
    @attraction = Attraction.find params[:attraction_id].to_i
    @attraction.attraction_fees.create \
      description: data['description'],
      total_in_cents: data['total_in_cents']
    render :show
  end

  def promotions
    attraction = Attraction.find params['attraction_id'].to_i
    @promotions = attraction.promotions
  end

  def upload_csv
    @attraction = Attraction.find params[:attraction_id].to_i

    respond_to do |format|
        format.html { render :upload_csv }
    end
  end


  def reset_redemptions
    @attraction = Attraction.find params[:attraction_id].to_i
    @attraction.redemption_codes.delete_all if current_user.roles.include? "admin"
    render :show
  end

  def redemptions
    @attraction = Attraction.find params[:attraction_id].to_i
    @redemptions = @attraction.try(:redemption_codes) || []
    aff_name = @attraction.try(:name).gsub(' ','_').downcase
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
    @attraction = Attraction.find params['attraction_id'].to_i
    if params[:file]
      @attraction.redemption_import(params[:file])
    end
    render :show
  end

  def update_sort
    attraction = Attraction.find params['id'].to_i
    attraction.write_attribute("#{params['category']}_sort", params['position'].to_i)
    attraction.save
  end

  def update_category
    data = JSON.parse(params['json'])
    @attraction = Attraction.find params['attraction_id'].to_i
    @attraction.write_attribute("#{data['category']}?", data['checked'])
    @attraction.save
    render :show
  end

  def update_status
    data = JSON.parse(params['json'])
    @attraction = Attraction.find params['attraction_id'].to_i
    @attraction.update_attributes({active?: data['active']})
    render :show
  end

end

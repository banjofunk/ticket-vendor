class AttractionSkusController < ApplicationController
  before_action :set_attraction
  before_action :set_attraction_sku, only: %W(background bulk_admissions destroy edit show update)

  def index
    @attraction_skus = @attraction.skus.all
  end

  def show
  end

  def new
    @attraction_sku = AttractionSku.new
  end

  def edit
  end

  def create
    aparams = attraction_sku_params
    background_upload = aparams.delete(:background)

    if background_upload.present?
      aparams[:background] = background_upload.read
    end

    @attraction_sku = @attraction.skus.new(aparams)

    respond_to do |format|
      if @attraction_sku.save
        format.html { redirect_to attraction_sku_path(@attraction, @attraction_sku), notice: 'SKU was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    aparams = attraction_sku_params
    background_upload = aparams.delete(:background)

    if background_upload.present?
      aparams[:background] = background_upload.read
    end

    respond_to do |format|
      if @attraction_sku.update(aparams)
        format.html { redirect_to attraction_sku_path(@attraction, @attraction_sku), notice: 'SKU was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @attraction_sku.destroy
    respond_to do |format|
      format.html { redirect_to attraction_skus_path(@attraction), notice: 'SKU was successfully destroyed.' }
    end
  end

  def background
    send_data @attraction_sku.background, type: 'image/jpeg', diposition: 'inline'
  end

  def bulk_admissions
    if params[:csv]
      Admission.csv_import(@attraction_sku, params[:csv])
    end

    msg = params[:csv] ? 'Admissions uploaded successfully' : 'No CSV file provided'
    redirect_to attraction_sku_path(@attraction, @attraction_sku), notice: msg
  end

  private
    def set_attraction
      @attraction = Attraction.find(params[:attraction_id])
    end

    def set_attraction_sku
      @attraction_sku = @attraction.skus.find(params[:id])
    end

    def attraction_sku_params
      params
        .fetch(:attraction_sku, {})
        .permit(
          :background,
          :creates_admission,
          :cost,
          :description,
          :question,
          :redemption_default
        )
    end
end

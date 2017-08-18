class Api::Admin::ImagesController < ApplicationController

  def promotion_images
    @images = Image.promos
    render :index
  end

  def logo_images
    @images = Image.logos
    render :index
  end
end

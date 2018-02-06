class Api::Admin::BannersController < ApplicationController

  def index
    @banners = Image.banners
  end

  def push_banner
    data = JSON.parse(params['json'])
    @page = Page.find_by_name(data['page'])
    BannerCollectionImage.create(
      image_id: data['id'],
      banner_collection_id: @page.banner_collection.id,
      position: @page.banner_collection_images.last.position + 1
    )
  end

  def remove_banner
    data = JSON.parse(params['json'])
    @page = Page.find_by_name(data['page'])
    image = BannerCollectionImage.find(data['id'].to_i)
    unless image.banner_collection.banner_collection_images.count == 1
      image.delete
    end
  end

  def delete_banner
    data = JSON.parse(params['json'])
    image = Image.find(data['id'].to_i)
    image.update_attributes(active?: false)
    @banners = Image.banners
  end
end

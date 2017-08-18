class Api::Admin::PagesController < ApplicationController

  def update_page
    data = JSON.parse(params['json'])
    @page = Page.find(data['id'].to_i)
    @page.content = data["content"]
    @page.save
    data['banners'].try(:each) do |banner|
      image = BannerCollectionImage.find(banner['id'].to_i)
      image.position = banner['position'].to_i
      image.save
    end
    data['promotions'].try(:each) do |promotion|
      pagePromotion = Promotion.find(promotion['id'].to_i)
      pagePromotion.position = promotion['position'].to_i
      pagePromotion.save
    end
    data['attractions'].try(:each) do |attraction|
      pageAttraction = Affiliate.find(attraction['id'].to_i)
      pageAttraction.attraction_sort = attraction['attraction_sort'].to_i
      pageAttraction.save
      Affiliate.where('attraction_sort >= ?', 5).map {|a| a.resort_sort += 1; a.save}
    end
    data['sponsors'].try(:each) do |sponsor|
      pageSponsor = Affiliate.find(sponsor['id'].to_i)
      pageSponsor.sponsor_sort = sponsor['sponsor_sort'].to_i
      pageSponsor.save
      Affiliate.where('sponsor_sort >= ?', 5).map {|a| a.resort_sort += 1; a.save}
    end
    render json: true
  end

end

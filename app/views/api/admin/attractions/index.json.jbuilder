json.attractions @attractions do |attraction|
  json.id attraction.id
  json.name attraction.name
  json.attraction_fees attraction.attraction_fees
  json.active attraction.active?
  json.logoImageId attraction.logo_image_id
  json.logo Image.find_by(id: attraction.logo_image_id).try(:src) || '/assets/logo'
  json.promoImg attraction.promotions.first.try(:image).try(:src) || '/assets/logo'
  json.hasPromos attraction.promotions.active.count > 0
  json.banners attraction.banners
  json.attraction attraction.attraction?
  json.attractionSort attraction.attraction_sort
  json.resort attraction.resort?
  json.resortSort attraction.resort_sort
  json.sponsor attraction.sponsor?
  json.sponsorSort attraction.sponsor_sort
  json.description attraction.description
  json.redemption_count attraction.redemption_codes.count
  json.shortDescription attraction.short_description
  json.redemptionPrefix attraction.redemption_prefix || ""
  json.promotionCount attraction.promotions.active.count
end

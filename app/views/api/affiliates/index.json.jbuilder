json.affiliates @affiliates do |affiliate|
  json.id affiliate.id
  json.name affiliate.name
  json.sponsor_sort affiliate.sponsor_sort
  json.attraction_sort affiliate.attraction_sort
  json.logoImg Image.find_by(id: affiliate.logo_image_id).try(:src) || '/assets/logo'
  json.promoImg affiliate.promotions.first.try(:image).try(:src) || '/assets/logo'
  json.hasPromos affiliate.promotions.active.count > 0
  json.shortDescription affiliate.short_description || affiliate.description
  json.redemptionPrefix affiliate.redemption_prefix || ""
  json.description affiliate.description
end

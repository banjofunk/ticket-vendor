json.allTaxes Tax.all
json.promotions @promotions do |promotion|
  json.id promotion.id
  json.inventory promotion.admissions.where(transaction_id:nil).count
  json.position promotion.position
  json.active promotion.active?
  json.callCenter promotion.call_center?
  json.redemption promotion.redemption?
  json.attraction_id promotion.attraction_id
  json.attraction promotion.attraction.name
  json.logoImg Image.find_by(id: promotion.attraction.logo_image_id).try(:src) || '/assets/logo'
  json.image_id promotion.image_id
  json.promoImg Image.find_by(id: promotion.image_id).try(:src) || '/assets/logo'
  json.title promotion.title
  json.subtitle promotion.subtitle
  json.shortDescription promotion.short_description || promotion.description
  json.description promotion.description
  json.retail promotion.msrp.to_f/100
  json.discounted promotion.net_price.to_f/100
  json.taxes promotion.taxes
  json.layout promotion.attraction.layout
  json.symbology promotion.attraction.symbology
end

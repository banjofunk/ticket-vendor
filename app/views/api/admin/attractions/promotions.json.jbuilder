json.promotions @promotions do |promotion|
  json.id promotion.id
  json.position promotion.position
  json.attraction_id promotion.attraction_id
  json.attraction promotion.attraction.name
  json.redemption promotion.redemption?
  json.active promotion.active?
  json.logoImg Image.find_by(id: promotion.attraction.logo_image_id).try(:src) || '/assets/logo'
  json.image_id promotion.image_id
  json.promoImg Image.find_by(id: promotion.image_id).try(:src) || '/assets/logo'
  json.title promotion.title
  json.subtitle promotion.subtitle
  json.shortDescription promotion.short_description || promotion.description
  json.description promotion.description
  json.retail promotion.msrp.to_f/100
  json.discounted promotion.net_price.to_f/100
end

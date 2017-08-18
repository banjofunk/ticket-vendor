json.promotions @promotions do |promotion|
  json.id promotion.id
  json.position promotion.position
  json.affiliate_id promotion.affiliate_id
  json.affiliate promotion.affiliate.name
  json.redemption promotion.redemption_default
  json.active promotion.active?
  json.logoImg Image.find_by(id: promotion.affiliate.logo_image_id).try(:src) || '/assets/logo'
  json.image_id promotion.image_id
  json.promoImg Image.find_by(id: promotion.image_id).try(:src) || '/assets/logo'
  json.title promotion.title
  json.subtitle promotion.subtitle
  json.shortDescription promotion.short_description || promotion.description
  json.description promotion.description
  json.retail promotion.retail_in_cents.to_f/100
  json.discounted promotion.discount_in_cents.to_f/100
end

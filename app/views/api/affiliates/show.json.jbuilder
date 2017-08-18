json.id @affiliate.id
json.name @affiliate.name
json.active @affiliate.active?
json.logoImageId @affiliate.logo_image_id
json.logo @affiliate.logo.try(:src) || '/assets/logo'
json.promoImg @affiliate.promotions.first.try(:image).try(:src) || '/assets/logo'
json.hasPromos @affiliate.promotions.active.count > 0
json.banners @affiliate.banners
json.attraction @affiliate.attraction?
json.attractionSort @affiliate.attraction_sort
json.resort @affiliate.resort?
json.resortSort @affiliate.resort_sort
json.sponsor @affiliate.sponsor?
json.sponsorSort @affiliate.sponsor_sort
json.description @affiliate.description
json.shortDescription @affiliate.short_description
json.promotionCount @affiliate.promotions.count
json.redemptionPrefix @affiliate.redemption_prefix || ""
json.promoImg @affiliate.promotions.first.try(:image).try(:src)

json.banners @page.banner_collection_images do |banner|
  json.id banner.id
  json.position banner.position
  json.src banner.image.src
end

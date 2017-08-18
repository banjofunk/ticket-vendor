json.id @page.id
json.name @page.name
json.content @page.content
json.banners @page.banner_collection_images do |banner|
  json.id banner.id
  json.key banner.id
  json.position banner.position
  json.src banner.image.src
end

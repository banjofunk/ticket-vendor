json.id @page.id
json.name @page.name
json.content @page.content
json.banners @page.banners do |banner|
  json.id banner.id
  json.src banner.src
end

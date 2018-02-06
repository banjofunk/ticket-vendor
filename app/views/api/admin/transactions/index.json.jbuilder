json.total_pages @total_pages
json.current_page @current_page
json.transactions @transactions do |transaction|
  json.id transaction.id
  json.date transaction.created_at.strftime('%m/%d/%Y')
  json.time transaction.created_at.in_time_zone("Pacific Time (US & Canada)").strftime('%I:%M%P PST')
  json.bt_id transaction.details.try(:bt_id)
  json.total format("%.2f", transaction.details.try(:total_in_cents).to_f/100)
  json.link admissions_link_url(transaction.access_token)
  json.name "#{transaction.details.try(:first_name)} #{transaction.details.try(:last_name)}"
  json.email transaction.details.try(:email)
  json.phone transaction.details.try(:normalize_phone) if transaction.details.try(:phone)
  json.admissions transaction.grouped_admissions do |admission|
     json.count admission.count
     json.attraction admission.attraction
     json.description admission.description
     json.price admission.price
     json.tax admission.tax * admission.count
     json.total format("%.2f", (admission.price.to_f + admission.tax.to_f) * admission.count)
  end
end

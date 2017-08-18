CT_HOST = ENV['CT_HOST'] || 'http://localhost:3000'
CT_OAUTH_TOKEN = Rails.application.secrets.ct_oauth_token

module CT
  def self.get_ticket(ticket_id)
    uri = URI("#{CT_HOST}/accounts/global-ticketingforlesscom/tickets/#{ticket_id}.json")
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{CT_OAUTH_TOKEN}"

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = CT_HOST.start_with?('https')
    response = http.start { |http| http.request(req) }

    JSON.parse(response.body)
  end

  def self.send_status_update(ticket_id, text)
    uri = URI("#{CT_HOST}/accounts/global-ticketingforlesscom/tickets/#{ticket_id}/comments.json")
    req = Net::HTTP::Post.new(uri)
    req['Authorization'] = "Bearer #{CT_OAUTH_TOKEN}"
    req['Content-Type'] = 'application/json'
    req.body = {
      comment: {
         text: text
      }
    }.to_json

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = CT_HOST.start_with?('https')
    http.start { |http| http.request(req) }
  end
end

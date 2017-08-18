PHONE_NUMBER = ENV['TWILIO_DEFAULT_NUMBER']

class SendAdmissionsJob < ApplicationJob
  queue_as :default

  def perform(ticket_link, phone)
    twilio = Twilio::REST::Client.new
    sms_result = twilio.messages.create(
      from: PHONE_NUMBER,
      to: phone,
      body: "Retrieve your attraction ticket(s) at: #{ticket_link}"
    )
    Rails.logger.debug sms_result
  end
end

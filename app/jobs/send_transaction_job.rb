require 'ct'
class SendTransactionJob < ApplicationJob
  queue_as :default

  def perform(txn, hash)
    ct_id = txn.ct_id
    bt_id = txn['braintree_id']
    transaction_url = "http://us.ticketingforless.com/t/#{bt_id}"
    text = "Transaction ID: [#{bt_id}](#{session_url}) - #{txn['agent']}"
    CT::send_status_update(ct_id, text) if ct_id
  end
end

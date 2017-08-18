class TransactionDetail < ApplicationRecord
  include ActionView::Helpers::NumberHelper
  belongs_to :txn, foreign_key: "transaction_id", class_name: "Transaction"

  def normalize_total
    self.total_in_cents ? number_to_currency(self.total_in_cents.to_f/100) : 'N/A'
  end

  def normalize_phone
    self.phone ? number_to_phone(self.phone.scan(/\d/).join('').to_i) : 'N/A'
  end
end

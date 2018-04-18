require 'csv'

class Admission < ApplicationRecord
  belongs_to :promotion, class_name: 'Promotion', foreign_key: 'promotion_id'
  belongs_to :txn, class_name: 'Transaction', foreign_key: 'transaction_id', optional: true
  has_one :redemption_code

  scope :available, -> {
    where(transaction_id: nil).
    order(:id)
  }

  def self.csv_import(promotion, io)
    admission_codes = CSV.parse(io.read)
    admission_codes.each_slice(100) do |codes_slice|
      admissions = codes_slice.map { |code| code.first ? { code: code.first, promotion: promotion } : nil}
      Admission.create!(admissions.compact)
    end
  end
end

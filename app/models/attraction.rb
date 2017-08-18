require 'csv'

class Attraction < ApplicationRecord
  has_many :redemption_codes
  has_many :skus, class_name: 'AttractionSku', inverse_of: :attraction

  def pluck_questions
    skus.all.pluck(:question)
  end

  def redemption_sku
    skus.find_by(redemption_default: true)
  end

  def redemption_import(io)
    redemption_codes = CSV.parse(io.read)
    rca = redemption_codes.map { |rc| [rc.first, self.id] }
    RedemptionCode.import([:code, :attraction_id], rca)
  end
end

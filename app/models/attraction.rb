require 'csv'
class Attraction < ApplicationRecord
  has_many :promotions
  has_many :redemption_codes,  dependent: :destroy
  has_one :logo, -> { logos }, class_name: 'Image', as: :imageable

  scope :active, -> {
    where(:active? => true)
  }
  scope :resorts, -> {
    where(:resort? => true).
    where.not(:resort_sort => -1).
    order(:resort_sort)
  }
  scope :sponsors, -> {
    where(:sponsor? => true).
    where.not(:sponsor_sort => -1).
    order(:sponsor_sort)
  }
  scope :attractions, -> {
    where(:attraction? => true).
    where.not(:attraction_sort => -1).
    order(:attraction_sort)
  }

  def redemption_promotion
    self.promotions.where(redemption_default: true)
  end

  def redemption_import(io)
    redemption_codes = CSV.parse(io.read)
    attraction_id = self.id
    rca = redemption_codes.map { |rc| [rc.first, attraction_id] }
    rca.each_slice(500) do |rca_slice|
      RedemptionCode.import([:code, :attraction_id], rca_slice.compact)
    end
  end

end

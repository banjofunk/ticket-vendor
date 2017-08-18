require 'csv'
class Affiliate < ApplicationRecord
  has_many :promotions
  has_many :affiliate_collection_items
  has_many :redemption_codes,  dependent: :destroy
  belongs_to :logo, foreign_key: 'logo_image_id', class_name: 'Image'
  before_create :set_affiliate_sorts

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
    affiliate_id = self.id
    rca = redemption_codes.map { |rc| [rc.first, affiliate_id] }
    rca.each_slice(500) do |rca_slice|
      RedemptionCode.import([:code, :affiliate_id], rca_slice.compact)
    end
  end

  private

  def set_affiliate_sorts
    last_resort_sort = Affiliate.maximum(:resort_sort)
    last_sponsor_sort = Affiliate.maximum(:sponsor_sort)
    last_attraction_sort = Affiliate.maximum(:attraction_sort)
    self.resort_sort = last_resort_sort
    self.sponsor_sort = last_sponsor_sort
    self.attraction_sort = last_attraction_sort
  end

end

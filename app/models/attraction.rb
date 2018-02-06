require 'csv'
class Attraction < ApplicationRecord
  include Taxable
  acts_as_list

  has_many :redemption_codes,  dependent: :destroy
  has_many :promotions

  has_one :logo, -> { of_kind('logo') }, class_name: 'Image', as: :imageable
  has_one :attraction_image, -> { of_kind('attraction_image') }, class_name: 'Image', as: :imageable
  accepts_nested_attributes_for :logo, :attraction_image, allow_destroy: true

  scope :active, -> { where(:active? => true) }
  scope :sponsors, -> { where(:sponsor? => true) }

  def redemption_promotion
    promotions.where(redemption?: true)
  end

  def redemption_import(io)
    redemption_codes = CSV.parse(io.read)
    attraction_id = self.id
    rca = redemption_codes.map { |rc| [rc.first, attraction_id] }
    rca.each_slice(500) do |rca_slice|
      RedemptionCode.import([:code, :attraction_id], rca_slice.compact)
    end
  end

  def to_detail
    {
      id: id,
      name: name,
      logo: logo.try(:src),
      active: active?,
      sponsor: sponsor?,
      description: description,
      subtitle: subtitle,
      layout: layout,
      redemption_prefix: redemption_prefix,
      expiry_window: expiry_window,
      symbology: symbology,
      position: position,
      promotions: promotions.map(&:to_summary)
    }
  end

  def to_summary
    {
      id: id,
      name: name,
      logo: logo.try(:src),
      active: active?,
      sponsor: sponsor?,
      description: description,
      subtitle: subtitle,
      redemption_prefix: redemption_prefix,
      expiry_window: expiry_window,
      symbology: symbology,
      promotion_image: promotions.first.try(:promotion_image).try(:src),
      position: position
    }
  end

end

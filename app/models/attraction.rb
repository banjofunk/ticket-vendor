require 'csv'
class Attraction < ApplicationRecord
  include Taxable
  acts_as_list

  has_many :promotions
  default_scope  -> {where(deleted: false)}
  scope :active, -> { where(:active => true).joins(:promotions).where('promotions.active = true').uniq }
  scope :sponsors, -> { where(:sponsor? => true) }

  def to_detail
    {
      id: id,
      name: name,
      logo: logo,
      attraction_image: attraction_image,
      active: active,
      description: description,
      expiry_window: expiry_window,
      symbology: symbology,
      position: position,
      promotions: promotions.map(&:to_summary),
      promotion_count: promotions.count
    }
  end

  def to_summary
    {
      id: id,
      name: name,
      logo: logo,
      active: active,
      description: description,
      expiry_window: expiry_window,
      symbology: symbology,
      attraction_image: attraction_image,
      position: position,
      promotion_count: promotions.count
    }
  end

end

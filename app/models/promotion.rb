class Promotion < ApplicationRecord
  include Taxable
  include CurrencyHelper

  acts_as_list scope: :attraction

  belongs_to :attraction
  has_many :admissions, -> { available }, :dependent => :destroy
  default_scope  -> {where(deleted: false)}

  scope :active, -> {
    includes(:attraction).
    where(attractions: { active: true }).
    where(active: true, deleted: false).
    order(:position).
    select{ |p| p.admissions.size > 0 || p.call_center? }
  }

  def to_detail
    {
      id: id,
      active: active,
      background: background,
      position: position,
      attraction_id: attraction_id,
      title: title,
      admissions_count: admissions.count,
      msrp: msrp,
      net_price: net_price,
      tax_total: calculate_taxes,
      taxes: taxes.map(&:to_summary),
      total: total,
      raw_total: total
    }
  end
  alias_method :to_summary, :to_detail

end

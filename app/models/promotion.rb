class Promotion < ApplicationRecord
  include Taxable
  include CurrencyHelper

  acts_as_list scope: :attraction

  belongs_to :attraction
  has_many :admissions, -> { available }
  has_one :promotion_image, -> { of_kind('promotion_image') }, class_name: 'Image', as: :imageable
  accepts_nested_attributes_for :promotion_image, allow_destroy: true

  scope :active, -> {
    includes(:attraction).
    where(attractions: { active?: true }).
    where(active?: true).
    order(:position).
    select{ |p| p.admissions.size > 0 || p.call_center? }
  }

  def to_detail
    {
      id: id,
      active: active?,
      position: position,
      attraction: attraction,
      title: title,
      description: description,
      msrp: int_to_currency(msrp),
      net_price: int_to_currency(net_price),
      tax_total: int_to_currency(calculate_taxes),
      taxes: tax_summary,
      total: int_to_currency(total),
      redemption: redemption?,
      call_center: call_center?
    }
  end
  alias_method :to_summary, :to_detail

end

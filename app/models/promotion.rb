class Promotion < ApplicationRecord
  include ActionView::Helpers::NumberHelper
  belongs_to :attraction
  has_many :admissions, -> { available }
  has_one :promotion_image, -> { promotion_images }, class_name: 'Image', as: :imageable
  has_and_belongs_to_many :taxes
  default_scope { includes(:taxes) }

  scope :active, -> {
    includes(:attraction).
    where(attractions: { active?: true }).
    where(active?: true).
    order(:position).
    select{ |p| p.admissions.size > 0 || p.call_center? }
  }

  def in_stock
     "stock"
  end

  def calculate_taxes
    percent  = self.taxes.where(kind: Tax::PERCENT).map(&:amount).sum
    percent_tax = (self.discount_in_cents.to_f * percent)/1000
    flat_fee  = self.taxes.where(kind: Tax::FLAT_FEE).map(&:amount).sum
    flat_fee  = flat_fee.to_f/100
    (percent_tax + flat_fee).round
  end

  def apply_taxes
    self.discount_in_cents + self.calculate_taxes
  end

  def normalize_discount
    self.discount_in_cents ? number_to_currency(self.discount_in_cents.to_f/100) : 'N/A'
  end

  def normalize_taxes
    self.calculate_taxes ? number_to_currency(self.calculate_taxes.to_f/100) : 'N/A'
  end

  def tax_summary
    self.taxes.map(&:summary).join(' | ') || '-'
  end

  def normalize_total
    total = self.calculate_taxes + self.discount_in_cents
    total ? number_to_currency(total.to_f/100) : 'N/A'
  end

  def tax_summary
    self.taxes.map(&:summary).join(' | ') || '-'
  end

end

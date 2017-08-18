class Promotion < ApplicationRecord
  include ActionView::Helpers::NumberHelper
  belongs_to :affiliate
  has_many :transaction_line_items
  has_many :promotion_taxes
  has_many :admissions, -> { available }
  belongs_to :image
  # has_many :taxes, foreign_key: "promotion_id", class_name: "PromotionTax"
  has_many :taxes, through: :promotion_taxes
  has_many :redemption_codes
  before_save :set_promotion_sort
  default_scope { includes(:taxes) }

  default_scope { includes(:taxes) }

  scope :active, -> {
    includes(:affiliate).
    where(affiliates: { active?: true }).
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

  private
  def set_promotion_sort
    if (self.position < 0)
      last_position = Promotion.maximum(:position) || 0
      self.position = last_position.to_i + 1
    end
    existitng_sort = Promotion.where(position: self.position).where.not(id: self.id).first
    existitng_sort.update_attributes(position: self.position + 1) if existitng_sort
  end
end

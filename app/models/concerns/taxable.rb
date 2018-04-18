module Taxable
  extend ActiveSupport::Concern

  included do
    has_many :tax_joins, as: :taxable, dependent: :destroy
    has_many :taxes, through: :tax_joins
  end

  def calculate_taxes
    percents = taxes.where(kind: Tax::PERCENT).map(&:amount).sum
    percent_taxes = (net_price.to_f * percents.to_f)/1000
    fee_taxes = taxes.where(kind: Tax::FLAT_FEE).map(&:amount).sum.to_f
    (percent_taxes + fee_taxes).round
  end

  def tax_summary
    taxes.map(&:summary)
  end

  def total
    calculate_taxes.to_i + net_price.to_i
  end

end

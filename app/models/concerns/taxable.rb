module Taxable
  extend ActiveSupport::Concern

  included do
    has_many :tax_joins, as: :taxable
    has_many :taxes, through: :tax_joins
  end

  def calculate_taxes
    percents = taxes.where(kind: Tax::PERCENT).map(&:amount).sum
    percent_taxes = (net_price.to_f * percents)/1000
    fee_taxes = taxes.where(kind: Tax::FLAT_FEE).map(&:amount).sum.to_f/100
    (percent_taxes + fee_taxes).round
  end

  def tax_summary
    taxes.map(&:summary)
  end

  def total
    calculate_taxes + net_price
  end

end

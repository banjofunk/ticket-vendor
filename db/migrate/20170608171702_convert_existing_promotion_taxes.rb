class ConvertExistingPromotionTaxes < ActiveRecord::Migration[5.0]
  def change
    uniq_promo_taxes = PromotionTax.all.map {|t| {
      kind: t.kind,
      amount: t.amount,
      description: t.description
    }}.uniq

    uniq_promo_taxes.each { |ptax| Tax.create ptax }
    PromotionTax.all.each do |pt|
      tax = Tax.where({
        kind: pt.kind,
        amount: pt.amount,
        description: pt.description
      }).first
      pt.update_attributes(tax_id: tax.id)
    end
  end
end

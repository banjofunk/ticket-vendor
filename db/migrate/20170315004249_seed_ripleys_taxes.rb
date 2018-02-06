class SeedRipleysTaxes < ActiveRecord::Migration[5.0]
  def change
    Promotion.all.each do |p|
      p.taxes.create(
        kind: PromotionTax::PERCENT,
        amount: 50,
        description: 'State Admissions Tax'
      )
      p.taxes.create(
        kind: PromotionTax::PERCENT,
        amount: 15,
        description: 'Horry County Hospitality Tax'
      )
      p.taxes.create(
        kind: PromotionTax::PERCENT,
        amount: 10,
        description: 'Myrtle Beach Hospitality Tax'
      )
    end
  end
end

class AddTaxIdToPromotionTaxes < ActiveRecord::Migration[5.0]
  def change
    add_column :promotion_taxes, :tax_id, :integer
  end
end

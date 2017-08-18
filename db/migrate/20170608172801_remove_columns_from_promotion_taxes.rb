class RemoveColumnsFromPromotionTaxes < ActiveRecord::Migration[5.0]
  def change
    remove_column :promotion_taxes, :kind, :integer
    remove_column :promotion_taxes, :amount, :integer
    remove_column :promotion_taxes, :description, :string
  end
end

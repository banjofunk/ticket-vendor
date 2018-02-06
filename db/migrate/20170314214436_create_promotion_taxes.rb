class CreatePromotionTaxes < ActiveRecord::Migration[5.0]
  def change
    create_table :promotion_taxes do |t|
      t.integer :promotion_id
      t.integer :kind
      t.integer :amount
      t.string :description
    end
  end
end

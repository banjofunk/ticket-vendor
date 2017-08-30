class CreateTaxes < ActiveRecord::Migration[5.0]
  def change
    create_table :taxes do |t|
      t.integer :kind
      t.integer :amount
      t.string  :description
      t.boolean :active?, default: true
    end

    create_table :promotions_taxes, id: false do |t|
      t.integer :promotion_id
      t.integer :tax_id
    end
  end
end

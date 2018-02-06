class CreateTaxes < ActiveRecord::Migration[5.0]
  def change
    create_table :taxes do |t|
      t.integer :kind
      t.integer :amount
      t.string :description
    end
  end
end

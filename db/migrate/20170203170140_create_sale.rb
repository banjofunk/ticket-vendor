class CreateSale < ActiveRecord::Migration[5.0]
  def change
    create_table :sales do |t|
      t.integer :redemption_code_id
      t.string :first_name
      t.string :last_name
      t.integer :amount_in_cents
      t.string :card
    end
  end
end

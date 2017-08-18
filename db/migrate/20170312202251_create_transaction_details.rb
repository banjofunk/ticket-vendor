class CreateTransactionDetails < ActiveRecord::Migration[5.0]
  def change
    create_table :transaction_details do |t|
      t.integer :transaction_id
      t.string :bt_id
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.integer :total_in_cents
    end
  end
end

class CreateAdmissions < ActiveRecord::Migration[5.0]
  def change
    create_table :admissions do |t|
      t.string :code, null: false
      t.integer :cost, default: 0 #cents
      t.integer :attraction_sku_id, null: false
      t.integer :transaction_id
      t.date :expires_at
      t.datetime :created_at
    end

    add_foreign_key :admissions, :attraction_skus
    add_foreign_key :admissions, :transactions
  end
end

class AddTransactionIdToRedemptionCodes < ActiveRecord::Migration[5.0]
  def change
    drop_table :redemption_codes
    create_table :redemption_codes, { id: false } do |t|
      t.string :code, null: false
      t.integer :affiliate_id, null: false
      t.integer :transaction_id
      t.datetime :created_at
    end

    add_foreign_key :redemption_codes, :affiliates
    add_foreign_key :redemption_codes, :transactions

    execute %Q{ ALTER TABLE "redemption_codes" ADD PRIMARY KEY ("code"); }
  end
end

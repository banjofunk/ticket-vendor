class CreateTransactionLineItem < ActiveRecord::Migration[5.0]
  def change
    create_table :transaction_line_items do |t|
      t.integer :transaction_id
      t.integer :promotion_id
      t.integer :amount
      t.integer :tax
      t.integer :total
      t.string :tax_summary
    end
  end
end

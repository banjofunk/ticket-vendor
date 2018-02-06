class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.string :ct_id
      t.string :gateway_authcode
      t.string :gateway_tx_id
      t.string :agent
      t.string :access_token
      t.datetime :first_accessed_at
      t.string   :first_accessed_from
      t.datetime :created_at
    end

    add_index :transactions, :ct_id
    add_index :transactions, :access_token
  end
end

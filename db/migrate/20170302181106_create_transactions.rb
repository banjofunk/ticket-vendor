class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.string   :agent
      t.string   :access_token
      t.datetime :first_accessed_at
      t.string   :first_accessed_from
      t.datetime :created_at
    end

    add_index :transactions, :access_token
  end
end

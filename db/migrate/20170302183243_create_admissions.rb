class CreateAdmissions < ActiveRecord::Migration[5.0]
  def change
    create_table :admissions do |t|
      t.string   :code, null: false
      t.integer  :promotion_id
      t.integer  :transaction_id
      t.json     :ticket_data, default: {}
      t.date     :expires_at
      t.datetime :created_at
    end

    add_foreign_key :admissions, :promotions
    add_foreign_key :admissions, :transactions
  end
end

class CreateModels < ActiveRecord::Migration[5.0]
  def change
    create_table :admissions do |t|
      t.string   :code, null: false
      t.integer  :transaction_id
      t.date     :expires_at
      t.integer  :promotion_id
      t.json     :ticket_data, default: {}
      t.timestamps
    end

    create_table :attractions do |t|
      t.string  :name
      t.boolean :active, default: false
      t.string  :logo
      t.string  :attraction_image
      t.string  :description
      t.integer :expiry_window, default: 0
      t.string  :symbology
      t.integer :position
      t.boolean  :deleted, default: false
      t.timestamps
    end

    create_table :promotions do |t|
      t.boolean  :active, default: false
      t.integer  :position, default: -1
      t.integer  :attraction_id
      t.string   :title
      t.integer  :msrp
      t.integer  :net_price
      t.text     :layout
      t.string   :background
      t.boolean  :deleted, default: false
      t.timestamps
    end

    create_table :tax_joins do |t|
      t.integer :tax_id
      t.integer :taxable_id
      t.string  :taxable_type
    end

    create_table :taxes do |t|
      t.integer :kind
      t.integer :amount
      t.string  :description
    end

    create_table :transactions do |t|
      t.string   :access_token
      t.string   :braintree_id
      t.string   :email
      t.string   :phone
      t.integer  :total
      t.timestamps
    end
    add_index :transactions, :access_token

    add_foreign_key :admissions, :promotions
    add_foreign_key :admissions, :transactions
    add_foreign_key :promotions, :attractions
  end
end

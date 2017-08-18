class CreateAttractions < ActiveRecord::Migration[5.0]
  def change
    create_table :attractions do |t|
      t.string :name, null: false
      t.text :layout, null: false
      t.string :redemption_prefix, limit: 6, index: true
      t.integer :expiry_window, default: 0
      t.string :symbology # Code128B, Code39
      t.timestamps
    end

    create_table :attraction_skus do |t|
      t.integer :attraction_id, null: false
      t.binary :background, null: false
      t.integer :cost, default: 0 # in cents!
      t.string :description, null: false
      t.string :question, null: false
      t.boolean :redemption_default, default: false
      t.boolean :creates_admission, default: false
      t.timestamps
    end

    add_foreign_key :attraction_skus, :attractions
  end
end

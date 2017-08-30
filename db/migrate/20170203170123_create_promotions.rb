class CreatePromotions < ActiveRecord::Migration[5.0]
  def change
    create_table :promotions do |t|
      t.integer :attraction_id
      t.string  :title
      t.string  :description
      t.integer :msrp
      t.integer :price
      t.binary  :background
      t.boolean :redemption_option, default: false
      t.boolean :active?, default: false
      t.boolean :call_center?, default: false
      t.boolean :inventory?, default: true
      t.timestamps
    end
    add_foreign_key :promotions, :attractions
  end
end

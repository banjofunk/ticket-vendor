class CreateAttractions < ActiveRecord::Migration[5.0]
  def change
    create_table :attractions do |t|
      t.string  :name
      t.string  :description
      t.text    :layout
      t.string  :redemption_prefix, limit: 6, index: true
      t.integer :expiry_window, default: 0
      t.string  :symbology # Code128B, Code39
      t.boolean :active?, default: false
      t.boolean :attraction?, default: false
      t.boolean :resort?, default: false
      t.boolean :sponsor?, default: false
    end
  end
end

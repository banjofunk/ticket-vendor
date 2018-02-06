class CreatePromotion < ActiveRecord::Migration[5.0]
  def change
    create_table :promotions do |t|
      t.boolean :active?, default: false
      t.integer :position, default: -1
      t.integer :affiliate_id
      t.integer :image_id
      t.string :title
      t.string :subtitle
      t.string :short_description
      t.string :description
      t.integer :retail_in_cents
      t.integer :discount_in_cents
    end
  end
end

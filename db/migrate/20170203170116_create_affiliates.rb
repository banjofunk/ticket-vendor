class CreateAffiliates < ActiveRecord::Migration[5.0]
  def change
    create_table :affiliates do |t|
      t.string :name
      t.boolean :active?, default: false
      t.integer :logo_image_id
      t.integer :banners, array: true, default: []
      t.boolean :attraction?, default: false
      t.integer :attraction_sort, default: 0
      t.boolean :resort?, default: false
      t.integer :resort_sort, default: 0
      t.boolean :sponsor?, default: false
      t.integer :sponsor_sort, default: 0
      t.string :description
      t.string :short_description
    end
  end
end

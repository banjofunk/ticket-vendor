class CreateBannerCollectionImage < ActiveRecord::Migration[5.0]
  def change
    create_table :banner_collection_images do |t|
      t.integer :banner_collection_id
      t.integer :image_id
      t.integer :position
    end
  end
end

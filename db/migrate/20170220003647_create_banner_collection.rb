class CreateBannerCollection < ActiveRecord::Migration[5.0]
  def change
    create_table :banner_collections do |t|
      t.integer :page_id
    end
  end
end

class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string  :src
      t.integer :kind
      t.integer :imageable_id
      t.string  :imageable_type
    end
  end
end

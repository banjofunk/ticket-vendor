class CreateImage < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.integer :kind
      t.boolean :active?, default: true
      t.string :src
    end
  end
end

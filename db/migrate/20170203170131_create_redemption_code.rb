class CreateRedemptionCode < ActiveRecord::Migration[5.0]
  def change
    create_table :redemption_codes do |t|
      t.integer :promotion_id
      t.string :code
      t.boolean :available
    end
  end
end

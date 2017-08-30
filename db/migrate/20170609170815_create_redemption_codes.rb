class CreateRedemptionCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :redemption_codes, { id: false } do |t|
      t.string  :code, null: false
      t.integer :attraction_id, null: false
      t.integer :admission_id
      t.timestamps
    end
    add_foreign_key :redemption_codes, :attractions
    add_foreign_key :redemption_codes, :admissions

    execute %Q{ ALTER TABLE "redemption_codes" ADD PRIMARY KEY ("code"); }
  end
end

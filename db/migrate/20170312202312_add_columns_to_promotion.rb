class AddColumnsToPromotion < ActiveRecord::Migration[5.0]
  def change
    add_column :promotions, :background, :binary
    add_column :promotions, :redemption_default, :boolean, default: false
    add_column :promotions, :created_at, :datetime
    add_column :promotions, :updated_at, :datetime
  end
end

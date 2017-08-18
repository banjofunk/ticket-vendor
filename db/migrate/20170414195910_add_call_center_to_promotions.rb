class AddCallCenterToPromotions < ActiveRecord::Migration[5.0]
  def change
    add_column :promotions, :call_center?, :boolean, default: false
    remove_column :admissions, :attraction_sku_id
  end
end

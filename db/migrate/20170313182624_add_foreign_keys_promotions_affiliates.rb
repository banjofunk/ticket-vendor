class AddForeignKeysPromotionsAffiliates < ActiveRecord::Migration[5.0]
  def change
    add_column :admissions, :promotion_id, :integer
    add_foreign_key :admissions, :promotions
    add_foreign_key :promotions, :affiliates
    Admission.all.each do |admission|
      if Promotion.where(id: admission.attraction_sku_id).first
        admission.promotion_id = admission.attraction_sku_id
        admission.save
      end
    end

  end
end

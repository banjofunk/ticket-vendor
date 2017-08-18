class AddAdmissionIdToRedemptionCodes < ActiveRecord::Migration[5.0]
  def change
    add_column :redemption_codes, :admission_id, :integer
  end
end

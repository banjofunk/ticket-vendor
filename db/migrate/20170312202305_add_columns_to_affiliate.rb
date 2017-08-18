class AddColumnsToAffiliate < ActiveRecord::Migration[5.0]
  def change
    add_column :affiliates, :layout, :text
    add_column :affiliates, :redemption_prefix, :string, limit: 6, index: true
    add_column :affiliates, :expiry_window, :integer, default: 0
    add_column :affiliates, :symbology, :string # Code128B, Code39
  end
end

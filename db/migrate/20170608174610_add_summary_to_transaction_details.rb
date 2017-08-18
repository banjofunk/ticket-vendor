class AddSummaryToTransactionDetails < ActiveRecord::Migration[5.0]
  def change
    add_column :transaction_details, :summary, :text
  end
end

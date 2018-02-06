class AddTicketDataToAdmissions < ActiveRecord::Migration[5.0]
  def change
    add_column :admissions, :ticket_data, :json, default: {}
  end
end

class RedemptionCode < ApplicationRecord
  self.primary_key = 'code'
  belongs_to :affiliate
  belongs_to :txn, class_name: 'Transaction', foreign_key: 'transaction_id', optional: true
  belongs_to :admission

end

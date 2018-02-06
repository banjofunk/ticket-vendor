class RedemptionCode < ApplicationRecord
  self.primary_key = 'code'
  belongs_to :attraction
  belongs_to :admission
  belongs_to :txn, class_name: 'Transaction', foreign_key: 'transaction_id', optional: true

end

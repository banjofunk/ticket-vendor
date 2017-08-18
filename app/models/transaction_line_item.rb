class TransactionLineItem < ApplicationRecord
  belongs_to :txn, foreign_key: "transaction_id", class_name: "Transaction"
  belongs_to :promotion

end

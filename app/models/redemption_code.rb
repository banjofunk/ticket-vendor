class RedemptionCode < ApplicationRecord
  self.primary_key = 'code'
  
  belongs_to :attraction
  belongs_to :admission

end

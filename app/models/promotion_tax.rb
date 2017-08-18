class PromotionTax < ApplicationRecord
  belongs_to :promotion
  belongs_to :tax
  default_scope { includes(:tax) }

  default_scope { includes(:tax) }

end

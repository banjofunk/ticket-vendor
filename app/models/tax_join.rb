class TaxJoin < ActiveRecord::Base
  belongs_to :taxable, polymorphic: true
  belongs_to :tax
end

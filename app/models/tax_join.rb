class TaxJoin < ActiveRecord::Base
  belongs_to :taxable, polymorphic: true, optional: true
  belongs_to :tax
end

class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true

  KINDS = %w(logo banner promotion_image attraction_image)
  KINDS.each_with_index.map {|k, i| self.const_set(k.upcase, i)}
  scope :of_kind, lambda{ |knd| where kind: KINDS.index(knd.to_s) }

end

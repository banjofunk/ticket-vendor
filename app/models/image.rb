class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true

  LOGO = 0
  BANNER = 1
  PROMOTION_IMAGE = 2

  scope :banners, -> { where(:kind => BANNER) }
  scope :logos, -> { where(:kind => LOGO) }
  scope :promotion_images, -> { where(:kind => PROMOTION_IMAGE) }


end

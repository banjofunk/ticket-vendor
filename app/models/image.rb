class Image < ApplicationRecord
  has_many :banner_collection_images

  LOGO = 1
  BANNER = 2
  PROMO = 3

  scope :banners, -> {
    where(:kind => BANNER, :active? => true)
  }
  scope :logos, -> {
    where(:kind => LOGO, :active? => true)
  }
  scope :promos, -> {
    where(:kind => PROMO, :active? => true)
  }


end

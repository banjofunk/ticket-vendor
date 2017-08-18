class BannerCollection < ApplicationRecord
  belongs_to :page
  has_many :banner_collection_images

end

class Page < ApplicationRecord
  has_many :banners, -> { banners }, class_name: 'Image', as: :imageable
end

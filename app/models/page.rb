class Page < ApplicationRecord
  has_one :banner_collection
  has_many :banner_collection_images, -> { order 'banner_collection_images.position ASC' }, :through => :banner_collection
  before_create :build_default_banner_collection

  private

  def build_default_banner_collection
    build_banner_collection
    true
  end

end

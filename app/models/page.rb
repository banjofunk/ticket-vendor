class Page < ApplicationRecord
  has_many :banners, -> { of_kind('banner') }, foreign_key: 'imageable_id', class_name: 'Image', as: :imageable

  def to_detail
    {
      banners: banners.map(&:src),
      content: content
    }
  end
  alias_method :to_summary, :to_detail

end

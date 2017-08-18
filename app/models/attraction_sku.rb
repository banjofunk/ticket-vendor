class AttractionSku < ApplicationRecord
  belongs_to :attraction, inverse_of: :skus
  has_many :admissions

  def self.pluck_questions
    self.all.pluck(:question)
  end
end

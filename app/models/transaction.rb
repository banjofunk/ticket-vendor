require 'exceptions'

class Transaction < ApplicationRecord
  has_many :admissions
  has_one :details, foreign_key:'transaction_id', class_name: 'TransactionDetail'
  has_many :redemption_codes

  def grouped_admissions
    grouped_admissions = self.admissions.group_by {|a| a.promotion_id}
    qty_admissions = []
    grouped_admissions.keys.each do |key|
      promotionCount = grouped_admissions[key].count
      promotion = grouped_admissions[key].first.promotion
      qty_admissions << OpenStruct.new({
        count:promotionCount,
        id:promotion.id,
        attraction: promotion.attraction.name,
        description: promotion.short_description,
        price: promotion.net_price.to_f/100,
        tax: promotion.calculate_taxes.to_f/100,
        total: promotion.apply_taxes.to_f/100
      })
    end
    qty_admissions
  end

  def self.create_from_promos(cart)
    txn = nil

    ActiveRecord::Base.transaction do
      md5 = Digest::MD5.new
      txn = self.create!()
      md5.update(txn.id.to_s)
      txn.access_token = md5
      txn.save

      cart.keys.each do |promo|
        promotion = Promotion.find(promo)
        qty = cart[promo]
        qty.times do
          admission = Admission.find_by(txn: nil, promotion: promotion).try(:lock!, true)
          admission.txn = txn
          attraction = promotion.attraction
          if attraction.expiry_window.present?
            admission.expires_at = DateTime.now + attraction.expiry_window.days
          end
          admission.save!
        end
      end
    end
    txn
  end
end

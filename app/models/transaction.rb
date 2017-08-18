require 'exceptions'

class Transaction < ApplicationRecord
  has_many :admissions
  has_many :transaction_line_items
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
        affiliate: promotion.affiliate.name,
        description: promotion.short_description,
        price: promotion.discount_in_cents.to_f/100,
        tax: promotion.calculate_taxes.to_f/100,
        total: promotion.apply_taxes.to_f/100
      })
    end
    qty_admissions
  end

  def self.create_from_promos(promos)
    txn = nil

    ActiveRecord::Base.transaction do
      md5 = Digest::MD5.new
      txn = self.create!()
      md5.update(txn.id.to_s)
      txn.access_token = md5
      txn.save

      promos.each do |promo|
        promotion = Promotion.find(promo)
        admission = Admission.find_by(txn: nil, promotion: promotion).try(:lock!, true)
        admission.txn = txn
        affiliate = promotion.affiliate
        if affiliate.expiry_window.present?
          admission.expires_at = DateTime.now + affiliate.expiry_window.seconds
        end

        admission.save!
      end
    end

    txn
  end

  def update_from_promos(promos)
    ActiveRecord::Base.transaction do
      unless self.access_token
        md5 = Digest::MD5.new
        md5.update(self.id.to_s)
        self.access_token = md5
        self.save
      end

      promos.each do |promo|
        promotion = Promotion.find(promo[0])
        redemption_code = promo[1]
        admission = Admission.find_by(txn: nil, promotion: promotion).lock!(true)
        redemption_code.update_attributes(admission: admission) unless redemption_code === "COMPIT"
        admission.txn = self
        admission.redemption_code = redemption_code unless redemption_code === "COMPIT"
        affiliate = promotion.affiliate
        if affiliate.expiry_window.present?
          admission.expires_at = DateTime.now + affiliate.expiry_window.seconds
        end

        admission.save!
      end
    end
    self
  end
end

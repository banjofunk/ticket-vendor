include ActionView::Helpers::NumberHelper
require 'benchmark'

class BackfillTransactionSummary < ActiveRecord::Migration[5.0]
  def change
    puts Benchmark.measure {
      admissions = Admission.where.not(txn:nil).where("ticket_data ->> 'summary' IS NULL").includes(:promotion, txn: :details)
      ad_count = admissions.count
      admissions.each do |admission|
        puts ad_count
        ad_count -= 1
        promotion = admission.promotion
        affiliate = promotion.affiliate
        txn = admission.txn
        details = txn.details
        amoStr = number_to_currency(promotion.discount_in_cents.to_f/100)
        taxStr = number_to_currency(promotion.calculate_taxes.to_f/100)
        totalStr = number_to_currency(promotion.apply_taxes.to_f/100)

        summary = {}
        summary[:date] = txn.created_at.strftime('%m/%d/%Y')
        summary[:time] = txn.created_at.in_time_zone("Pacific Time (US & Canada)").strftime('%I:%M%P PST')
        summary[:agent] = txn.agent || "-"
        summary[:transaction_id] = txn.id.to_s
        summary[:access_token] = txn.access_token
        summary[:braintree_id] = details&.bt_id
        summary[:reservation_code] = admission.code
        summary[:redemption_code] = admission.redemption_code.try(:code) || "-"
        summary[:first_name] = details&.first_name
        summary[:last_name] = details&.last_name
        summary[:email] = details&.email
        summary[:phone] = details&.phone
        summary[:promo_id] = promotion.id
        summary[:company] = affiliate.name
        summary[:description] = promotion.short_description
        summary[:tax_summary] = promotion.taxes.map(&:summary).join("\n")
        summary[:sku_price] = admission.redemption_code ? "$0.00" : amoStr
        summary[:sku_taxes] =  admission.redemption_code ? "$0.00" : taxStr
        summary[:sku_total] =  admission.redemption_code ? "$0.00" : totalStr
        summary[:transaction_total] = number_to_currency((details.try(:total_in_cents) || 0).to_f/100)
        admission.ticket_data['summary'] = summary
        admission.save
      end
    }
  end
end

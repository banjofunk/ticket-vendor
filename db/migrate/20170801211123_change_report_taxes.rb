class ChangeReportTaxes < ActiveRecord::Migration[5.0]
  def change
    Admission.where.not(txn:nil).includes(promotion: :taxes).last(20).each do |admission|
      promotion = admission.promotion
      taxes = promotion.taxes
      admission_summary = admission.ticket_data.dig("summary") || {}
      admission_summary["taxes"] = {}
      taxes.each do |tax|
        if tax.kind === Tax::PERCENT
          tax_amount = (promotion.discount_in_cents.to_f/100) * (tax.amount.to_f/1000)
        else
          tax_amount = tax.amount.to_f/100
        end
        admission_summary["taxes"][tax.id.to_s] = tax_amount
      end
      admission.ticket_data["summary"] = admission_summary
      total = admission.ticket_data["summary"]["transaction_total"]
      unless total.kind_of? Float
        total = total.to_f/100
      end
      admission.ticket_data["summary"]["transaction_total"] = total
      admission.save
    end
  end
end

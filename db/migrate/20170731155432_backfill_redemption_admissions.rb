include ActionView::Helpers::NumberHelper
require 'benchmark'

class BackfillRedemptionAdmissions < ActiveRecord::Migration[5.0]
  def change
    puts Benchmark.measure {
      RedemptionCode.where.not(txn:nil).where(admission:nil).includes(affiliate: :promotions, txn: :admissions).group_by(&:affiliate).each do |group|
        affiliate = group.first
        promotion = affiliate.redemption_promotion
        promotion ||= affiliate.promotions
        group.last.each do |rc|
          if promotion
            admission = rc.txn.admissions.joins("LEFT OUTER JOIN redemption_codes ON redemption_codes.admission_id = admissions.id").where("redemption_codes.admission_id IS null").first
            rc.update_attributes(admission: admission) if admission
          end
        end
      end
    }

  end
end

class Tax < ApplicationRecord
  has_many :promotion_taxes
  has_many :promotions, through: :promotion_taxes

  KINDS = ['percent', 'flat_fee']
  KINDS.each_with_index.map {|k, i| self.const_set(k.upcase, i)}

  def kind_str
    KINDS[self.kind]
  end

  def summary
    case self.kind_str
    when 'percent'
      percent = (self.amount.to_f/10).tap{|x| break x.to_i == x ? x.to_i : x}
      summary = "#{self.description} - #{percent}%"
    when 'flat_fee'
      summary = "#{self.description} - $#{self.amount.to_f/100}"
    else
      summary = ''
    end
    summary
  end

end

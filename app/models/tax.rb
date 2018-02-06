class Tax < ApplicationRecord
  belongs_to :taxable, polymorphic: true
  has_many :tax_joins

  KINDS = %w(percent flat_fee)
  KINDS.each_with_index.map {|k, i| const_set(k.upcase, i)}

  def kind
    KINDS[read_attribute(:kind)]
  end

  def summary
    case kind
    when 'percent'
      percent = (amount.to_f/10).tap{|x| break x.to_i == x ? x.to_i : x}
      summary = "#{description} - #{percent}%"
    when 'flat_fee'
      summary = "#{description} - $#{amount.to_f/100}"
    else
      summary = ''
    end
    summary
  end

end

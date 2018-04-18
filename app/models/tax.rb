class Tax < ApplicationRecord
  belongs_to :taxable, polymorphic: true, optional: true
  has_many :tax_joins, :dependent => :destroy

  default_scope -> {order(:id)}

  KINDS = %w(percent flat_fee)
  KINDS.each_with_index.map {|k, i| const_set(k.upcase, i)}

  def kind_str
    KINDS[read_attribute(:kind)]
  end

  def summary
    case kind_str
    when 'percent'
      percent = (amount.to_f/10).tap{|x| break x.to_i == x ? x.to_i : x}
      summary = "#{description} - #{percent}%"
    when 'flat_fee'
      summary = "#{description} - $#{"%.2f" % (amount.to_f/100)}"
    else
      summary = ''
    end
    summary
  end

  def to_detail
    {
      id: id,
      active: tax_joins.count > 0,
      amount: amount,
      description: description,
      kind: kind,
      summary: summary
    }
  end
  alias_method :to_summary, :to_detail


end

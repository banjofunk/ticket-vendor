module CurrencyHelper
  include ActionView::Helpers::NumberHelper

  def currency_float(int)
    int.to_f/100
  end

  def int_to_currency(int)
    float = currency_float(int)
    number_to_currency(float)
  end

end

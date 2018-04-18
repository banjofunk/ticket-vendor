include ActionView::Helpers::NumberHelper

class Api::V1::PaymentsController < ApplicationController
  Braintree::Configuration.environment = ENV['BT_ENVIRONMENT'].try(:to_sym)
  Braintree::Configuration.merchant_id = ENV['BT_MERCHANT_ID']
  Braintree::Configuration.public_key = ENV['BT_PUBLIC_KEY']
  Braintree::Configuration.private_key = ENV['BT_PRIVATE_KEY']

  def token
    token = Braintree::ClientToken.generate
    render json: {token: token}
  end

  def send_payment
    cart = params[:cart]
    total = cart.keys.map { |id|
      promo = Promotion.find id
      qty = cart[id]
      promo.total * qty
    }.sum.to_f/100

    if params[:amount] == sprintf('%.2f', total)
      result = Braintree::Transaction.sale(
        amount: total,
        payment_method_nonce: params[:nonce],
        options: {
          submit_for_settlement: true
        }
      )

      if result.success?
        transaction = Transaction.create_from_promos(cart)
      else
        raise PaymentError, "#{result.transaction}"
      end
    else
      raise PaymentError, "cart total does not match charge total"
    end

    render json: {
      bt_id: result.transaction.id,
      access_token: transaction.access_token
    }

  rescue PaymentError => pe
    render json: {
      type: 'Error',
      message: pe.message
    }, status: :unprocessable_entity
  end
end

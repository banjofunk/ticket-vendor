include ActionView::Helpers::NumberHelper
require 'ct'

class Api::PaymentsController < ApplicationController
  Braintree::Configuration.environment = ENV['BT_ENVIRONMENT'].try(:to_sym)
  Braintree::Configuration.merchant_id = ENV['BT_MERCHANT_ID']
  Braintree::Configuration.public_key = ENV['BT_PUBLIC_KEY']
  Braintree::Configuration.private_key = ENV['BT_PRIVATE_KEY']

  def client_token
    token = Braintree::ClientToken.generate
    render json: {token: token}
  end

  def send_payment
    data = JSON.parse(params['json'])
    nonce = data['nonce']
    cart_data = data['cartData']
    codes = data['codes'] || []
    puts data.inspect

    ph_numb = data['phone'].scan(/\d/).join('')
    phone_number = ph_numb.length > 10 ? "+#{ph_numb}" : "+1#{ph_numb}"

    bama_count = 0
    total_in_cents = 0
    promotion_ids = []

    cart_data.each do |promo|
      promo_id = promo['id'].to_i
      if promo_id && promo_id != 0
        promotion = Promotion.find promo_id
        qty = promo['qty'].to_i
        qty.times { promotion_ids << promotion.id }
        if [61,62].include? promotion.id
          adult_promotion = Promotion.find(promotion.id)
          adult_price = adult_promotion.apply_taxes
          adult_item_total = adult_price * promo["ticketData"][bama_count]['adultTix'].to_i

          free_kids = (adult_item_total/1).floor
          child_promotion = Promotion.find(promotion.id)
          child_price = child_promotion.apply_taxes
          child_item_total = child_price * promo["ticketData"][bama_count]['childTix'].to_i
          adjusted_children = child_item_total - free_kids
          adjusted_children = 0 if adjusted_children < 0
          item_total = adjusted_children + adult_item_total
          bama_count += 1
        else
          price = promotion.apply_taxes
          item_total = price * qty
        end
        total_in_cents += item_total
      end
    end

    total_in_cents += 199 if total_in_cents > 0 #transaction fee
    total = total_in_cents.to_f/100

    result = false
    if total_in_cents > 0
      result = Braintree::Transaction.sale(
        :amount => total.to_s,
        :payment_method_nonce => nonce,
        :customer => {
          :first_name => data['firstName'],
          :last_name => data['lastName'],
          :phone => phone_number,
          :email => data['email']
        },
        :options => {
          :submit_for_settlement => true
        }
      )
    end

    code_promotion_ids = []
    if !result
      transaction = Transaction.create
      transaction.update_from_promos(code_promotion_ids)
      transaction.update_attributes(ct_id: data['ticketId'], agent: data['agent'])
      ticket_link = "#{request.base_url}/t/#{transaction.access_token}"
      comped_ticket = codes.map {|code| code["code"].upcase.strip}.uniq.include?("COMPIT")
      transaction_id = comped_ticket ? "COMP_TICKETS" : "REDEMPTION"
      response = {
        success: true,
        first_name: data['firstName'],
        last_name: data['lastName'],
        email: data['email'],
        phone: phone_number,
        transaction_id: transaction_id,
        ticket_link: ticket_link,
        total: "$0.00"
      }
    elsif result.success?
      transaction = Transaction.create_from_promos(promotion_ids)
      transaction.update_attributes(ct_id: data['ticketId'], agent: data['agent'])
      ticket_link = "#{request.base_url}/t/#{transaction.access_token}"
      response = {
        success: true,
        first_name: result.transaction.customer_details.first_name,
        last_name: result.transaction.customer_details.last_name,
        email: result.transaction.customer_details.email,
        phone: result.transaction.customer_details.phone,
        transaction_id: result.transaction.id,
        ticket_link: ticket_link,
        total: result.transaction.amount
      }
    elsif result.transaction
      result_code = result.transaction.processor_response_code
      result_text = result.transaction.processor_response_text
      response = {
        success: false,
        errors: ["#{result_code}: #{result_text}"]
      }
    else
      response = {
        success: false,
        errors: result.errors
      }
    end

    if response[:success]
      codes.each do |code|
        if code['code'].upcase.strip == "COMPIT"
          promotion = Promotion.find(code['id'].to_i)
          code_promotion_ids << [promotion.id, code['code']] if promotion
        else
          upcase_code = code['code'].upcase.strip
          redemption_code = RedemptionCode.where("UPPER(code) = ?", upcase_code).first
          affiliate = redemption_code.try(:affiliate)
          promotions = affiliate.try(:redemption_promotion) || []
          if promotions.count === 1 && affiliate.id != 5
            promotion = promotions.first
          else
            promotion = Promotion.find(code['id'].to_i)
          end
          code_promotion_ids << [promotion.id, redemption_code] if promotion
          redemption_code.update_attributes(txn: transaction)
        end
      end
      transaction.update_from_promos(code_promotion_ids)

      transaction.admissions.where(promotion_id: [61,62]).each_with_index do |bama, idx|
        cart_data.each do |item|
          if [61, 62].include? item['id']
            bama.ticket_data = item["ticketData"][idx]
            bama.save
          end
        end
      end
      TransactionDetail.create(
        txn: transaction,
        bt_id: response[:transaction_id],
        first_name: response[:first_name],
        last_name: response[:last_name],
        email: response[:email],
        phone: response[:phone],
        total_in_cents: total_in_cents
      )

      line_items = []
      response[:line_items] = "\n"
      transaction.admissions.each_with_index do |id, idx|
        admission = Admission.find(id)
        promotion = admission.promotion
        price = promotion.apply_taxes
        tax_summary = promotion.taxes.map(&:summary).join(',')
        line_item =
          transaction.
            transaction_line_items.create(
              promotion: promotion,
              amount: promotion.discount_in_cents,
              tax: promotion.calculate_taxes,
              total: promotion.apply_taxes,
              tax_summary: tax_summary)

        amoStr = number_to_currency(line_item.amount.to_f/100)
        taxStr = number_to_currency(line_item.tax.to_f/100)
        totalStr = number_to_currency(line_item.total.to_f/100)
        lineString = <<EOF
  line item #{idx + 1}:
    affiliate: #{promotion.affiliate.name}
    ticket:#{promotion.short_description}
    admission_code: #{admission.code}
    tax_summary:
      #{promotion.taxes.map(&:summary).join("\n")}
    price: #{amoStr}
    tax: #{taxStr}
    total: #{totalStr}
  ----------------------------
EOF
        response[:line_items] << lineString
        summary = {}
        summary[:date] = transaction.created_at.strftime('%m/%d/%Y')
        summary[:time] = transaction.created_at.in_time_zone("Pacific Time (US & Canada)").strftime('%I:%M%P PST'),
        summary[:agent] = transaction.agent || "-"
        summary[:transaction_id] = transaction.id
        summary[:access_token] = transaction.access_token
        summary[:braintree_id]  = response[:transaction_id]
        summary[:reservation_code] = admission.code
        summary[:redemption_code] = admission.redemption_code.try(:code) || "-"
        summary[:first_name] = response[:first_name]
        summary[:last_name] = response[:last_name]
        summary[:email] = response[:email]
        summary[:phone] = response[:phone]
        summary[:promo_id] = promotion.id
        summary[:company] = promotion.affiliate.name
        summary[:description] = promotion.short_description
        summary[:tax_summary] = promotion.taxes.map(&:summary).join("\n") || "-"
        summary[:taxes] = {}
        promotion.taxes.each do |tax|
          if tax.kind === Tax::PERCENT
            tax_amount = (promotion.discount_in_cents.to_f/100) * (tax.amount.to_f/1000)
          else
            tax_amount = tax.amount.to_f/100
          end
          summary[:taxes][tax.id.to_s] = tax_amount
        end
        summary[:sku_price] = admission.redemption_code ? "$0.00" : amoStr
        summary[:sku_taxes] =  admission.redemption_code ? "$0.00" : taxStr
        summary[:sku_total] =  admission.redemption_code ? "$0.00" : totalStr
        summary[:transaction_total] = response[:total]
        admission.ticket_data[:summary] = summary
        admission.save

        SendAdmissionsJob.perform_later(ticket_link, phone_number)
        SendTransactionJob.perform_later(transaction, response)
      end
    end
    render json: {response: response}
  end

end

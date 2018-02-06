class Api::Admin::TransactionsController < ApplicationController
  #old report
  def index
    if params[:min_date] && params[:max_date]
      min_date = Time.at(params[:min_date].to_i)
      max_date = Time.at(params[:max_date].to_i) + 1.day
      txns = Transaction.where(created_at: min_date..max_date)
    else
      txns = Transaction.all
    end
    if params[:page] && params[:count]
      page_start = (params[:page].to_i-1)*params[:count].to_i
      page_end = (params[:page].to_i)*params[:count].to_i
      total_pages = (txns.count.to_f/params[:count].to_i).ceil
      @total_pages = total_pages > 0 ? total_pages : 1
      @current_page = params[:page].to_i
      @transactions = txns.order('created_at DESC')[page_start...page_end]
    else
      @total_pages = 1
      @current_page = 1
      @transactions = txns.order('created_at DESC')
    end

    respond_to do |format|
      format.json
      format.csv do
        min_date = Time.at(params[:min_date].to_i).strftime('%m-%d-%y')
        max_date = Time.at(params[:max_date].to_i).strftime('%m-%d-%y')
        filename = "Txns_#{min_date}_#{max_date}.csv"
        headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end
  end


  def admissions_report
    if params[:min_date] && params[:max_date]
      min_date = Time.at(params[:min_date].to_i)
      max_date = Time.at(params[:max_date].to_i)
    else
      min_date = Time.now - 20.days
      max_date = min_date + 1.day
    end
    @admissions = Admission.
      joins(:txn).
      where("transactions.created_at BETWEEN ? AND ?", min_date, max_date).
      includes(:txn)

    if params[:page] && params[:count]
      page_start = (params[:page].to_i-1)*params[:count].to_i
      page_end = (params[:page].to_i)*params[:count].to_i
      total_pages = (@admissions.count.to_f/params[:count].to_i).ceil
      @total_pages = total_pages > 0 ? total_pages : 1
      @current_page = params[:page].to_i
      @admissions = @admissions[page_start...page_end]
    else
      @total_pages = 1
      @current_page = 1
    end

    respond_to do |format|
      format.csv do
        min_date = Time.at(params[:min_date].to_i).strftime('%m-%d-%y')
        max_date = Time.at(params[:max_date].to_i).strftime('%m-%d-%y')
        filename = "Txns_#{min_date}_#{max_date}.csv"
        headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end
  end

  def resend
    txn = Transaction.find(params[:id])
    ticket_link = "#{request.base_url}/t/#{txn.access_token}"
    data = JSON.parse(params['json'])
    phone = data["phone"]
    if phone
      SendAdmissionsJob.perform_later(ticket_link, phone)
    end
    render json: {resend: phone ? true : false}
  end
end

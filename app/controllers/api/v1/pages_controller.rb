class Api::V1::PagesController < ApplicationController

  def get_page
    @page = Page.find_by_name(params['name'])
  end

  def index
    @pages = Page.all
    render json: @pages.map(&:to_summary)
  end


  def show
    @page = Page.find_by_name(params[:id])
  end

  def send_contact_form
    data = JSON.parse(params['json'])

    render json: true
  end

end

class Api::PagesController < ApplicationController

  def get_page
    @page = Page.find_by_name(params['name'])
  end

  def send_contact_form
    data = JSON.parse(params['json'])
    puts "------------------> #{data['formValue']}"

    render json: true
  end

end

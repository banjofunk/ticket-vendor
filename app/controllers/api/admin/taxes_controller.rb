class Api::Admin::TaxesController < ApplicationController
  def create
    data = JSON.parse(params['json'])['tax_data']
    @tax = Tax.create(
      description: data['description'],
      kind: data['kind'].to_i,
      amount: data['amount'].to_i
    )
    render :show
  end

  def update
    data = JSON.parse(params['json'])['tax_data']
    @tax = Tax.find(data['id'])
    @tax.update_attributes({
      description: data['description'],
      kind: data['kind'].to_i,
      amount: data['amount'].to_i
    })
    render :show
  end
end

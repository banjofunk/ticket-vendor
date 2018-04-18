class Api::V1::AuthController < ApplicationController
  def is_signed_in?
    return_user
  end

  def sign_out
    sign_out_all_scopes
    return_user
  end

  private
  def return_user
    if user_signed_in?
      render :json => current_user.to_json
    else
      render :json => false
    end
  end

end

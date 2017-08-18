class UsersController < ApplicationController
  def roles
    render json: {
      name: current_user ? current_user.email : "",
      logged_in: current_user ? true : false,
      roles: current_user ? current_user.roles : []
    }
  end

end

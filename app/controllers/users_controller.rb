class UsersController < ApplicationController
  require 'digest'

  def index

  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_products_path
      session[:user_id] = @user.id
    else
      render "new"
    end
  end

  private

  def user_params
  	params.require(:user).permit(:name, :password_input, :password_input_confirmation, :email)
  end

end

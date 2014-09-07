class Admin::ProductsController < ApplicationController
  before_action :require_login

  def index
  end

  def new
  end

  def require_login
  	unless current_user
  		redirect_to sign_in_path
  		flash[:notice] = "請先登入"
  	end
  end

end

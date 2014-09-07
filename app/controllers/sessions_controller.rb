class SessionsController < ApplicationController
  def new  	
  end

  def create
  	@user = User.authenticate(params[:name], params[:password])
  	if @user
  		session[:user_id] = @user.id
      	flash[:notice] = nil
  		redirect_to admin_products_path
  	else
  		flash[:notice] = "登入資訊錯誤"
  		render "new"
  	end
  end

  def destroy
 		session[:user_id] = nil
    flash[:notice] = nil
		redirect_to root_url
  end
end

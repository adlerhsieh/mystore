class SessionsController < ApplicationController
  def new  	
  end

  def create
  	@user = User.authenticate(params[:name], params[:password])
  	if @user
  		session[:user_id] = @user.id
  		redirect_to admin_products_path
      flash[:notice] = "登入成功"
  	else
  		flash[:notice] = "登入資訊錯誤"
  		render "new"
  	end
  end

  def destroy
 		session[:user_id] = nil
    flash[:notice] = "已登出"
		redirect_to root_url
  end
end

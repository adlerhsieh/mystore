class Admin::ProductsController < ApplicationController
  before_action :require_login

  def index
    gon.products = Product.all
    gon.category = []
    for i in 0..gon.products.length-1
      gon.category.push([gon.products[i].id,Category.find(gon.products[i].id).title])
    end
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

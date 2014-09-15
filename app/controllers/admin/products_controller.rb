class Admin::ProductsController < ApplicationController
  before_action :require_login

  def index
    gon.products = Product.where('quantity > ?', 0)
    gon.category = []
    gon.category_dropdown = []
    for i in 0..gon.products.length-1
      gon.category.push([gon.products[i].id,Category.find(gon.products[i].category_id).title])
    end
    gon.category_dropdown.push("顯示全部")
    for i in 0..gon.products.length-1
      gon.category_dropdown.push(Category.find(gon.products[i].category_id).title) if gon.category_dropdown.index(Category.find(gon.products[i].category_id).title) == nil
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

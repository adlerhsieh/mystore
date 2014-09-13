class ProductsController < ApplicationController
  def index
  	gon.products = Product.where('quantity > ?', 0)
    gon.category = []
    gon.category_dropdown = []
    for i in 0..gon.products.length-1
      gon.category.push([gon.products[i].id,Category.find(gon.products[i].id).title])
    end
    gon.category_dropdown.push("顯示全部")
    for i in 0..gon.products.length-1
      gon.category_dropdown.push(Category.find(gon.products[i].id).title)
    end
  end

  def new
  end

  def edit
  	gon.specific_product = Product.find(params[:id])
  end

  def show
  	@product = Product.find(params[:id])
  	gon.specific_product = Product.find(params[:id])
    gon.category = @product.category.title
  	@order = Order.new
  end

end

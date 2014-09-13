class ProductsController < ApplicationController
  def index
  	gon.products = Product.where('quantity > ?', 0)
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

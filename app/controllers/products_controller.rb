class ProductsController < ApplicationController
  def index
  	gon.products = Product.all
  end

  def new
  end

  def edit
  	gon.specific_product = Product.find(params[:id])
  end

  def show
  	gon.specific_product = Product.find(params[:id])
  end
end

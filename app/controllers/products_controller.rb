class ProductsController < ApplicationController
  def index
  	gon.products = Product.all
  end

  def new
  end

  def edit
  end
end

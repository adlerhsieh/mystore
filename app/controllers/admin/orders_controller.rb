class Admin::OrdersController < ApplicationController
  def index
  	@orders = Order.all
  	@products = Product.all
  end
end

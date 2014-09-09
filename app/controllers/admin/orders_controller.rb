class Admin::OrdersController < ApplicationController
  def index
  	@orders = Order.all
  	@products = Product.all

  	gon.orders = Order.all
  	gon.products = Product.all
  end

  def edit
  	@order = Order.find(params[:id])
  end

  def update

  end

	private

		def orders_params
			params.require(:order).permit(:customer, :quantity, :description, :product_id, :status)
		end

end

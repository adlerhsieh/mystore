class OrdersController < ApplicationController
	def create
		@order = Order.new(orders_params)
		if @order.save
			@order.update_attributes(:quantity => 1,
									 :status => "下訂"
									)
			redirect_to root_url
			flash[:notice] = "已送出訂單，請靜候佳音"
		else
			redirect_to :back
			flash[:notice] = "訂購人必須填寫"
		end
	end

	private

		def orders_params
			params.require(:order).permit(:customer, :quantity, :description, :product_id, :status)
		end
end

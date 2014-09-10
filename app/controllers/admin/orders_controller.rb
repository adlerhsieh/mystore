class Admin::OrdersController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :change_order_status

  def index
  	gon.current_orders = Order.where(:status => "下訂").order('created_at desc')
    gon.cancelled_orders = Order.where(:status => "取消").order('created_at desc')
    gon.completed_orders = Order.where(:status => "完成").order('created_at desc')
  	gon.products = Product.all
  end

  def edit
  	@order = Order.find(params[:id])
  end

  def update

  end

  def change_order_status
    Order.find(params[:id]).update_attributes(:status => params[:statusCode])
    @respond = {:result => 'success'}
    render :json => @respond
  end

	private

		def orders_params
			params.require(:order).permit(:customer, :quantity, :description, :product_id, :status)
		end

end

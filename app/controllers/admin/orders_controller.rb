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
    will_save = true    
    target_product = Product.find(Order.find(params[:id]).product_id)
    current_quantity = target_product[:quantity]
    target_product.update_attributes(:quantity =>  current_quantity + 1) if params[:statusCode] == "訂單取消"
    if params[:statusCode] == "恢復下訂"
      if current_quantity > 0
        target_product.update_attributes(:quantity =>  current_quantity - 1)
      else
        will_save = false 
      end
    end

    if will_save == true
      Order.find(params[:id]).update_attributes(:status => params[:statusCode][-2,2])
      @respond = {:result => 'success'}
    else
      @respond = {:result => 'failed'}
    end
    render :json => @respond
  end

	private

		def orders_params
			params.require(:order).permit(:customer, :quantity, :description, :product_id, :status)
		end

end

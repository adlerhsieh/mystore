class RenameItemToProductId < ActiveRecord::Migration
  def change
  	rename_column :orders, :item, :product_id
  	add_column :orders, :description, :text
  end
end

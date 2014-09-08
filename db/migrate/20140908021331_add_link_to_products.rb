class AddLinkToProducts < ActiveRecord::Migration
  def change
  	add_column :products, :link, :string
  	add_column :products, :tag, :string 
  end
end

class AddCommentToProducts < ActiveRecord::Migration
  def change
  	add_column :products, :comments, :text 
  end
end

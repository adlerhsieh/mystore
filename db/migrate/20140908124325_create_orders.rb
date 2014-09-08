class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :item
      t.string :customer
      t.integer :quantity
      t.string :status

      t.timestamps
    end
  end
end

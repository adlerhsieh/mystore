class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.string :email

      t.timestamps
    end
    add_column :images, :user_id, :integer
    add_column :products, :user_id, :integer
  end
end

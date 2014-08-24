class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title
      t.string :description
      t.integer :quantity
      t.string :default_image

      t.timestamps
    end
  end
end

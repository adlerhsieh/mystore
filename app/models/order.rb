class Order < ActiveRecord::Base
	belongs_to :user
	validates :customer, :product_id, presence: true
end

class Order < ActiveRecord::Base
	belongs_to :user
	validates :customer, presence: true
end

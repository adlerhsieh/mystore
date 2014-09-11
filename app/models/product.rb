class Product < ActiveRecord::Base
	has_many :images
	belongs_to :user, :category

	validates :title, presence: true
	validates :title, uniqueness: true
end

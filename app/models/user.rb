class User < ActiveRecord::Base
	has_many :products
	has_many :images
	before_save :password_digest
	validates :name, :password_input, :password_input_confirmation, presence: true
	validates :name, :email, uniqueness: true 
	validates :password_input, confirmation: true
	attr_accessor :password_input

	def password_digest
			self.password = Digest::SHA256.new.hexdigest(password_input)
	end

	def self.authenticate(name, password)
		user = User.find_by_name(name)
		@authentication = Digest::SHA256.new.hexdigest(password)
		if user && @authentication == user.password
			user
		else
			nil
		end
	end

end

module ApplicationHelper
	def render_flash_message
		if flash.any? then
			flash[:notice]
		end
	end
end

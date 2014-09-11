# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.create(:title => "英語學習")
Category.create(:title => "文學小說")
Category.create(:title => "電腦")
Category.create(:title => "理財")
Category.create(:title => "創業")

@user = User.create(:id => 1, :name => "nkj20932", :password => Digest::SHA256.hexdigest("123"), :password_input => "123", :password_input_confirmation => "123")

Product.create(:title => "TOFEL托福分類字彙", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010593790",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/059/37/0010593790.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("英語學習").id,
				      :user_id => @user.id
				      )

Product.create(:title => "圍城", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010355108",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/035/51/0010355108.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id
				      )

Product.create(:title => "3ds Max 2011 即效見本", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010474272",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/047/42/0010474272.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("電腦").id,
				      :user_id => @user.id
				      )

Product.create(:title => "富爸爸，窮爸爸", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010139294",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/013/92/0010139294.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("理財").id,
				      :user_id => @user.id
				      )

Product.create(:title => "Mr.Jamie 網路創業七堂課", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://mrjamie.cc/2011/10/07/7-startup-lessons/",
				      :default_image => "http://mrjamie.cc/wp-content/uploads/2011/10/2AB521-1-386x550.jpg",	
				      :category_id => Category.find_by_title("創業").id,
				      :user_id => @user.id
				      )
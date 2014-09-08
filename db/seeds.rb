# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

@user = User.find_by_name("nkj20932")

@user.products.create(:title => "TOFEL托福分類字彙", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010593790",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/059/37/0010593790.jpg&w=348&h=348",	
				      :tag => "英語學習"
				      )

@user.products.create(:title => "圍城", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010355108",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/035/51/0010355108.jpg&w=348&h=348",	
				      :tag => "文學小說"
				      )

@user.products.create(:title => "3ds Max 2011 即效見本", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010474272",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/047/42/0010474272.jpg&w=348&h=348",	
				      :tag => "電腦"
				      )

@user.products.create(:title => "富爸爸，窮爸爸", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010139294",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/013/92/0010139294.jpg&w=348&h=348",	
				      :tag => "理財"
				      )

@user.products.create(:title => "Mr.Jamie 網路創業七堂課", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://mrjamie.cc/2011/10/07/7-startup-lessons/",
				      :default_image => "http://mrjamie.cc/wp-content/uploads/2011/10/2AB521-1-386x550.jpg",	
				      :tag => "創業"
				      )
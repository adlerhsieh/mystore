# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.create(:title => "英語學習")
Category.create(:title => "文學小說")
Category.create(:title => "偵探小說")
Category.create(:title => "商業小說")
Category.create(:title => "歷史小說")
Category.create(:title => "電腦")
Category.create(:title => "商業")
Category.create(:title => "文學、心理、哲學")
@user = User.create(:id => 1, :name => "nkj20932", :password => Digest::SHA256.hexdigest("123"), :password_input => "123", :password_input_confirmation => "123")
Product.create(:title => "TOFEL托福分類字彙", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010593790",
				      :default_image => "http://www.books.com.tw/img/001/059/37/0010593790.jpg",	
				      :category_id => Category.find_by_title("英語學習").id,
				      :user_id => @user.id,
				      :comments => "堪用，字有點多，個人經驗是讀幾頁就放棄了"
				      )
Product.create(:title => "圍城", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010355108",
				      :default_image => "http://www.books.com.tw/img/001/035/51/0010355108.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "好看，中文經典小說，沒話說"
				      )
Product.create(:title => "3ds Max 2011 即效見本", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010474272",
				      :default_image => "http://www.books.com.tw/img/001/047/42/0010474272.jpg",	
				      :category_id => Category.find_by_title("電腦").id,
				      :user_id => @user.id,
				      :comments => "一個有點過時的3D軟體書籍，我是說書過時，軟體基本上還是市面主流"
				      )
Product.create(:title => "富爸爸，窮爸爸", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010139294",
				      :default_image => "http://www.books.com.tw/img/001/013/92/0010139294.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "雖然富爸爸已經破產了，但書中有些觀念還是非常實用"
				      )
Product.create(:title => "Mr.Jamie 網路創業七堂課", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://mrjamie.cc/2011/10/07/7-startup-lessons/",
				      :default_image => "http://mrjamie.cc/wp-content/uploads/2011/10/2AB521-1-386x550.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "就平常會看得到的創業書，講些屁話，但看前幾章的時候會覺得自己好像要開始創業了"
				      )
Product.create(:title => "新參者", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010510363",
				      :default_image => "http://www.books.com.tw/img/001/051/03/0010510363.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "Facebook：性愛與金錢、天才與背叛交織的祕辛", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010457258",
				      :default_image => "http://www.books.com.tw/img/001/045/72/0010457258.jpg",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "圖騰與禁忌", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010047409",
				      :default_image => "http://www.books.com.tw/img/001/004/74/0010047409.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "夢一場佛洛依德", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010334768",
				      :default_image => "http://www.books.com.tw/img/001/033/47/0010334768.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "權謀至尊司馬懿", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010553043",
				      :default_image => "http://www.books.com.tw/img/001/055/30/0010553043.jpg",	
				      :category_id => Category.find_by_title("歷史小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "Testing for Language Teachers", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.goodreads.com/book/show/796300.Testing_for_Language_Teachers",
				      :default_image => "http://d.gr-assets.com/books/1178446797l/796300.jpg",	
				      :category_id => Category.find_by_title("英語學習").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "Sweet Spot：一夕爆紅網路效應", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010379226",
				      :default_image => "http://www.books.com.tw/img/001/037/92/0010379226.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "讚的力量：Facebook 這樣玩就對了！", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010507017",
				      :default_image => "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/050/70/0010507017_bc_01.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "Jamie流行銷", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://mrjamie.cc/2012/03/14/new-new-marketing-is-here/",
				      :default_image => "http://mrjamie.cc/wp-content/uploads/2012/03/Jamie_NNM_Cover2-381x550.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "社群效應：小圈圈如何改變世界", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010546871",
				      :default_image => "http://www.books.com.tw/img/001/054/68/0010546871.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "半路叛逃：App遊戲製作人的1000日告白", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010559438",
				      :default_image => "http://www.books.com.tw/img/001/055/94/0010559438.jpg",	
				      :category_id => Category.find_by_title("電腦").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "數位併發症：Google把我們變笨了嗎？", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010554369",
				      :default_image => "http://www.books.com.tw/img/001/055/43/0010554369.jpg",	
				      :category_id => Category.find_by_title("電腦").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "我是亞桑傑：維基解密創辦人的真實告白", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010535642",
				      :default_image => "http://www.books.com.tw/img/001/053/56/0010535642.jpg",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "劫持白銀", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010584528",
				      :default_image => "http://pic.pimg.tw/lonelylong/1368894657-434089711.jpg?v=1368894658",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "告白", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010445221",
				      :default_image => "http://www.books.com.tw/img/001/044/52/0010445221.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "YouTube你的熱情和直覺：YouTube創辦人陳士駿的創業人生", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010525120",
				      :default_image => "http://www.books.com.tw/img/001/052/51/0010525120.jpg",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "誰說人是誠實的！", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010590672",
				      :default_image => "http://www.books.com.tw/img/001/059/06/0010590672.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "創意來自完美的抄襲", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010356739",
				      :default_image => "http://www.books.com.tw/img/001/035/67/0010356739.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "放學後", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://zh.wikipedia.org/wiki/%E6%94%BE%E5%AD%B8%E5%BE%8C_(%E5%B0%8F%E8%AA%AA)",
				      :default_image => "http://ext.pimg.tw/kikikoko24/normal_49ab6c590b19f.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "思考的藝術：52 個非受迫性思考錯誤", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010556649",
				      :default_image => "http://www.books.com.tw/img/001/055/66/0010556649.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "跟任何人都可以聊得來：巧妙破冰、打進團體核心，想認識誰就認識誰", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010570709",
				      :default_image => "http://www.books.com.tw/img/001/057/07/0010570709.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "發條橘子", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010570709",
				      :default_image => "http://www.books.com.tw/img/001/050/59/0010505932.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "遍地梟雄", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010294390",
				      :default_image => "http://www.books.com.tw/img/001/029/43/0010294390.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "小說的五十堂課", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010349286",
				      :default_image => "http://www.books.com.tw/img/001/034/92/0010349286.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "SATURDAY星期六", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010384801",
				      :default_image => "http://www.books.com.tw/img/001/038/48/0010384801.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "後設小說", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://zh.wikipedia.org/wiki/%E5%BE%8C%E8%A8%AD%E5%B0%8F%E8%AA%AA",
				      :default_image => "http://e.rimg.com.tw/s2/e/98/82/21406221109378_493_m.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "臺灣現代文學教程：小說讀本增訂版(上)", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010546566",
				      :default_image => "http://www.books.com.tw/img/001/054/65/0010546566.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "富爸爸商學院", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010295110",
				      :default_image => "http://www.books.com.tw/img/001/029/51/0010295110.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "魔球：一個勇敢面對自己，逆轉勝的真實故事", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010522666",
				      :default_image => "http://www.books.com.tw/img/001/052/26/0010522666.jpg",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "女法醫史卡佩塔－屍體會說話", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010029942",
				      :default_image => "http://www.books.com.tw/img/001/002/99/0010029942.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "摩天樓的怪人", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010415507",
				      :default_image => "http://www.books.com.tw/img/001/041/55/0010415507.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "死神的精確度", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010643744",
				      :default_image => "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/064/37/0010643744_bc_01.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "1984(英文)", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/F010520135",
				      :default_image => "http://www.books.com.tw/img/F01/052/01/F010520135.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "惡意", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010448797",
				      :default_image => "http://www.books.com.tw/img/001/044/87/0010448797.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "Fences", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/Fences_(play)",
				      :default_image => "http://upload.wikimedia.org/wikipedia/en/9/97/Fences.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "變身", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010536634",
				      :default_image => "http://www.books.com.tw/img/001/053/66/0010536634.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "伽利略的苦惱", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010454440",
				      :default_image => "http://www.books.com.tw/img/001/045/44/0010454440.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "聖女的救贖", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010457067",
				      :default_image => "http://www.books.com.tw/img/001/045/70/0010457067.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "聊不停的本事，幽默讓溝通更犀利", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010526755",
				      :default_image => "http://www.books.com.tw/img/001/052/67/0010526755.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "【新．福爾摩斯】絲之屋", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010522265",
				      :default_image => "http://www.books.com.tw/img/001/052/22/0010522265.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "麥田捕手(英文)", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/The_Catcher_in_the_Rye",
				      :default_image => "http://upload.wikimedia.org/wikipedia/en/thumb/3/32/Rye_catcher.jpg/220px-Rye_catcher.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "孤雛淚(英文)", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/Oliver_Twist",
				      :default_image => "http://iv1.lisimg.com/image/597909/600full-oliver-twist-poster.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "賣花女(英文)", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/Pygmalion_(play)",
				      :default_image => "http://www.daftblogger.com/wp-content/uploads/2010/07/pygmalion-poster.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "真夏方程式", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010549892",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/054/98/0010549892.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "請勿在此丟棄屍體", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010500575",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/050/05/0010500575.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "Amazon.com的祕密", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010553438",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/055/34/0010553438.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "部落客也能賺大錢", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010417773",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/041/77/0010417773.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
Product.create(:title => "別相信任何人", 
				   	  :description => "",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010511556",
				      :default_image => "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/051/15/0010511556_bc_01.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => ""
				      )
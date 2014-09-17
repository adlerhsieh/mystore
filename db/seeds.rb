# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.delete_all
Product.delete_all

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
				   	  :description => "顧名思義，托福單字參考書",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010593790",
				      :default_image => "http://www.books.com.tw/img/001/059/37/0010593790.jpg",	
				      :category_id => Category.find_by_title("英語學習").id,
				      :user_id => @user.id,
				      :comments => "堪用，字有點多，個人經驗是讀幾頁就放棄了"
				      )
Product.create(:title => "圍城", 
				   	  :description => "一個沒娶老婆的男人很想娶，娶了以後又想離婚的故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010355108",
				      :default_image => "http://www.books.com.tw/img/001/035/51/0010355108.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "好看，中文經典小說，沒話說"
				      )
Product.create(:title => "3ds Max 2011 即效見本", 
				   	  :description => "3D動畫軟體3ds Max教學",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010474272",
				      :default_image => "http://www.books.com.tw/img/001/047/42/0010474272.jpg",	
				      :category_id => Category.find_by_title("電腦").id,
				      :user_id => @user.id,
				      :comments => "一個有點過時的3D軟體書籍，我是說書過時，軟體基本上還是市面主流"
				      )
Product.create(:title => "富爸爸，窮爸爸", 
				   	  :description => "詳述一個你不能只用勞力賺錢，而是要用錢滾錢的概念",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010139294",
				      :default_image => "http://www.books.com.tw/img/001/013/92/0010139294.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "雖然富爸爸已經破產了，但書中有些觀念還是非常實用，尤其是不能只用勞力賺錢的部份，不管哪時都很實用"
				      )
Product.create(:title => "Mr.Jamie 網路創業七堂課", 
				   	  :description => "講述網路創業的概念、會遇到的問題",
				   	  :quantity => 1,
				   	  :link => "http://mrjamie.cc/2011/10/07/7-startup-lessons/",
				      :default_image => "http://mrjamie.cc/wp-content/uploads/2011/10/2AB521-1-386x550.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "就平常會看得到的創業書，講些屁話，但看前幾章的時候會覺得自己好像要開始創業了，越看後面會覺得越籠統"
				      )
Product.create(:title => "新參者", 
				   	  :description => "講一個偵探到一個鎮上解決了一堆案件的故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010510363",
				      :default_image => "http://www.books.com.tw/img/001/051/03/0010510363.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "本人東野圭吾的書迷，因此就是好看，不過這本是溫馨小品路線，不是史詩級密室殺人事件"
				      )
Product.create(:title => "Facebook：性愛與金錢、天才與背叛交織的祕辛", 
				   	  :description => "Mark Zuckerburg崛起的故事，有改編為電影",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010457258",
				      :default_image => "http://www.books.com.tw/img/001/045/72/0010457258.jpg",
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => "商業很黑暗，但很刺激"
				      )
Product.create(:title => "圖騰與禁忌", 
				   	  :description => "佛洛依德講述歷史心理學",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010047409",
				      :default_image => "http://www.books.com.tw/img/001/004/74/0010047409.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => "沒看多少，基本上就是一些人類過去行為的歸納和分析，主要說明偶像崇拜、禁忌為何在人類社會中有如此重要的作用"
				      )
Product.create(:title => "夢一場佛洛依德", 
				   	  :description => "簡述佛洛依德所有理論",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010334768",
				      :default_image => "http://www.books.com.tw/img/001/033/47/0010334768.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => "佛洛依德一生理論超多，想稍微了解的話可以看"
				      )
Product.create(:title => "權謀至尊司馬懿", 
				   	  :description => "司馬懿的傳記",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010553043",
				      :default_image => "http://www.books.com.tw/img/001/055/30/0010553043.jpg",	
				      :category_id => Category.find_by_title("歷史小說").id,
				      :user_id => @user.id,
				      :comments => "歷史小說，非正史，寫得很有趣"
				      )
Product.create(:title => "Testing for Language Teachers", 
				   	  :description => "說明英語測驗該如何設計",
				   	  :quantity => 1,
				   	  :link => "http://www.goodreads.com/book/show/796300.Testing_for_Language_Teachers",
				      :default_image => "http://d.gr-assets.com/books/1178446797l/796300.jpg",	
				      :category_id => Category.find_by_title("英語學習").id,
				      :user_id => @user.id,
				      :comments => "現在英語教學應該測驗都是訂好的模式，但若想研究測驗設計，可以讀"
				      )
Product.create(:title => "Sweet Spot：一夕爆紅網路效應", 
				   	  :description => "從行銷的角度分析幾個網路爆紅的例子及原因",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010379226",
				      :default_image => "http://www.books.com.tw/img/001/037/92/0010379226.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "有點過時，但可以參考"
				      )
Product.create(:title => "讚的力量：Facebook 這樣玩就對了！", 
				   	  :description => "說明Facebook行銷的利用",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010507017",
				      :default_image => "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/050/70/0010507017_bc_01.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "忘了，對行銷有興趣可看"
				      )
Product.create(:title => "Jamie流行銷", 
				   	  :description => "簡述網路行銷理論及過程",
				   	  :quantity => 1,
				   	  :link => "http://mrjamie.cc/2012/03/14/new-new-marketing-is-here/",
				      :default_image => "http://mrjamie.cc/wp-content/uploads/2012/03/Jamie_NNM_Cover2-381x550.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "很基本的概念，入門可參考"
				      )
Product.create(:title => "社群效應：小圈圈如何改變世界", 
				   	  :description => "說明社群行銷的心理運用",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010546871",
				      :default_image => "http://www.books.com.tw/img/001/054/68/0010546871.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "很特別的切入角度"
				      )
Product.create(:title => "半路叛逃：App遊戲製作人的1000日告白", 
				   	  :description => "本土手機遊戲Bonnie's Brunch的製作過程和辛酸血淚",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010559438",
				      :default_image => "http://www.books.com.tw/img/001/055/94/0010559438.jpg",	
				      :category_id => Category.find_by_title("電腦").id,
				      :user_id => @user.id,
				      :comments => "沒經驗的人了解產業很好的故事"
				      )
Product.create(:title => "數位併發症：Google把我們變笨了嗎？", 
				   	  :description => "說明新時代大家都用網路而產生的文明病",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010554369",
				      :default_image => "http://www.books.com.tw/img/001/055/43/0010554369.jpg",	
				      :category_id => Category.find_by_title("電腦").id,
				      :user_id => @user.id,
				      :comments => "許多很深入的論文"
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
				   	  :description => "滑雪場威脅案的偵探小說",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010584528",
				      :default_image => "http://pic.pimg.tw/lonelylong/1368894657-434089711.jpg?v=1368894658",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "不錯看，非柯南或金田一等陽春型的"
				      )
Product.create(:title => "告白", 
				   	  :description => "學校老師破解疑案",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010445221",
				      :default_image => "http://www.books.com.tw/img/001/044/52/0010445221.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "有得獎，有改編電影，好看"
				      )
Product.create(:title => "YouTube你的熱情和直覺：YouTube創辦人陳士駿的創業人生", 
				   	  :description => "如題，不用多解釋",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010525120",
				      :default_image => "http://www.books.com.tw/img/001/052/51/0010525120.jpg",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => "好看，頗有人生啟發，但他真的蠻一帆風順的"
				      )
Product.create(:title => "誰說人是誠實的！", 
				   	  :description => "說明人其實都有說謊的基因",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010590672",
				      :default_image => "http://www.books.com.tw/img/001/059/06/0010590672.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => "蠻有趣的論點"
				      )
Product.create(:title => "創意來自完美的抄襲", 
				   	  :description => "說明哪些新發明和哪些舊產品如何相像",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010356739",
				      :default_image => "http://www.books.com.tw/img/001/035/67/0010356739.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "就是一本談創意的書"
				      )
Product.create(:title => "放學後", 
				   	  :description => "一個學校的殺人事件",
				   	  :quantity => 1,
				   	  :link => "http://zh.wikipedia.org/wiki/%E6%94%BE%E5%AD%B8%E5%BE%8C_(%E5%B0%8F%E8%AA%AA)",
				      :default_image => "http://ext.pimg.tw/kikikoko24/normal_49ab6c590b19f.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "校園小品，不錯看"
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
				   	  :description => "說明聊天技巧",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010570709",
				      :default_image => "http://www.books.com.tw/img/001/057/07/0010570709.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "比較偏社交場合social用的技巧"
				      )
Product.create(:title => "發條橘子", 
				   	  :description => "叛逆少年的做惡多端故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010570709",
				      :default_image => "http://www.books.com.tw/img/001/050/59/0010505932.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "文學鉅作之一，頗有啟發"
				      )
Product.create(:title => "遍地梟雄", 
				   	  :description => "一個有點長但是很有趣的冒險故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010294390",
				      :default_image => "http://www.books.com.tw/img/001/029/43/0010294390.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "很中國風味的現代小說"
				      )
Product.create(:title => "小說的五十堂課", 
				   	  :description => "說明五十種小說使用的寫作技巧",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010349286",
				      :default_image => "http://www.books.com.tw/img/001/034/92/0010349286.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => "作家可以參考"
				      )
Product.create(:title => "SATURDAY星期六", 
				   	  :description => "請看官網說明",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010384801",
				      :default_image => "http://www.books.com.tw/img/001/038/48/0010384801.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "說實在我只看幾頁就沒看了，不是那麼感官刺激的作品"
				      )
Product.create(:title => "後設小說", 
				   	  :description => "說明後設小說理論為何",
				   	  :quantity => 1,
				   	  :link => "http://zh.wikipedia.org/wiki/%E5%BE%8C%E8%A8%AD%E5%B0%8F%E8%AA%AA",
				      :default_image => "http://113.196.56.95/Assets/product_images/957/957999996.jpg",	
				      :category_id => Category.find_by_title("文學、心理、哲學").id,
				      :user_id => @user.id,
				      :comments => "對文學有興趣者可看"
				      )
Product.create(:title => "臺灣現代文學教程：小說讀本增訂版(上)", 
				   	  :description => "一堆台灣中短篇小說",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010546566",
				      :default_image => "http://www.books.com.tw/img/001/054/65/0010546566.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "想了解台灣文學經典的第一步"
				      )
Product.create(:title => "富爸爸商學院", 
				   	  :description => "大概跟富爸爸窮爸爸差不多，但就再多講一些",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010295110",
				      :default_image => "http://www.books.com.tw/img/001/029/51/0010295110.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "忘了"
				      )
Product.create(:title => "魔球：一個勇敢面對自己，逆轉勝的真實故事", 
				   	  :description => "一個老頭差點丟掉工作又救回來的故事，有改編電影",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010522666",
				      :default_image => "http://www.books.com.tw/img/001/052/26/0010522666.jpg",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => "我其實沒看，只看了電影"
				      )
Product.create(:title => "女法醫史卡佩塔－屍體會說話", 
				   	  :description => "美國的偵探小說，有點像美國影集的那種偵探故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010029942",
				      :default_image => "http://www.books.com.tw/img/001/002/99/0010029942.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "不錯，跟日系的差很多"
				      )
Product.create(:title => "摩天樓的怪人", 
				   	  :description => "講一棟摩天樓頻頻發生怪事，要查明的故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010415507",
				      :default_image => "http://www.books.com.tw/img/001/041/55/0010415507.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "超長，有些橋段很酷"
				      )
Product.create(:title => "死神的精確度", 
				   	  :description => "講述死神在人間遇到的幾個奇妙故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010643744",
				      :default_image => "http://im2.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/064/37/0010643744_bc_01.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "溫馨小品"
				      )
Product.create(:title => "1984(英文)", 
				   	  :description => "文學經典，說明共產黨統治社會的結果",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/F010520135",
				      :default_image => "http://www.books.com.tw/img/F01/052/01/F010520135.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "故事稍微沈悶，思想的部份比較多"
				      )
Product.create(:title => "惡意", 
				   	  :description => "一個作家被抄襲的偵探故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010448797",
				      :default_image => "http://www.books.com.tw/img/001/044/87/0010448797.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "很屌，好看沒話說"
				      )
Product.create(:title => "Fences", 
				   	  :description => "英文劇本，說明種族故事",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/Fences_(play)",
				      :default_image => "http://upload.wikimedia.org/wikipedia/en/9/97/Fences.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "忘了"
				      )
Product.create(:title => "變身", 
				   	  :description => "一個腦部受傷的人，個性也變得奇怪的故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010536634",
				      :default_image => "http://www.books.com.tw/img/001/053/66/0010536634.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "不錯"
				      )
Product.create(:title => "伽利略的苦惱", 
				   	  :description => "一連串的小型偵探故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010454440",
				      :default_image => "http://www.books.com.tw/img/001/045/44/0010454440.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "日系的科學辦案為主，理論都很有趣"
				      )
Product.create(:title => "聖女的救贖", 
				   	  :description => "長篇的偵探故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010457067",
				      :default_image => "http://www.books.com.tw/img/001/045/70/0010457067.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "東野圭吾的長篇，最後都會有很驚人的梗，好看"
				      )
Product.create(:title => "聊不停的本事，幽默讓溝通更犀利", 
				   	  :description => "談說話技巧",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010526755",
				      :default_image => "http://www.books.com.tw/img/001/052/67/0010526755.jpg",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "說明得算清楚，但要實際應用有點難"
				      )
Product.create(:title => "【新．福爾摩斯】絲之屋", 
				   	  :description => "其他人著作的福爾摩斯續集",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010522265",
				      :default_image => "http://www.books.com.tw/img/001/052/22/0010522265.jpg",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "不錯，但還是少了一點柯南道爾很唬爛的原味"
				      )
Product.create(:title => "麥田捕手(英文)", 
				   	  :description => "一個叛逆少年的第一人稱自述故事",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/The_Catcher_in_the_Rye",
				      :default_image => "http://upload.wikimedia.org/wikipedia/en/thumb/3/32/Rye_catcher.jpg/220px-Rye_catcher.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "還ok"
				      )
Product.create(:title => "孤雛淚(英文)", 
				   	  :description => "19世紀末英國流浪少年的故事",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/Oliver_Twist",
				      :default_image => "http://iv1.lisimg.com/image/597909/600full-oliver-twist-poster.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "字詞比較艱深，劇情也沒多好懂，屬於對文學比較著迷的人才會有興趣的文學經典"
				      )
Product.create(:title => "賣花女(英文)", 
				   	  :description => "一個賣花女的感情故事",
				   	  :quantity => 1,
				   	  :link => "http://en.wikipedia.org/wiki/Pygmalion_(play)",
				      :default_image => "http://www.daftblogger.com/wp-content/uploads/2010/07/pygmalion-poster.jpg",	
				      :category_id => Category.find_by_title("文學小說").id,
				      :user_id => @user.id,
				      :comments => "是有深度的悲劇"
				      )
Product.create(:title => "真夏方程式", 
				   	  :description => "濃厚日系風格的偵探小說",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010549892",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/054/98/0010549892.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "多了一些年少青春的味道，好看"
				      )
Product.create(:title => "請勿在此丟棄屍體", 
				   	  :description => "比較偏有趣幽默口吻的偵探故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010500575",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/050/05/0010500575.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("偵探小說").id,
				      :user_id => @user.id,
				      :comments => "還ok，比起一般偵探故事來得幽默"
				      )
Product.create(:title => "Amazon.com的祕密", 
				   	  :description => "Jeff Bezos崛起的故事",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010553438",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/055/34/0010553438.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("商業小說").id,
				      :user_id => @user.id,
				      :comments => "比較偏商業面，沒那麼有drama，但也是個商業模式的參考"
				      )
Product.create(:title => "部落客也能賺大錢", 
				   	  :description => "說明如何經營部落格創造營收",
				   	  :quantity => 1,
				   	  :link => "http://www.books.com.tw/products/0010417773",
				      :default_image => "http://im1.book.com.tw/image/getImage?i=http://www.books.com.tw/img/001/041/77/0010417773.jpg&w=348&h=348",	
				      :category_id => Category.find_by_title("商業").id,
				      :user_id => @user.id,
				      :comments => "講都很簡單，實行起來很難，但如果有心要當部落客可以參考"
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
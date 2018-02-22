##  

### 1、判断横屏和竖屏；
	
		CSS 判断横屏 和竖屏
		@media all and (orientation : landscape) { 
		
			/*横屏时字体红色*/
		
		} 
	
		@media all and (orientation : portrait){ 
		
			/*竖屏时字体绿色*/
		
		}
		JS 判断横竖屏
		window.addEventListener("orientationchange", function() {
			alert(window.orientation);
			// do something
		}, false);

		orientation属性

		它有三个值：0,90，-90
		
		0为竖屏模式（portrait），-90意味着该设备横向旋转到右侧的横屏模式（landscape），而90表示该设备是横向旋转到左边的横屏模式（landscape）。
		
		还有一个是180，表示竖屏但是是翻转过来的竖屏模式。但这种模式至今尚未得到支持


		JS 完整写法 ： 
		function orientInit(){
		    var orientChk = document.documentElement.clientWidth > document.documentElement.clientHeight?'landscape':'portrait';
		    if(orientChk =='lapdscape'){
		        //这里是横屏下需要执行的事件
		    }else{
		        //这里是竖屏下需要执行的事件
		    }
		}
		
		orientInit();
		window.addEventListener('onorientationchange' in window?'orientationchange':'resize', function(){
		    setTimeout(orientInit, 100);
		},false)   


### 2、position : fixed 定位移动端的坑；
	
		//1.ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
		//2.android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
		//3.ios4下不支持position:fixed
	
		//解决方案：
				1、外链iscroll.js  使用[Iscroll](http://cubiq.org/iscroll-5)；
				2、使用 absolute 替代 fixed 并且 给 html，body 增加样式 {width : 100% ; height : 100%};
				3、给body 增加 定位 并使用overflow ： hidden; 在使用fixed的地方 用 absolute 定位在文档流 的右侧，
					JS 动态改变body 的定位 （基本思路 与 2 想似）；

### 3、audio元素和video元素在ios和andriod中无法自动播放
		
		原因： 因为各大浏览器都为了节省流量，做出了优化，在用户没有行为动作时（交互）不予许自动播放；

		/音频，写法一
		<audio src="music/bg.mp3" autoplay loop controls>你的浏览器还不支持哦</audio>
		
		//音频，写法二
		<audio controls="controls"> 
		    <source src="music/bg.ogg" type="audio/ogg"></source>
		    <source src="music/bg.mp3" type="audio/mpeg"></source>
		    优先播放音乐bg.ogg，不支持在播放bg.mp3
		</audio>
		
		//JS绑定自动播放（操作window时，播放音乐）
		$(window).one('touchstart', function(){
		    music.play();
		})
		
		//微信下兼容处理
		document.addEventListener("WeixinJSBridgeReady", function () {
		    music.play();
		}, false);
		
		//小结
		//1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常；
		//2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间；
		//3.注意不要遗漏微信的兼容处理需要引用微信JS；


### 4、JS 判断设备来源

		function deviceType(){
		    var ua = navigator.userAgent;
		    var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];    
		    for(var i=0; i<len,len = agent.length; i++){
		        if(ua.indexOf(agent[i])>0){         
		            break;
		        }
		    }
		}
		deviceType();
		window.addEventListener('resize', function(){
		    deviceType();
		})


		微信的 有些不太一样
		function isWeixin(){
		    var ua = navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i)=='micromessenger'){
		        return true;
		    }else{
		        return false;
		    }
		}


### 5、android 4.x bug

		1.三星 Galaxy S4中自带浏览器不支持border-radius缩写
		2.同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分
		3.部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色
		4.android无法同时播放多音频audio
		5.oppo 的border-radius 会失效

### 6、消除transition闪屏
		.css {
		    -webkit-transform-style: preserve-3d;
		    -webkit-backface-visibility: hidden;
		    -webkit-perspective: 1000;
		}
		过渡动画（在没有启动硬件加速的情况下）会出现抖动的现象， 以上的 解决方案只是改变 视角 来启动硬件加速的一种方式；
		启动硬件加速的 另外一种方式： 
			.css {
			    -webkit-transform: translate3d(0,0,0);
			    -moz-transform: translate3d(0,0,0);
			    -ms-transform: translate3d(0,0,0);
			    transform: translate3d(0,0,0);
			}
		
		启动硬件加速
		最常用的方式：translate3d、translateZ、transform
	
		opacity属性/过渡动画（需要动画执行的过程中才会创建合成层，动画没有开始或结束后元素还会回到之前的状态）
	
		will-chang属性（这个比较偏僻），一般配合opacity与translate使用（而且经测试，除了上述可以引发硬件加速的属性外，
		其它属性并不会变成复合层），

		弊端： 硬件加速会导致 CPU性能占用量过大，电池电量消耗加大 ；因此 尽量避免泛滥使用硬件加速。

### 7、渲染优化
		1.禁止使用iframe（阻塞父文档onload事件）；
			*iframe会阻塞主页面的Onload事件；
			*搜索引擎的检索程序无法解读这种页面，不利于SEO;
			*iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

			使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript
			动态给iframe添加src属性值，这样可以绕开以上两个问题。

		2.禁止使用gif图片实现loading效果（降低CPU消耗，提升渲染性能）；
		3、使用CSS3代码代替JS动画（尽可能避免重绘重排以及回流）；
	    4、对于一些小图标，可以使用base64位编码，以减少网络请求。但不建议大图使用，比较耗费CPU；
				小图标优势在于：
				    1.减少HTTP请求；
				    2.避免文件跨域；
				    3.修改及时生效；

		5、页面头部的<style></style> 会阻塞页面；（因为 Renderer进程中 JS线程和渲染线程是互斥的）；
		6、页面头部<script</script> 会阻塞页面；（因为 Renderer进程中 JS线程和渲染线程是互斥的）；
		7、页面中空的 href 和 src 会阻塞页面其他资源的加载 (阻塞下载进程)；
		
		8、网页Gzip，CDN托管，data缓存 ，图片服务器；
		9、前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
		10、用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。
		11、当需要设置的样式很多时设置className而不是直接操作style。
		12、少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
		13、避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。
		14、图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

		15、 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。
			对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。
				向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，
				能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，
				本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。
				减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），
				减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。


### 8、meta标签
		H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
		//一、HTML页面结构
		<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		// width    设置viewport宽度，为一个正整数，或字符串‘device-width’
		// height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
		// initial-scale    默认缩放比例，为一个数字，可以带小数
		// minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
		// maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
		// user-scalable    是否允许手动缩放
		
		//二、JS动态判断
		var phoneWidth =  parseInt(window.screen.width);
		var phoneScale = phoneWidth/640;
		var ua = navigator.userAgent;
		if (/Android (\d+\.\d+)/.test(ua)){
		    var version = parseFloat(RegExp.$1);
		    if(version>2.3){
		        document.write('<meta name="viewport" content="width=640, 
				minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
		    }else{
		        document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
		    }
		} else {
		    document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
		}


		<!-- 设置缩放 -->
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
		<!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
		<meta name="format-detection"content="telephone=no, email=no" />


		其他meta标签
		<!-- 启用360浏览器的极速模式(webkit) -->
		<meta name="renderer" content="webkit">
		<!-- 避免IE使用兼容模式 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
		<meta name="HandheldFriendly" content="true">
		<!-- 微软的老式浏览器 -->
		<meta name="MobileOptimized" content="320">
		<!-- uc强制竖屏 -->
		<meta name="screen-orientation" content="portrait">
		<!-- QQ强制竖屏 -->
		<meta name="x5-orientation" content="portrait">
		<!-- UC强制全屏 -->
		<meta name="full-screen" content="yes">
		<!-- QQ强制全屏 -->
		<meta name="x5-fullscreen" content="true">
		<!-- UC应用模式 -->
		<meta name="browsermode" content="application">
		<!-- QQ应用模式 -->
		<meta name="x5-page-mode" content="app">
		<!-- windows phone 点击无高光 -->
		<meta name="msapplication-tap-highlight" content="no">

### 9、字体font-family
		@ 宋体      SimSun
		@ 黑体      SimHei
		@ 微信雅黑   Microsoft Yahei
		@ 微软正黑体 Microsoft JhengHei
		@ 新宋体    NSimSun
		@ 新细明体  MingLiU
		@ 细明体    MingLiU
		@ 标楷体    DFKai-SB
		@ 仿宋     FangSong
		@ 楷体     KaiTi
		@ 仿宋_GB2312  FangSong_GB2312
		@ 楷体_GB2312  KaiTi_GB2312  
		@
		@ 说明：中文字体多数使用宋体、雅黑，英文用Helvetica
		
		body { font-family: Microsoft Yahei,SimSun,Helvetica; } 

### 10、打电话、邮件等集合
		// 一、打电话
		<a href="tel:0755-10086">打电话给:0755-10086</a>
		
		//  二、发短信，winphone系统无效
		<a href="sms:10086">发短信给: 10086</a>
		
		// 三、写邮件
		//注：在添加这些功能时，第一个功能以"?"开头，后面的以"&"开头
		//1.普通邮件
		<a href="mailto:863139978@qq.com">点击我发邮件</a>
		//2.收件地址后添加?cc=开头，可添加抄送地址（Android存在兼容问题）
		<a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net">点击我发邮件</a>
		//3.跟着抄送地址后，写上&bcc=,可添加密件抄送地址（Android存在兼容问题）
		<a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net&bcc=384900096@qq.com">点击我发邮件</a>
		//4.包含多个收件人、抄送、密件抄送人，用分号(;)隔开多个邮件人的地址
		<a href="mailto:863139978@qq.com;384900096@qq.com">点击我发邮件</a>
		//5.包含主题，用?subject=
		<a href="mailto:863139978@qq.com?subject=邮件主题">点击我发邮件</a>
		//6.包含内容，用?body=;如内容包含文本，使用%0A给文本换行 
		<a href="mailto:863139978@qq.com?body=邮件主题内容%0A腾讯诚信%0A期待您的到来">点击我发邮件</a>
		//7.内容包含链接，含http(s)://等的文本自动转化为链接
		<a href="mailto:863139978@qq.com?body=http://www.baidu.com">点击我发邮件</a>
		//8.内容包含图片（PC不支持）
		<a href="mailto:863139978@qq.com?body=<img src='images/1.jpg' />">点击我发邮件</a>
		//9.完整示例
		<a href="mailto:11111111@qq.com;22222@qq.com?cc=333333@yeah.net&bcc=444444@qq.com&subject=
			[邮件主题]&body=腾讯诚邀您参与%0A%0Ahttp://www.baidu.com%0A%0A<img src='images/1.jpg' />">点击我发邮件</a>

### 11、美化表单元素
		//一、使用appearance改变webkit浏览器的默认外观
		input,select { -webkit-appearance:none; appearance: none; }
		
		//二、winphone下，使用伪元素改变表单元素默认外观
		//1.禁用select默认箭头，::-ms-expand修改表单控件下拉箭头，设置隐藏并使用背景图片来修饰
		select::-ms-expand { display:none; }
		
		//2.禁用radio和checkbox默认样式，::-ms-check修改表单复选框或单选框默认图标，设置隐藏并使用背景图片来修饰
		input[type=radio]::-ms-check,
		input[type=checkbox]::-ms-check { display:none; }
		
		//3.禁用pc端表单输入框默认清除按钮，::-ms-clear修改清除按钮，设置隐藏并使用背景图片来修饰
		input[type=text]::-ms-clear,
		input[type=tel]::-ms-clear,
		input[type=number]::-ms-clear { display:none; }
	
		//4.渲染成radio的风格
		兼容性说明：对应的firefox可以使用 -moz-appearance属性iOS 2.0及更高版本的Safari浏览器可用 ，Android尚不明确
		input[type="checkbox"] {
		    height: 0.4rem;
		    width: 0.4rem;
		    vertical-align: middle;
		    appearance: radio; // 改变渲染样式 checkbox 、radio、sliderthumb-horizontal等
		    -webkit-appearance: radio;
		}

### 12、如何实现浏览器内多个标签页之间的通信? 

		WebSocket、SharedWorker；
		也可以调用localstorge、cookies等本地存储方式；
		
		localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，
		我们通过监听事件，控制它的值来进行页面信息通信；
		注意quirks：Safari 在无痕模式下设置localstorge值时会抛出 QuotaExceededError 的异常；


### 13、高逼格的console.log
		console.log("%c Powered by Zhaohui - microzz.com",
			"background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),
				color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),
				color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), 
				color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));
				color:transparent;-webkit-background-clip:text;font-size:13px;");

### 14、快速的让一个数组乱序
		var arr = [1,2,3,4,5,6,7,8,9,10];
		arr.sort(function(){
			return Math.random() - 0.5;
		})
		console.log(arr);


此处解释：

![](http://wwlin.cn/images/sort.png)

首先： 当return 的值

	小于 0 ，那么 a 会被排列到 b 之前；
	等于 0 ， a 和 b 的相对位置不变；
	大于 0 ， b 会被排列到 a 之前；

这里你会 发现起始 的时候数组是正序排列，每当进行一次排列的时候， 都会先随机一个随机数 （注意这里的每一次排列 指 每一个红框指一次排列， 共9次排列 ， 一次排列中可能存在多次比较）；

当一次排列的 随机数大于0.5 时 将会进行第二次比较， 当第二次随机数 仍然大于0.5 时 ， 将会再 进行一次比较， 直到 随机数大于0.5 或者排列到第一位；

当一次排列的 随机数 小于0.5时 当前比较的两项 索引将不会改变 ，继续下一次 的排列；
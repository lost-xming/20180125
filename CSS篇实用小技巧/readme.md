##  CSS 点梳理

#### 1、css实现单行文本溢出显示 ...

直接上效果：相对于多行文本溢出做处理， 单行要简单多，且更容易理解。

![](http://47.97.165.187/images/word1.png)

**实现方法**

	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	当然还需要加宽度width属来兼容部分浏览。

### 2、实现多行文本溢出显示...

效果：

![](http://47.97.165.187/images/word2.jpg)

**实现方法：**

	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;

**适用范围：**

因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；

**注：**

	1、-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
	2、display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
	3、-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

如果你觉着这样还不够美观， 那么就接着往下看：

**效果：**

![](http://47.97.165.187/images/word3.png)

这样 是不是你想要的呢？ 

**实现方法：**

	div {
		position: relative;
	    line-height: 20px;
	    max-height: 40px;
	    overflow: hidden;
	}

	div:after {
		content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
		background: -webkit-linear-gradient(left, transparent, #fff 55%);
		background: -o-linear-gradient(right, transparent, #fff 55%);
		background: -moz-linear-gradient(right, transparent, #fff 55%);
		background: linear-gradient(to right, transparent, #fff 55%);
	}
	
	不要只顾着吃，要注意胃口，此方法有个弊端 那就是 【未超出行的情况下也会出现省略号】 ，这样会不会很挫！！！ 没办法，只能结合JS 进行优化该方法了。
	

**注：**
	
	1、将height设置为line-height的整数倍，防止超出的文字露出。
	2、给p::after添加渐变背景可避免文字只显示一半。
	3、由于ie6-7不显示content内容，所以要添加标签兼容ie6-7（如：<span>…<span/>）；兼容ie8需要将::after替换成:after。


为尊重原创 ， 取材于 [大前端](http://www.daqianduan.com/6179.html)


### 3、让图文不可复制
这点应该大家 都很熟悉了， 某些时候【你懂的】为了快捷搜索答案，可是打死也不让你复制

	-webkit-user-select: none; 
	-ms-user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	user-select: none;

那有些网页为了尊重原创，复制的文本 都会被加上一段来源说明，是如何做到的呢？问的好！ 等的就是你这个问题 -_- 。

**大致思路：**	
	
	1、答案区域监听copy事件，并阻止这个事件的默认行为。
	2、获取选中的内容（window.getSelection()）加上版权信息，然后设置到剪切板（clipboarddata.setData()）。
	
具体的代码展示 请看此处 [复制文本自带版权说明](网页自带版权说明 "https://segmentfault.com/q/1010000003986612/a-1020000003994492")

### 4、清除苹果手机自带的样式
	
细心的人会发现大苹果为了让样式更美观，会把输入框等这类做了圆角处理， 可是 美了用户， 哭了前端！ 
	
	/*强制去除表单自带的样式*/ 
	input,button,select,textarea{outline:none;-webkit-appearance:none;}

	/*强制去除textarea自带的样式*/
	textarea{resize:none;-webkit-appearance:none;}

### 5、盒子垂直水平居中

这个问题好像面试必问的吔！反正我是必问的，哈哈！！！ 其实无关多少种实现思路，只要你能实现就可以！

**提供4种方法**

	1、定位 盒子宽高已知， position: absolute; left: 50%; top: 50%; margin-left:-自身一半宽度; margin-top: -自身一半高度;

	2、table-cell布局 父级 display: table-cell; vertical-align: middle;  子级 margin: 0 auto;

	3、定位 + transform ; 适用于 子盒子 宽高不定时； （这里是本人常用方法）
		
		position: relative / absolute;
        /*top和left偏移各为50%*/
       	top: 50%;
       	left: 50%;
        /*translate(-50%,-50%) 偏移自身的宽和高的-50%*/
        transform: translate(-50%, -50%); 注意这里启动了3D硬件加速哦 会增加耗电量的 （至于何是3D加速 请看浏览器进程与线程篇）

	4、flex 布局
		父级： 
			/*flex 布局*/
        	display: flex;
            /*实现垂直居中*/
            align-items: center;
            /*实现水平居中*/
            justify-content: center;

	再加一种 ： 一次偷懒的时候不小心给弄出来的， 那就是margin-left : 50% ; transform: translateX(-50%);

### 6、设置全局的CSS样式，避免图中的长按弹出菜单与选中文本的行为

	/* 禁止长按链接与图片弹出菜单 */
	a, img { -webkit-touch-callout: none; } 

	/* 禁止选中文本（如无文本选中需求，此为必选项）*/
	html, body { 
	-webkit-user-select: none;  
	user-select: none; 
	}

### 7、改变placeholder的字体颜色大小 （其实这个方法也就在PC端可以，真机上尽然屁用都没有，当时我就哭了。 但 还是贴出来吧）

	input::-webkit-input-placeholder { 
	    /* WebKit browsers */ 
	    font-size:14px;
	    color: #333;
	} 
	input::-moz-placeholder { 
	    /* Mozilla Firefox 19+ */ 
	    font-size:14px;
	    color: #333;
	} 
	input:-ms-input-placeholder { 
	    /* Internet Explorer 10+ */ 
	    font-size:14px;
	    color: #333;
	}

### 8、 美化单选、复选框 （假手机上并不完美的）
	
效果： 

![](http://47.97.165.187/images/selector1.png)

	input[type="radio"] {
	    height: 0.4rem;
	    width: 0.4rem;
	    vertical-align: middle;
	    appearance: radio;
	    -webkit-appearance: radio;
	    margin-right: 0.1rem;
	}

看完这个效果，对，这就是我想要的！ 可是真机上..... 让我先哭会儿！ 这些都是假手机！！！


### 9、iOS 浏览器横屏时会重置字体大小的问题

	iOS 浏览器横屏时会重置字体大小，设置 text-size-adjust 为 none 可以解决ios上的问题，
	但桌面版safari的字体缩放功能会失效，因此最佳方案是将 text-size-adjust 为 100% 。

	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
	text-size-adjust: 100%;


好了就先写这么多 请各位多多下拉补充提交哦！！！  下一篇：
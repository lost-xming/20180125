##  前端常见跨域解决方案（全）：
	
### 什么是跨域？

	跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。

### 广义的跨域：

	1.) 资源跳转： A链接、重定向、表单提交
	2.) 资源嵌入： <link>、<script>、<img>、<frame>等dom标签，还有样式中background:url()、@font-face()等文件外链
	3.) 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等
其实我们通常所说的跨域是狭义的，是由浏览器同源策略限制的一类请求场景。

### 什么是同源策略？
	同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，
	如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，
	即便两个不同的域名指向同一个ip地址，也非同源。

### 同源策略限制以下几种行为：

	1.) Cookie、LocalStorage 和 IndexDB 无法读取
	2.) DOM 和 Js对象无法获得
	3.) AJAX 请求不能发送
### 常见跨域场景
	URL                                      说明                    是否允许通信
	http://www.domain.com/a.js
	http://www.domain.com/b.js         同一域名，不同文件或路径           允许
	http://www.domain.com/lab/c.js
	
	http://www.domain.com:8000/a.js
	http://www.domain.com/b.js         同一域名，不同端口                不允许
	 
	http://www.domain.com/a.js
	https://www.domain.com/b.js        同一域名，不同协议                不允许
	 
	http://www.domain.com/a.js
	http://192.168.4.12/b.js           域名和域名对应相同ip              不允许
	 
	http://www.domain.com/a.js
	http://x.domain.com/b.js           主域相同，子域不同                不允许
	http://domain.com/c.js
	 
	http://www.domain1.com/a.js
	http://www.domain2.com/b.js        不同域名                         不允许
### 跨域解决方案
	1、 通过jsonp跨域
	2、 document.domain + iframe跨域
	3、 location.hash + iframe
	4、 window.name + iframe跨域
	5、 postMessage跨域
	6、 跨域资源共享（CORS）
	7、 nginx代理跨域
	8、 nodejs中间件代理跨域
	9、 WebSocket协议跨域

### 一、 通过jsonp跨域

	通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，
	在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，
		我们可以通过动态创建script，再请求一个带参网址实现跨域通信。
		
		1.）原生实现：
		
		 <script>
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		
		    // 传参并指定回调执行函数为onBack
		    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
		    document.head.appendChild(script);
		
		    // 回调执行函数
		    function onBack(res) {
		        alert(JSON.stringify(res));
		    }
		 </script>
		服务端返回如下（返回时即执行全局函数）：
		
		onBack({"status": true, "user": "admin"})
	2.）jquery ajax：
	
	$.ajax({
	    url: 'http://www.domain2.com:8080/login',
	    type: 'get',
	    dataType: 'jsonp',  // 请求方式为jsonp
	    jsonpCallback: "onBack",    // 自定义回调函数名
	    data: {}
	});
	3.）vue.js：
	
	this.$http.jsonp('http://www.domain2.com:8080/login', {
	    params: {},
	    jsonp: 'onBack'
	}).then((res) => {
	    console.log(res); 
	})
	后端node.js代码示例：
	
	var querystring = require('querystring');
	var http = require('http');
	var server = http.createServer();
	
	server.on('request', function(req, res) {
	    var params = qs.parse(req.url.split('?')[1]);
	    var fn = params.callback;
	
	    // jsonp返回设置
	    res.writeHead(200, { 'Content-Type': 'text/javascript' });
	    res.write(fn + '(' + JSON.stringify(params) + ')');
	
	    res.end();
	});
	
	server.listen('8080');
	console.log('Server is running at port 8080...');
	jsonp缺点：只能实现get一种请求。

### 二、 document.domain + iframe跨域

	此方案仅限主域相同，子域不同的跨域应用场景。
	
	实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
	
	1.）父窗口：(http://www.domain.com/a.html)
	
	<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
	<script>
	    document.domain = 'domain.com';
	    var user = 'admin';
	</script>
	2.）子窗口：(http://child.domain.com/b.html)
	
	<script>
	    document.domain = 'domain.com';
	    // 获取父窗口中变量
	    alert('get js data from parent ---> ' + window.parent.user);
	</script>
### 三、 location.hash + iframe跨域

	实现原理： a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，
	相同域之间直接js访问来通信。

	具体实现：A域：a.html -> B域：b.html -> A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，
	但c与a同域，所以c可通过parent.parent访问a页面所有对象。

	1.）a.html：(http://www.domain1.com/a.html)
	
	<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
	<script>
	    var iframe = document.getElementById('iframe');
	
	    // 向b.html传hash值
	    setTimeout(function() {
	        iframe.src = iframe.src + '#user=admin';
	    }, 1000);
	    
	    // 开放给同域c.html的回调方法
	    function onCallback(res) {
	        alert('data from c.html ---> ' + res);
	    }
	</script>
	2.）b.html：(http://www.domain2.com/b.html)
	
	<iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"></iframe>
	<script>
	    var iframe = document.getElementById('iframe');
	
	    // 监听a.html传来的hash值，再传给c.html
	    window.onhashchange = function () {
	        iframe.src = iframe.src + location.hash;
	    };
	</script>
	3.）c.html：(http://www.domain1.com/c.html)
	
	<script>
	    // 监听b.html传来的hash值
	    window.onhashchange = function () {
	        // 再通过操作同域a.html的js回调，将结果传回
	        window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
	    };
	</script>

### ... 

全文地址 https://segmentfault.com/a/1190000011145364
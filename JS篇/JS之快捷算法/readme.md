# JS篇之快捷算法

### 1最快捷的数组求最大值
		var arr = [ 1,5,1,7,5,9];
		Math.max(...arr)  // 9 
			
		三个点神奇 ，人称 【数组展开运算符】  一级棒！！！
### 2更短的数组去重写法
		[...new Set([2,"12",2,12,1,2,1,6,12,13,6])]
		
		// [2, "12", 12, 1, 6, 13]

### 3 论如何优雅的取随机字符串
		Math.random().toString(16).substring(2)   // "4e160412ae199"
		Math.random().toString(36).substring(2)   // "zq6drr722kc"

### 4匿名函数自执行 写法
	
		( function() {}() );
		( function() {} )();
		[ function() {}() ];
		
		~ function() {}();
		! function() {}();
		+ function() {}();
		- function() {}();
		
		delete function() {}();
		typeof function() {}();
		void function() {}();
		new function() {}();
		new function() {};
		
		var f = function() {}();
		
		1, function() {}();
		1 ^ function() {}();
		1 > function() {}();

### 5 论如何优雅的取整

		var a = ~~2.33     // 2 
	
		var b= 2.33 | 0    // 2
		
		var c= 2.33 >> 0   // 2


### 6 如何优雅的实现金钱格式化：1234567890 --> 1,234,567,890
		正则的优雅实现：
		var test1 = '1234567890'
		var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		console.log(format) // 1,234,567,890
		
		
		非正则的优雅实现：
		function formatCash(str) {
		       return str.split('').reverse().reduce((prev, next, index) => {
		            return ((index % 3) ? next : (next + ',')) + prev
		       })
		}
		console.log(formatCash('1234567890')) // 1,234,567,890

### 7 逗号运算符
		var a = 0; 
		var b = ( a++, 99 ); 
		console.log(a);  // 1
		console.log(b);  // 99


### 8 论如何最佳的让两个整数交换数值

		var a=1,b=2;
		
		// 正常算法
		a += b;
		b = a - b;
		a -= b;

		// 黑科技
		a ^= b;
		b ^= a;
		a ^= b;

### 9 用最短的代码实现一个长度为m(6)且值都n(8)的数组
	
		Array(6).fill(8)   // [8, 8, 8, 8, 8, 8]
	

### 10 从一个数组中找到一个数，O(n)的算法，找不到就返回 null。

		正常的版本:
		function find (x, y) {
		  for ( let i = 0; i < x.length; i++ ) {
		    if ( x[i] == y ) return i;
		  }
		  return null;
		}
		let arr = [0,1,2,3,4,5]
		console.log(find(arr, 2))
		console.log(find(arr, 8))


		结果到了函数式成了下面这个样子（好像上面的那些代码在下面若影若现，不过又有点不太一样，为了消掉if语言，
		让其看上去更像一个表达式，动用了 ? 号表达式）：

		//函数式的版本
		const find = ( f => f(f) ) ( f =>
		  (next => (x, y, i = 0) =>
		    ( i >= x.length) ?  null :
		      ( x[i] == y ) ? i :
		        next(x, y, i+1))((...args) =>
		          (f(f))(...args)))
		 
		let arr = [0,1,2,3,4,5]
		console.log(find(arr, 2))
		console.log(find(arr, 8))


### 11 快捷的找到数组中大于10 的值；

		var arr = [2,"12",2,12,1,2,1,6,12,13,6]；

		arr.filter(function (a){return a > 10 });



### 未完待续
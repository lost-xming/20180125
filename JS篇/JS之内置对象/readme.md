# JS内置对象 Array

## 1、判断数组的【所有元素】是否都大于 3
	
	var arr = [1, 2, 3, 4, 5, 6];
	
	arr.every(function(ele , ind , arr){
		return (ele > 3);
	})

	-> false

	// Array.prototype.every()  ES5 

**兼容性：**
	
	DESKTOP
	 Chrome		Firefox (Gecko)	  Internet Explorer	  Opera	     Safari
	 (Yes)		 1.5 (1.8)		 		9		      (Yes)		  (Yes)
	

	MOBILE
	Android	  Chrome for Android	   Firefox Mobile (Gecko)	 IE Mobile	 Opera Mobile	 Safari Mobile
	 (Yes)	 		(Yes)					1.0 (1.8)			  (Yes)		  (Yes)			   (Yes)

**延伸**

判断数组中 【有元素】 大于 5
	
	var arr = [1, 2, 3, 4, 5, 6];
	arr.some(function (val){
			return (val > 5);
		});

	// true

	返回值 ： true / false;

	


## 2、用最短的代码实现一个长度为m(6)且值都n(8)的数组
	
	Array(6).fill(8)   // [8, 8, 8, 8, 8, 8]
	
	延伸：
	var numbers = [1, 2, 3]
		numbers.fill(1);  // [1, 1, 1]

	[1, 2, 3].fill(4, 1, 2)      // [1, 4, 3]
	[].fill.call({length: 3}, 4) // {0: 4, 1: 4, 2: 4, length: 3}
	

	// Array.prototype.every()  ES6 

**兼容性：**
		
	DESKTOP
	Chrome		Firefox (Gecko)		Internet Explorer		Opera		Safari
	45 [1]			31 (31)				未实现				未实现		未实现

	MOBILE
	Android		Chrome for Android		Firefox Mobile (Gecko)		IE Mobile	Opera Mobile	Safari Mobile
	未实现			未实现					31.0 (31)				未实现			未实现			8.0


## 3、过滤掉一个数组中小于0的项

	var arr = [-1, 2, -3, 5, -4, 6];
	var newArr = arr.filter(function (val){
					return (val > 0);
				});

	// Array.prototype.filter()  ES6    返回值：符合筛选条件的新数组

**兼容性：**

	DESKTOP
	Chrome		Firefox (Gecko)		Internet Explorer		Opera		Safari
	(Yes)			1.5 (1.8)			9					(Yes)		(Yes)


	MOBILE
	Android		Chrome for Android		Firefox Mobile (Gecko)	IE Mobile	Opera Mobile	Safari Mobile
	(Yes)			(Yes)					1.0 (1.8)			 (Yes)		  (Yes)			   (Yes)


## 4、快速查找数组中第一个大于10 的值
	var arr = [-1, 2, -3, 11, -4, 6];
	arr.find(function (ele){
			return (ele > 10);
		});

	-> 11

	延伸 第一个大于10 的值的索引

	arr.findIndex(function (ele){
			return (ele > 10);
		});

	-> 3
	
	// Array.prototype.find()  ES6    返回值：数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

	// Array.prototype.findIndex()  ES6    返回值：数组中满足提供的测试函数的第一个元素的索引。否则返回 -1。

**兼容性**

	DESKTOP   ie 至今不兼容

	MOBILE  ie 至今不兼容

	
## 5、快速判断一个数组中是否包含一个指定的值（ 3 ）
	var arr = [-1, 2, -3, 11, 3, 6];
	arr.includes(3)   // true
	arr.includes(2 , 2)   // false  第二个2 是开始查找的起始位置索引
	arr.includes(4)   // false

	// Array.prototype.includes()  ES6    返回值：如果包含则返回 true，否则返回false。

**兼容性**
	
	DESKTOP
	Chrome		Firefox (Gecko)		Internet Explorer	Edge	Opera	Safari
	 47				43 (43)				未实现			14		 34		  9

	MOBILE
	Android		Android Webview		Firefox Mobile (Gecko)		IE Mobile	Opera Mobile	Safari Mobile	Chrome for Android
	未实现			47						43.0 (43)			  未实现		   34			    9				47



## 6、快速将一个数组中每一位 *2

	var arr = [1, 2, 3, 4, 5, 6];

	var newArr = arr.map(function (ele, index, array){
					return (ele * 2);
				});

	// Array.prototype.map()  ES6    返回新数组,不改变原数组;

**兼容性**

	DESKTOP
	Firefox (Gecko)		Chrome		Internet Explorer	Opera	Safari
	  (Yes)				1.5 (1.8)	 		9			(Yes)	(Yes)

	MOBILE
	Firefox Mobile (Gecko)		Android	IE Mobile	Opera Mobile	Safari Mobile
		1.0 (1.8)						?				?			  ?		 ?


## 7、快速求出一个数组中每一项的和值

	var arr = [1, 2, 3, 4, 5, 6];
	arrSum = arr.reduce(function (val1 , val2){
		return (val1 + val2);
	});

	// 21

	arrSum2 = arr.reduce(function (val1 , val2){
		return (val1 + val2);
	} , 6);

	// 27
	

	var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
    		return a.concat(b);
		  },[]);

	//  [0, 1, 2, 3, 4, 5]


	// Array.prototype.reduce()  ES5    返回值 ： 函数累计处理的结果

**延伸**
	
	从右到左 累加处理数组

	let flattened = [
	    [0, 1], 
	    [2, 3], 
	    [4, 5]
	].reduceRight((a, b) => {
	    return a.concat(b);
	}, []);
	
	// flattened is [4, 5, 2, 3, 0, 1]
	
	与 reduce 处理方向相反 


## 8、Set 对象

### 8.1、 更短的数组去重写法
	[...new Set([2,"12",2,12,1,2,1,6,12,13,6])]
	
	// [2, "12", 12, 1, 6, 13]

**语法**
	
	new Set([iterable]);

	iterable
	如果传递一个可迭代对象，它的所有元素将被添加到新的 Set中。如果不指定此参数或其值为null，则新的 Set为空。

	返回值： 一个新的Set对象。
	
	Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。

	另外，NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（尽管 NaN !== NaN）。

![](http://wwlin.cn/images/Set.jpg)


## 9、void 运算符
	
	以下列举几种 匿名函数自执行 写法
	! function() {}();
	( function() {} )();
	void function() {}();

	void 与其他几种 有什么区别呢？

	在使用立即执行的函数表达式时，可以利用 void 运算符让 JavaScript 引擎把一个function关键字识别成函数表达式而不是函数声明（语句）。

	void 运算符 对给定的表达式进行求值，然后返回 undefined。
	void 运算符通常只用于获取 undefined的原始值，一般使用void(0)（等同于void 0）。
	在上述情况中，也可以使用全局变量undefined 来代替（假定其仍是默认值）。



	<a href="javascript:void(0);">

	当用户点击一个以 javascript: URI 时，它会评估URI中的代码，然后用返回的值替换页面内容，
	除非返回的值是undefined。void运算符可用于返回undefined。


	注意，虽然这么做是可行的，但利用 javascript: 伪协议来执行 JavaScript 代码是不推荐的，推荐的做法是为链接元素绑定事件。


**延伸**

	当 void  立即执行的一个异步的函数表达式时
	
	例如：
		
		void async function (resolve ，reject) {}();

	返回值： 一个 AsyncFunction 对象，表示一个异步函数。

	调用 async 函数时会返回一个 Promise 对象。
		当这个 async 函数返回一个值时，Promise 的 resolve 方法会负责传递这个值；
		当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值。
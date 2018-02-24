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
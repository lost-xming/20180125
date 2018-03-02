##  Webpack4

### webpack历程：

		2013.12.20 V1.0.0 发布
		
		2015.11.02 V2.0.0 发布
		
		2017.06.05 V3.0.0-RC.0 发布
		
		2018.02.25 V4.0.0 发布

### 首先了解webpack 承担了哪些工作：
	
	依赖管理：方便引用第三方模块、让模块更容易复用、避免全局注入导致的冲突、避免重复加载或加载不需要的模块。

	合并代码：把各个分散的模块集中打包成大文件，减少HTTP的请求链接数，配合UglifyJS可以减少、优化代码的体积。

	各路插件：babel把ES6+转译成ES5-，eslint可以检查编译期的错误……

**核心思想：**
	
	1、一切皆模块
		html、js、css、img、文件都可以视为模块，因此，你可以require("....")。
		这意味着我们可以将 "业务" 分割成更小的 易于管理的片段，从而到达重复利用等的目的。
	2、按需加载
		传统的打包工具最终将所有的模块编译生成一个庞大的JS文件，
		在webpack中使用了许多新特性来分割代码然后生成多个JS文件，而且异步加载部分代码以实现按需加载

**原理：** 
	最简单地说，就是分析代码，找到require、exports、define等“关键词”，并替换成对应模块的“引用”……


## 安装

> webpack 4默认不需要配置文件（它吸收了Parcel的思想，零配置）
> 
> - npm i --save webpack
> 
> - npm i --save webpack-cli
>
> - webpack init


## 生产模式和开发模式

**webpack4无需任何配置文件**
**只需定义--mode标记，即可免费获得一切**

		"scripts": {
			"dev":"webpack --mode development",
			"build":"webpack --mode production"
		}

**webpack 4将./src/index.js作为默认入口点。 而且，它会默认在./dist/main.js中吐出这个包**

因此需要在当前目录下新建一个src文件夹 ，以及一个index.js 作为 默认的入口点。

		package.json 中

		"main": "index.js"

**webpack 4中，默认情况下 是不需要定义入口点和输出文件**

因此 也就没有 webpack.config.js 文件， 所以在需要配置入口、出口、Loader、插件等相关信息时需要手动创建这个文件。

**在开始前你需要先理解四个核心概念：**

		入口(entry)
    	输出(output)
    	loader
    	插件(plugins)

		---入口(entry) 
		
			module.exports = {
			  	entry: './src/index.js'
			};
		---
		---出口(output)
			module.exports = {
				  entry: './src/index.js',
				  output: {
					    path: path.resolve(__dirname, 'build'),
					    filename: 'index.js'
				  }
			};
			
			// 输出到 当前目录下的 build 文件夹中 index.js 文件
		---
		---loader
			 	module: {
	        		rules: [
			            {
			                test:/\.css$/,
			                use: [
			                    {
			                        loader: 'css-loader',
			                        options: {
			                            modules: true
			                        }
			                    }
			                ]
			            }
			        ]
		    	}
				
				以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。
				这告诉 webpack 编译器(compiler) 如下信息：

			    “嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，
				在你对它打包之前，先使用 raw-loader 转换一下。”
				
				less、scss、jsx等loader 都需要在这里配置
		---
		---插件(plugins)
			plugins: [
			    new webpack.optimize.UglifyJsPlugin(),
			    new HtmlWebpackPlugin({template: './src/index.html'})
		  	]

			顶部添加：

				// 通过 npm 安装 
				const HtmlWebpackPlugin = require('html-webpack-plugin'); 

				const webpack = require('webpack'); // 用于访问内置插件
		---

## 当 Node 遇到 require(X) 时，按下面的顺序处理。

		（1）如果 X 是内置模块（比如 require('http'）)
			a. 返回该模块。
			b. 不再继续执行。
		
		（2）如果 X 以 "./" 或者 "/" 或者 "../" 开头
			a. 根据 X 所在的父模块，确定 X 的绝对路径。
			b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。 
			c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。 
	
		（3）如果 X 不带路径 
			a. 根据 X 所在的父模块，确定 X 可能的安装目录。 
			b. 依次在每个目录中，将 X 当成文件名或目录名加载。
	
		（4） 抛出 "not found"

## 模块

在 webpack 中一切皆模块；

在根目录下创建 lib目录以及 a.js 用以模拟 公共组件

如何才能  require("a") 


## Webpack 1 / 2 / 3 /4 的 区别
	
	一、 Webpack2 VS Webpack1

			1. 增加对 ES6 模块的原生支持
			2. 可以混用 ES2015 和 AMD 和 CommonJS
			3. 支持 tree-shaking（减少打包后的体积）
			4. 新增更多的 CLI 参数项
			5. 配置选项语法有较大改动，且不向下兼容
				5.1 配置项 - resolve（解析）
				5.2 配置项 - module（模块）
				5.3 配置项 - plugins（插件）

	二、 Webpack3 VS Webpack2
		
			1. 加入 Scope Hoisting（作用域提升）
			2. 加入 Magic Comments（魔法注解）

	三、 Webpack4 VS Webpack3

			1. Node.js 4.0不再受支持。源代码已升级到更高的ecmascript版本。
			2. 您现在必须选择（mode或--mode）两种模式：生产或开发
			3. import()总是返回一个名称空间对象。CommonJS模块被封装到默认导出中
			......
详见：
[webpack4的巨大改变](webpack4的巨大改变 "https://github.com/webpack/webpack/releases")
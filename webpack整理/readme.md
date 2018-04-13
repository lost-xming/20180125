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

	
	
	npm install --save-dev webpack
	npm install --save webpack-cli

	npm init -y
	
	会出现一个package.json 文件
	
	修改文件 scripts 
	
	添加下面两种开发模式

	创建dist 目录 和 dist/index.html 文件

	创建 一个 src 目录 和  ./src/index.js 文件  index.js 为默认的入口文件

	添加webpack.config.js 文件
	
		内容添加 
			const path = require('path');

			module.exports = {
			  entry: './src/index.js',
			  output: {
			    filename: 'bundle.js',
			    path: path.resolve(__dirname, 'dist')
			  }
			};

		为基本配置， 可修改 其入口和输出文件名
	

	在此时 你需要做的是 ，启动一个服务 指向dist目录 这样在你右键 点开html 时 才能正常显示 网页

	下一步就是开始配置loader了
	
	npm install --save-dev style-loader css-loader   // 是加载CSS 时 编译loader
	
	 module: {
	     rules: [
	       {
	         test: /\.css$/,
	         use: [
	           'style-loader',
	           'css-loader'
	         ]
	       }
	     ]
	 }

	

	npm install --save-dev file-loader // 是处理 背景图片和图标等这类内容混合到css中去的 loader
	
	{
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
    }

	npm install --save-dev url-loader   //file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录 字体等这些文件

	json支持 是 nodejs内置的 无需再单独配置loader

	svg tsv xml 等这类文件的加载需要 csv-loader xml-loader



## 多入口文件和 多输出文件

	修改webpack.config.js
	
	entry: {  //增加多入口文件
	     app: './src/index.js',
	     print: './src/print.js'
   	},

	output : {
		filename : "[name].build.js"  
				// [name] 是加载文件 的 模块名  [id] 是加载文件的 索引（索引从0开始）  [hash], 编译哈希值，即随机数
	}


	print.js

	import _ from 'lodash';

	export default function printMe() {
	    console.log('I get called from print.js!');
	}
	
	并 修改html文件的 js 名称 
	
## 插件 html-webpack-plugin

	npm install --save-dev html-webpack-plugin
	
	作用： 自动修改 dist目录下面html 引入的js文件名 ， 当你修改了webpack.config.js 里面输出的js 文件名时 它会自动的修改 Html引入的 js 名称  如果html里面有内容 内容会被丢失

	webpack.config.js 文件 增加配置

	const HtmlWebpackPlugin = require('html-webpack-plugin');

	plugins: [    // 插件 配置项
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],

## 插件 clean-webpack-plugin
	
	npm install clean-webpack-plugin --save-dev

	作用： 当每次 npm run build 的时候， 由于文件名的修改 导致 dist目录下很多之前的代码和文件 遗留，导致dist 目录文件相当混乱
			那么 clean-webpack-plugin  则可以帮你清理 这个文件夹。
	
	webpack.config.js 文件 增加配置项
	
	const CleanWebpackPlugin = require('clean-webpack-plugin');

	// 需要 匹配清理的文件目录 ， （坑 ：单独目录 'dist' 是无法清理内部所有文件的， 必须要配置 匹配文件选项 'index*.js' ）
	let pathsToClean = [
	    'dist/index*.js', 
	    'dist/print*.js',
	    'dist/app*.js'
	]
	   
	// 配置参数项， 完整参数 请查npm
	let cleanOptions = {
	    root:     __dirname, // 根目录
	    verbose:  true,  //开启在控制台输出信息
	    dry:      false  //启用删除文件
	}

	plugins: [
        new CleanWebpackPlugin(pathsToClean,cleanOptions),   // 调用 CleanWebpackPlugin 插件
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],


## 错误来源追踪
	需要在webpack.config.js 文件中开启 devtool 项
	
	当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。
	例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，
	而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。
	这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。

	为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。
	如果一个错误来自于 b.js，source map 就会明确的告诉你。
	
	注意绝大多少 选项值 都仅在 开发环境存在， 即 npm run dev时 生效
	例如 ： devtool: "eval",

	开发环境中 一般选用  devtool: "inline-source-map" 这样就可以 将错误指引到 当前行 而且文件没有压缩
	
	生产环境中推荐使用 source-map 选项  因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助

	避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
 
	在大多数情况下，cheap-module-eval-source-map 是最好的选择。

## 观察者模式
	
	每次要编译代码时，手动运行 npm run build 就会变得很麻烦
	webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：

	1、webpack's Watch Mode

	2、webpack-dev-server

	3、webpack-dev-middleware

	多数场景中，你可能需要使用 webpack-dev-server，但是不妨探讨一下以上的所有选项。

	"scripts": {
		"dev": "webpack --mode development",
	    "build": "webpack --mode production",
	    "watch" : "webpack --watch"
	},
	
	当运行 npm run watch 时 将进入 观察者模式

	唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，
	可以尝试使用 webpack-dev-server，恰好可以实现我们想要的功能。


## webpack-dev-server web服务
	
	npm install --save-dev webpack-dev-server

	webpack.config.js  增加配置项

	devServer: {
		contentBase: './dist'
	},

	package.json 文件增加 scripts 配置项

	"start": "webpack-dev-server --open",

	运行 npm run start 时 将会启动服务， 自动打开浏览器 http://localhost:8080/ 并且在有修改并打包完成后 自动刷新页面


## 扩展了解

**webpack-dev-middleware**
	
	webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 
	webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求

[https://doc.webpack-china.org/guides/development/](https://doc.webpack-china.org/guides/development/)

**模块热替换 启用HMR**

[https://doc.webpack-china.org/guides/hot-module-replacement/](https://doc.webpack-china.org/guides/hot-module-replacement/)


**模块检查（tree shaking）**

能检测出 打包模块中 哪些是未使用的模块并加以注释说明

	unused harmony export square  （square 是未使用的模块名）  如何精简输出呢，请接着往下看...

## 精简输出 插件 【uglifyjs-webpack-plugin】

	npm install --save-dev uglifyjs-webpack-plugin
	
	作用： 删除没有引用的多余 模块

	webpack.config.js 增加配置项 
	
	const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
	
	plugins: [
		new UglifyJSPlugin()
	]


	注： 配合上 生产环境 devtool: 'source-map' 配置以下选项

	plugins: [
		new UglifyJSPlugin({
			sourceMap: true  // 启用 source map
		})
	]
	

**注意：**  

	有些情况下，tree-shaking 可能不会生效
	
	例如：
	import * as mylib from 'mylib';
	
	export const someVar = mylib.transform({
		// ...
	});
	
	export const someOtherVar = mylib.transform({
		// ...
	});



## 生产环境的配置

	开发环境(development)和生产环境(production)的构建目标差异很大。

	在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)
		或热模块替换(hot module replacement)能力的 source map 和 localhost server。

	而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。

	由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置


	遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。
	为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。
	通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。


详见[webpack中文社区](webpack中文社区 "https://doc.webpack-china.org/guides/production/")


## 代码分离

**这是一个很重要的优化方案，能够把代码分离到不同的 bundle 中， 按需加载或并行加载这些文件**

	有三种常用的代码分离方法：

	入口起点：使用 entry 配置手动地分离代码。

	防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。

	动态导入：通过模块的内联函数调用来分离代码。
	
	释 ： 
		入口起点 --->  最简单、最直观的分离代码的方式
			例子： entry: {
				    	index: './src/index.js',
				    	another: './src/another-module.js'
				  }
		
		防止重复 --->  CommonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中 
					或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 lodash 模块去除
	
					注意**** ： 在webpack 4.*版本中 删除了 此接口，在最新的 4.1.1版本中也没有完全修复 。
					CommonsChunkPlugin was removed -> optimization.splitChunks, optimization.runtimeChunk
		
		动态导入 --->  当涉及到动态代码拆分时，webpack 提供了两个类似的技术。对于动态导入，
					第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。
					第二种，则是使用 webpack 特定的 require.ensure。让我们先尝试使用第一种……
	
					注意**** import() 调用会在内部用到 promises。如果在旧有版本浏览器中使用 import()，
						记得使用 一个 polyfill 库（例如 es6-promise 或 promise-polyfill），来 shim Promise。

					import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {}).catch(error => 'An error occurred while loading the component');

## 懒加载
	
	懒加载或者按需加载 必须配合事件驱动， 否则 每次加载页面的时候都会请求它

	button.onclick = e => import(/* webpackChunkName: "print" */ './print').then()




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

## 解析 require(X) 时，node.js 会按下面的顺序处理。

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
	
	package.config.js	

	resolve: {
		modules: [
			path.join(__dirname, "lib"),
			"node_modules"
		]
	}

	
**调用模块的几种方式：**

	// ES2015 模块引入
	import * as webpackNumbers from 'webpack-numbers';
	// CommonJS 模块引入
	var webpackNumbers = require('webpack-numbers');
	// ...

	// ES2015 和 CommonJS 模块调用
	webpackNumbers.wordToNum('Two');
	// ...


	// AMD 模块引入
	require(['webpackNumbers'], function ( webpackNumbers) {
	  // ...

	  // AMD 模块调用
	  webpackNumbers.wordToNum('Two');
	  // ...

	});

	
	全局变量，用户还可以通过 script 标签来加载和使用


### webpack4 css插件 ExtractTextWebpackPlugin调整

**建议选用新的CSS文件提取插件mini-css-extract-plugin**

**基本配置如下：**

		const MiniCssExtractPlugin = require("mini-css-extract-plugin");
		module.exports = {
		  plugins: [
		    new MiniCssExtractPlugin({
		      // Options similar to the same options in webpackOptions.output
		      // both options are optional
		      filename: "[name].css",
		      chunkFilename: "[id].css"
		    })
		  ],
		  module: {
		    rules: [
		      {
		        test: /\.css$/,
		        use: [
		          MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
		          "css-loader"
		        ]
		      }
		    ]
		  }
		}

**生产环境下的配置优化：**

		const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
		const MiniCssExtractPlugin = require("mini-css-extract-plugin");
		const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
		module.exports = {
		  optimization: {
		    minimizer: [
		      new UglifyJsPlugin({
		        cache: true,
		        parallel: true,
		        sourceMap: true 
		      }),
		      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
		    ]
		  },
		  plugins: [
		    new MiniCssExtractPlugin({
		      filename: 'css/app.[name].css',
		      chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
		    })
		  ]
		  ....
		}
**将多个css chunk合并成一个css文件**

		
		const MiniCssExtractPlugin = require("mini-css-extract-plugin");
		module.exports = {
		  optimization: {
		    splitChunks: {
		      cacheGroups: {
		        styles: {            
		          name: 'styles',
		          test: /\.scss|css$/,
		          chunks: 'all',    // merge all the css chunk to one file
		          enforce: true
		        }
		      }
		    }
		  }
		}



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
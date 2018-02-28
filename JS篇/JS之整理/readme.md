## 构建工具webpack

webpack历程：

	2013.12.20 V1.0.0 发布
	
	2015.11.02 V2.0.0 发布
	
	2017.06.05 V3.0.0-RC.0 发布
	
	2018.02.25 V4.0.0 发布

首先了解webpack 承担了哪些工作：
	
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

**四个核心概念：**
	
	入口(entry)、输出(output)、loader、插件(plugins)

详见[webpack的四个核心概念介绍](webpack的四个核心概念介绍 "https://www.jianshu.com/p/e63221200534")；

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

			1. Node.js 4不再受支持。源代码已升级到更高的ecmascript版本。
			2. 您现在必须选择（mode或--mode）两种模式：生产或开发
			3. import()总是返回一个名称空间对象。CommonJS模块被封装到默认导出中
			......
详见 

[webpack1升级到2的注意事项](webpack1升级到2的注意事项 "https://segmentfault.com/a/1190000008671104")

[webpack1/2/3的区别](webpack1/2/3的区别 "https://www.imooc.com/article/20604?block_id=tuijian_wz")

[webpack4的巨大改变](webpack4的巨大改变 "https://github.com/webpack/webpack/releases")
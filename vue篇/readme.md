# vue篇 之 基础应用
	
		2018年面试必问的前端框架，并非之一。
		在对VUE简单简单了解后，也来总结下自己所知道的一些片面知识点，顺便也能对自己的一个检查。

### 1、一个VUE项目应该具备哪些才算一个完整的项目， 要做到麻雀虽小，但五脏俱全。


**(1)、vue-router 前端路由(必备)**

**(2)、通讯 —— 官方推荐(Axios)**

**(3)、视图组件 —— Element 和 iView 是两个最受欢迎的 UI组件工具包，专注于桌面端UI界面的快速开发。而 Mint UI 与 vux 则相反 是移动端最受欢迎的 UI 工具包。**

**(4)、cookie存储 —— js-cookie组件工具包**

**(5)、状态管理 —— vuex**

**后续具体业务应用到的 组件包，再在npm上搜索去吧 找到对应的版本信息 再添加到webpack.json里面去**

**有非议 ，请轻喷！！！**

有人会问，为什么没有jquery呢？ 这里在用这类框架的时候， 你就应该将思路转变过来了，jquery的DOM操作在这里几乎是应用不到了。而是以直接操作数据完成目的。

基础的package.json文件配置好后，那么这里就可以直接npm install了。

### 以下是我个人的步骤：

先 了解src目录下 各个目录的 作用 

![](http://47.97.165.187/images/vue1.jpg)

	assets : 是存放静态资源的 （ img 以及 font字体包等）
	components : 是存放分离出来的组件
	router : 相信你秒懂的
	view : 就是存放 你的路由对应的主业务界面的
	app.vue 、main.js 相信你也秒懂的

**1、在src文件目录下创建view文件夹（你后续的项目将大部分会写在这里面）**

**2、先从路由vue-router开始配置（请不要忘记 配置一个路由就要添加一个对应的文件 ， 组件名首字符请大写）**

**3、然后就是要根据项目具体内容去拆分哪些是公用组件，进行组件分离到components目录下面**

上面的检查没有问题后，项目正常 npm run dev 跑起来后 ，就可以开始你的各个视图开发了！

## 然而在这里你需要了解的是

**1、路由的正确书写**
	
		<router-link  :to= 二级路由 > 这里的 路由 最好写在二级路由里面</router-link>


**2、VUE组件内的各个钩子的生命周期**
	
		import { mapGetters, mapActions} from 'vuex'   // import 其实 === require 都是加载依赖
		import store from '../../vuex/store'

		export default {
	    	store,

		    // 实例初始化前  虚拟DOM 和 data 都未 生成  可以在这加个loading事件 
		    beforeCreate (){
				console.group("实例初始化前  虚拟DOM 和 data 都未 生成-----------------》");
				console.log("创建之前-----------------》");
				console.log(this.$el);
		    },

		    //  实例初始化完成  虚拟DOM 是不存在的。 但是 data 是存在的   在这结束loading，初始化函数自执行 
		    created (){
				//使用场景：发送请求获取数据
				console.group("实例初始化完成  虚拟DOM 是不存在的。-----------------》");
				console.log("实例创建后------------------》");
				console.log(this.$el);
		    },

		    // 实例 挂载前 虚拟DOM已经生成， 先占坑     data  已存在
		    beforeMount (){
				console.group("实例 挂载前 虚拟DOM已经生成-----------------》");
				console.log("实例生成后-----------------》");
				console.log(this.$el);
		    },

		    // 完成虚拟DOM 的挂载   实体 DOM 已经生成
		    mounted (){
				console.group("完成虚拟DOM 的挂载   实体 DOM 已经生成-----------------》");
				console.log("000000000-----------------》");
				console.log(this.$el);
		    },

		    // data数据更新前 
		    beforeUpdate (){
				console.group("data数据更新前 -----------------》");
				console.log("beforeU---------------------》");
				console.log(this.$el);
		    },

		    // DOM 数据 更新 完成
		    updated (){
				console.group("DOM 数据 更新 完成-----------------》");
				console.log("updated-----------------------》");
				console.log(this.$el);
		    },

		    // 删除组件前的 确认
		    befoerDestory (){
				console.group("删除组件前的 确认-----------------》");
				console.log("befoerDestory ----------------》");
				console.log(this.$el);
		    },

		    // 组件已经删除
		    destroyed (){
				console.group("组件已经删除-----------------》");
				console.log("destroyed--------------》");
				console.log(this.$el);
		    },

		    data(){
				return {}
		    },

		    // 组件包含的 方法
		    methods : {
				bbb : function(){
					console.log("点点点");
				},
				...mapActions(["addText"])
		    },
			// 计算
		    computed : {
				...mapGetters([
					"data"
				])
		    },
			// 当前组件 内需要的额外组件
			components : {
			}
	  }
		
		以上只是组件内部的部分钩子， 不要以为只是全部，
		你后面会发现 每个组件内部还有自己的 路由控制器 官方成【路由守卫】 ，这里真是坑新手的


![](http://47.97.165.187/images/vue2.jpg)


**3、哪些是你全局的CSS，哪些是你的单个组件内部CSS ，避免样式重叠**

		<style scoped> 这里是 全局的CSS <style>
		<style scoped> 这里是 组件内部的CSS <style>

**4、组件的嵌套尽量不要超过两级**

**5、单个组件内部应用的方法尽量写在 export default的大对象外部 ， 因为export default 暴露出去的各个钩子会随着组件的更新而更新。而你的这些方法并不要再做更新处理，没有必要再浪费资源**

**6、项目中尽量配置一个全局变量， 用来保存全局的http路径 和登录后的个人信息 以及 全局的 一些参数信息**
	
	个人 是配置在config 目录结构下面自定义文件里


其实简单的项目并没有那么多坑，但是项目慢慢的在壮大，一些隐藏的问题就会慢慢暴露出来

## 钩子 之 详细介绍 

### 1、beforeCreatd 钩子 

有些人说这里可以做 welcome ，但我并不这么认为，因为这里的钩子和下面的钩子时间间隔太短了，图片以及文案会一闪而过的，
所以应该用router来实现。
你应该有一个welcome的页面，当路由的path为'/'时，跳到这个页面，在这个页面中，先判断浏览器缓存中是否有comming字段，若有，跳转到index页面，若没有，增加一个comming字段。



#  未完待续

### 2、mounted 钩子

## 组件之间的通讯

## 组件的异步加载

## 权限的配置
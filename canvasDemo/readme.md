## canvas demo 

释：

>  此demo 包含两个点， 1、canvas旋转动画， 2 、canvas指定区域 截取屏幕为图片格式

> 1、动画由内到外 转速 由慢变快再变慢直到停止

> 2、指定区域可以为 canvas或者为div块区域

注意： 

canvas2images.js  内部包含 PC 和移动端 那种方案， 当在PC端时  调用方法为saveAsImage ，在此函数中 存在模拟 MouseEvents 的 click事件， 可以直接下载保存图片， 但是并不适合在移动端使用； 移动端无法直接下载图片， 需要将生成的数据转成图片格式，并返回， 做成弹窗 让用户手动保存调用方法为convertToImage；

移动端demo地址 ： http://wwlin.cn/canvasDemo/
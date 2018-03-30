## node 学习

### 基础： require,exports和module.exports

    由于Node保存了所有导入的module，当我们用require()获取隐式module对象时，
	Node找到对应的module，把这个module的exports变量返回，这样，另一个模块就顺利拿到了模块的输出：

    var module = {
        id = "hello",
        exports : {}   // 初始化是一个 空对象
    }

    但是你不可以直接对exports赋值 。 给exports赋值是无效的，因为赋值后，module.exports仍然是空对象{}。

    最终，我们强烈建议使用module.exports = xxx的方式来输出模块变量，这样，你只需要记忆一种方法。

### 全局对象

    JavaScript有且仅有一个全局对象，在浏览器中，叫window对象 ； 在node.js 环境中 是global;

    process也是Node.js提供的一个对象，它代表当前Node.js进程。通过process对象可以拿到许多有用信息：

    例如 ： 如果我们想要在下一次事件响应中执行代码，可以调用process.nextTick()：

    // process.nextTick()将在下一轮事件循环中调用:
    process.nextTick(function () {
        console.log('nextTick callback!');
    });
    console.log('nextTick was set!');

    --> nextTick was set!
    --> nextTick callback!

## 基础模块 

### fs模块  就是文件系统模块，负责读写文件

    fs模块同时提供了异步和同步的方法

    同步操作的好处是代码简单，缺点是程序将等待IO操作，在等待时间内，无法响应其它任何事件。而异步读取不用等待IO操作，但代码较麻烦

    var fs = require('fs')
    fs.readFile("someThing.txt" , 'utf-8' , function (err , data){  // 异步读取文件   用回调函数做 异常处理
        if(err) {
            console.log(err);
        }else {
            console.log(data);

            var buf =  Buffer.from(data ,'utf-8');  //  String 转 Buffer 对象

            console.log(buf);
        }
    })


    try {                  //  同步 读文件   使用 try catch 做 异常处理
        var data = fs.readFileSync('someThing.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        // 出错了
        console.log(err)
    }

**注意点** 

    Buffer 对象

    当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。在Node.js中，
	Buffer对象就是一个包含零个或任意个字节的数组（注意和Array不同）。

    Buffer对象可以和String作转换，例如，把一个Buffer对象转换成String：

    // Buffer -> String
    var text = data.toString('utf-8');
    console.log(text);
    或者把一个String转换成Buffer：

    // String -> Buffer
    var buf = Buffer.from(text, 'utf-8');
    console.log(buf)

### fs 写文件

    writeFile()的参数依次为文件名、数据和回调函数。如果传入的数据是String，
    默认按UTF-8编码写入文本文件，如果传入的参数是Buffer，则写入的是二进制文件。
    回调函数由于只关心成功与否，因此只需要一个err参数。

    var data = 'Hello, Node.js';
    fs.writeFile('output.txt', data, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok.');
        }
    })

    当没有 output.txt 文件时  则会创建

    和readFile()类似，writeFile()也有一个同步方法，叫writeFileSync()：

### fs.stat 

    如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，它返回一个Stat对象，能告诉我们文件或目录的详细信息：

    fs.stat('sample.txt', function (err, stat) {
        if (err) {
            console.log(err);
        } else {
            // 是否是文件:
            console.log('isFile: ' + stat.isFile());
            // 是否是目录:
            console.log('isDirectory: ' + stat.isDirectory());
            if (stat.isFile()) {
                // 文件大小:
                console.log('size: ' + stat.size);
                // 创建时间, Date对象:
                console.log('birth time: ' + stat.birthtime);
                // 修改时间, Date对象:
                console.log('modified time: ' + stat.mtime);
            }
        }
    });

    stat()也有一个对应的同步函数statSync()，请试着改写上述异步代码为同步代码。

### 异步还是同步
    在fs模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？

    由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，
	否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

    服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，
	不影响服务器正常运行时的异步执行。


### stream 模块
    stream是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

    主要体现在四个类上 InputStream、Reader、OutputStream、Writer 
    其中InputStream和OutputStream类针对字节数据进行读写；Reader和Writer针对字符数据读写
    提供了支持字节和字符读写的Readable和Writeable类

**在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：**
    **data事件表示流的数据已经可以读取了，end事件表示这个流已经到末尾了，没有数据可以读取了，error事件表示出错了。**

    var fs = require('fs');

    // 打开一个流:
    var rs = fs.createReadStream('output.txt', 'utf-8');

    rs.on('data', function (chunk) {
        console.log('DATA:')
        console.log(chunk);
    });

    rs.on('end', function () {
        console.log('END');
    });

    rs.on('error', function (err) {
        console.log('ERROR: ' + err);
    });

**要注意，当数据过于庞大的时候 , data事件可能会有多次，每次传递的chunk是流的一部分数据。**
    **要以流的形式写入文件，只需要不断的调用write()方法，最后以end()结束**


### 待续
<template>
    <div>
        <div class="meassage">
            <div class="meassageTitle">评论列表：</div>
            <ul>
                <li>1、1</li>
                <li>2、2</li>
                <li>3、3</li>
                <li>4、4</li>
            </ul>
        </div>
        <div id="editor">
            <h2 class="h3Style">编写新评论：</h2>
            <div class="user clearfix">
                <div class="userName">用户名：</div>
                <Input v-model="value" placeholder="输入用户名" style="width: 200px"></Input>
            </div>
            <div class="writeMess">编写评论语：</div>
            <textarea :value="input" @input="update"></textarea>
            <div class="compiledMarkdown" v-html="compiledMarkdown"></div>
        </div>
        <div class="markdownBtn" @click="btnClick">点击发表</div>
        <!-- <vue-markdown>{{input}}</vue-markdown> -->
    </div>
</template>
<script>
// vue markdown 生成器
import marked  from "marked";
import lodash  from "lodash";

// vue markdown 渲染器
import VueMarkdown   from "vue-markdown";
export default {
    data () {
        return {
            input: '# hello',
            value:""
        }
    },
    mounted () {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        this.input = '# hello';
    },
    created (){
        console.group("实例初始化完成  虚拟DOM 是不存在的。-----------------》");
        // 此处 更新 marked 数据 
        this.input = '# hello <br /> 222';
    },
    components :{
        marked,
        VueMarkdown
    },
    computed: {
        // 实时渲染 
        compiledMarkdown: function () {
            return marked(this.input, { sanitize: true });
        }
    },
    methods: {
        // 实时 更新
        update : _.debounce(function (e) {
            this.input = e.target.value;
        }, 200),
        btnClick () {
            console.log(this.input);
        }
    }
}
</script>
<style scoped>
    html, body, #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }
    textarea, #editor > .compiledMarkdown {
        display: inline-block;
        width: 49%;
        min-height: 300px;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        border: 1px solid #ccc;
        padding: 10px 20px 0;
    }
    textarea {
        border: none;
        border: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }
    code {
        color: #f66;
    }

    #editor {
        padding: 20px;
    }

    #editor .h3Style {
        margin-bottom: 20px;
    }
    .markdownBtn {
        width: 150px;
        height: 40px;
        color: #fff;
        font-size: 20px;
        line-height: 40px;
        text-align: center;
        background-color: rgb(43, 133, 228);
        border-radius: 5px;
        margin: 40px auto 0;
        cursor: pointer;
    }

    /* 评论 列表 style */
    .meassage {
        padding: 20px;
        font-size: 20px;
    }
    .meassage  .meassageTitle {
        font-weight: 700;
        padding-bottom: 20px;
        border-bottom: 1px solid #cccccc;
        margin-bottom: 20px;
    }

    .meassage ul {
        padding-bottom: 20px;
        border-bottom: 1px solid #cccccc;
    }

    .meassage ul li{
        font-size: 18px;
        margin-bottom: 10px;
    }
    .user {
        margin-bottom: 20px;
    }
    .user .userName {
        float: left;
        font-size: 14px;
        line-height: 30px;
    }

    .writeMess {
        font-size: 14px;
        line-height: 30px;
        margin-bottom: 20px;
    }
</style>

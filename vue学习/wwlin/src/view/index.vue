<template>
    <div class="layout">
        <ul class="openText" v-show="loginView">
            <li v-for="(v , i) in listItem" :key="i" :class="v.falg ? 'openText' + (i + 1) + ' active' : 'openText' + (i + 1) " >{{v.lable}}</li>
        </ul>
        <Layout :style="{minHeight: '100vh'}">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" :class="menuitemClasses" >
                <div class="admin"></div>
                <Sidebar></Sidebar>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                    <div id="clock">
                        <p class="date">{{ date }}</p>
                        <p class="time">{{ time }}</p>
                    </div>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import Sidebar from '../components/sidebar';
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            listItem: [
                {
                    falg : false ,
                    lable: "每一段故事都是"
                },
                {
                    falg : false ,
                    lable: "从相逢开始"
                },
                {
                    falg : false ,
                    lable: "起于你"
                },
                {
                    falg : false ,
                    lable: "止于时间"
                },
                {
                    falg : false ,
                    lable: "欢迎来到wwlin.cn"
                }
            ],
            loginView : true,
            isCollapsed: false,
            time: '',
            date: ''
        }
    },
    computed: {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        }
    },
    mounted () {
        openText(this);
        /**
         * 开始窗口 滚动语言
         *  
        */
        function openText (that) {
            let listItem = that.listItem;
            for (var i = 0; i < listItem.length ; i ++ ) {
                setTimeout((function (i){
                    return function () {
                        listItem[i].falg = true;
                    }
                })(i), 1000*i);
            }
            
            setTimeout( function(){
                that.loginView = false;
            } , 5500);
        }


        var that = this;
        /**@augments
        *  页面时钟
        */
        // var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var timerID = setInterval(updateTime, 1000);
        updateTime();
        function updateTime() {
            var cd = new Date();
            that.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
            that.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
        };

        function zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
    components :{
        Sidebar
    }
}
</script>

<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        /* border-radius: 4px; */
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-icon {
        cursor: pointer;
    }

    .admin {
        color: rgba(255, 255, 255, 0.7);
        width: 170px;
        height: 30px;
        background: rgba(100, 100, 100, 0.7);
        margin-left: 15px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        margin-top: 16px;
        border-radius: 5px;
        transition: width .2s ease-in-out;
        margin-bottom: 18px;
    }

    .collapsed-menu .admin {
        font-size: 14px;
        width: 45px;
        transition: width .2s ease-in-out;
    }


    /* 开始窗口 */
    .openText {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: #495060;
    }
    .openText1, 
    .openText2, 
    .openText3, 
    .openText4, 
    .openText5{
        width: 200px;
        height: 40px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 24px;
        line-height: 40px;
        text-align: center;
        position: absolute;
        opacity: 0;
    }
    .openText1{
        left: 100px;
        top: 150px;
    }

    .openText2{
        left: 100px;
        top: 230px;
    }

    .openText3{
        left: 100px;
        top: 310px;
    }
    .openText4{
        left: 100px;
        top: 390px;
    }
    .openText5{
        left: 100px;
        top: 470px;
    }

    .openText1.active,
    .openText2.active,
    .openText3.active,
    .openText4.active,
    .openText5.active{
        animation: bottomToTop 2s ease-in-out 1 both;
        -webkit-animation: bottomToTop 2s ease-in-out 1 both;
    }

    @keyframes bottomToTop{
        0%{
            transform: translateY(100%);
            opacity: 0;
        }
        30%{
            transform: translateY(0);
            opacity: 1;
        }
        70%{
            transform: translateY(0);
            opacity: 1;
        }
        100%{
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    @-webkit-keyframes bottomToTop{
        0%{
            -webkit-transform: translateY(100%);
            opacity: 0;
        }
        30%{
            -webkit-transform: translateY(0);
            opacity: 1;
        }
        70%{
            -webkit-transform: translateY(0);
            opacity: 1;
        }
        100%{
            -webkit-transform: translateY(-100%);
            opacity: 0;
        }
    }


    /* 时钟 style  */
    #clock p {
        margin: 0;
        padding: 0;
        float: left;
    }

    #clock {
        font-family: 'Share Tech Mono', monospace;
        color: #495060;
        text-align: center;
        text-shadow: 0 0 1px #495060;
        float: right;
    }
    #clock .time {
        letter-spacing: 0.05em;
        font-size: 24px;
        margin-right: 30px;
    }
    #clock .date {
        letter-spacing: 0.1em;
        font-size: 24px;
        margin-right: 20px;
    }
    #clock .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }
</style>

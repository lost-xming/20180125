<template>
    <Menu theme="dark" width="auto" >
        <router-link v-for="(list ,index) in lists" :to=list.pathTo  :key="list.title">
            <MenuItem :name= "('1-' + (index + 1))">
                <Icon class="nav_1" :type="list.icon"></Icon>
                <span class="layout-text">{{list.title}}</span>
            </MenuItem>
        </router-link>
    </Menu>
</template>
<script>
export default {
    data(){
        return {
            lists : [
                {
                    icon : "ios-book",
                    title : "最近文章",
                    pathTo :"/book"
                },{
                    icon : "ios-folder",
                    title : "工作经历",
                    pathTo : "/workExperience"
                },{
                    icon : "ios-albums",
                    title : "技术点",
                    pathTo : "/technologyDot"
                },{
                    icon : "ios-paper",
                    title : "留言板",
                    pathTo : "/messageBoard"
                }
            ]
        }
    },
}
</script>
<style scoped>

    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease-in-out;
        line-height: 30px;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease-in-out, transform .2s ease-in-out;
        vertical-align: middle;
        font-size: 16px;
        line-height: 30px;
    }
    .collapsed-menu i{
        transition: font-size .2s ease-in-out, transform .2s ease-in-out;
        transform: translateX(0px);
        vertical-align: middle;
        font-size: 20px;
        line-height: 30px;
    }
    .collapsed-menu  .layout-text{
        width: 0;
        height: 0;
    }
</style>

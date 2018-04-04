import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import WorkExperience from '@/view/workExperience'
import TechnologyDot from '@/view/technologyDot'
import MessageBoard from '@/view/messageBoard'
import Book from '@/view/book'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [  //这里就是二级路由的配置
                {
                    path: '/book',
                    name: '最近文章',
                    component: Book
                },
                {
                    path: '/workExperience',
                    name: '工作经历',
                    component: WorkExperience
                },
                {
                    path: '/technologyDot',
                    name: '技术点',
                    component: TechnologyDot
                },
                {
                    path: '/messageBoard',
                    name: '留言板',
                    component: MessageBoard
                }
            ]
        },
        
    ]
})

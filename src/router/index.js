import Vue from 'vue'
import VueRouter from 'vue-router'
//  引入Login.vue组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/admin/UserList.vue'
import BallsList from '../components/doubleball/BallsList.vue'
import ToolsList from '../components/tool/ToolsList.vue'
import BallsListPie from  '../components/doubleball/BallsListPie'
import BallsListBar from  '../components/doubleball/BallsListBar'
import PoemInfo from '../components/poem/PoemInfo'
import WriteToExcel from '../components/tool/WriteToExcel'


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter)

//  定义路由数组
const routes = [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login
    },
    {
        path: "/home",
        component: Home,
        redirect:"/welcome",
        children:[
            {path:"/welcome",component: Welcome},
            {path:"/user",component: UserList},                   //  系统中所有用户记录
            {path:"/ballsinfo",component: BallsList},             //  双色球所有记录
            {path:"/ballslistpie",component: BallsListPie},       //  双色球所有记录饼图显示
            {path:"/ballslistbar",component: BallsListBar},       //  双色球所有记录柱状图显示
            {path:"/alltools",component: ToolsList},              //  自制的一些小工具
            {path:"/poeminfo",component: PoemInfo},              //  诗歌相关
            {path:"/writetoexcel",component: WriteToExcel},      //  excel相关
        ]
    }
]

const router = new VueRouter({    //  创建router 对路由进行管理，它是由构造函数 new vueRouter() 创建，接受routes 参数。
  mode: 'history',
  base: process.env.BASE_URL,
  routes         //  routes: routes 的简写，就是上面定义的 const routes
})


// Vue router/ElementUI,Ant Design Vue 重复点击导航路由报错解决方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject){
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject) ;
    return originalPush.call(this, location).catch(err => err)
}
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }


//  挂载路由导航守卫
router.beforeEach((to,from,next)=> {
    // to:将要访问的路径，下一个页面
    // from:从哪里访问的路径，当前页面
    // next:之后要做的任务，是一个函数。next()放行，当括号里面是空时，会继续访问to的路径。next('/URL')强制跳转的路径，会重定向到URL上。
    if (to.path=="/login") {
        return next();
    }
      // 获取user
    const userFlag = window.sessionStorage.getItem("user");  //  取出当前用户
    if (!userFlag) return next("/login");  //  用户未登录，返回登录页
    next();  //  用户登录，跳转到对应路径
})

export default router    //  暴露出去


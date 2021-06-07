import Vue from 'vue'  //  引入/node_modules/vue的依赖
import App from './App.vue'  //  引入/src/App.vue文件
import router from './router'  //  引入/src/router/index.js文件
import store from './store'  //  引入/src/store/index.js文件

//  引入/node_modules/element-ui的依赖
import ElementUI from 'element-ui'
//  引入/node_modules/element-ui的样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'

//  引入/node_modules/echarts的样式
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import './assets/css/global.css'   //  添加全局样式
import './assets/font/iconfont.css'   //  将iconfont加到/src/assets/font后，引入iconfont

import axios from 'axios'  //  引入axios

//  挂载axios。在全局使用aixos，在main.js中就需要这样写 Vue.prototype.$http = axios  。在vue文件中可以直接使用类似方法  this.$http.get(url)
Vue.prototype.$http = axios

//  设置访问根路径。使用axios切换生产环境和开发环境接口地址时，在只需要配置单个或有限明确的接口域名时可以直接在main.js中设置，在生产环境和开发环境切换时需手动更改
axios.defaults.baseURL = "http://localhost:9000"

Vue.prototype.$imgPrefix = (src) => {
    return `http://localhost:9000/${src}`
}


Vue.config.productionTip = false
// 阻止显示生产模式的消息。如果没有这行代码，或者设置为true，控制台就会多出这么一段代码。You are running Vue in development mode. Make sure to turn on production mode when deploying for production. 大概意思就是：你运行的Vue是开发模式，为生产部署时，请确保启用生产模式。
// 开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。

//  引入ElementUI包后，注册ElementUI插件
Vue.use(ElementUI)

//  所有插件的使用都是在src/main.js中进行导入的。包括：插件vue.js,vuex.js,App,router等。打开src/main.js 导入如： import store from './store'。 如果是router、store等，还需要在main.js中的new Vue实例中添加，如下面所示
new Vue({  //  创建一个vue对象
  router,  //  把 /src/router/index.js 中的 router 路由实例注入到 vue 根实例中，就可以使用路由了
  store,   //  把 /src/store/index.js 中的 store 注入，用来引用vuex仓库
  render: h => h(App)  //  render 渲染函数得到 VNode 节点之后，返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点
}).$mount('#app')  //  将创建的对象挂载到指定的页面节点app上。该app节点就是App文件中【div id="app"】的页面节点，该节点是根节点，所以只有一个节点叫做app。


/**   render是一个渲染函数(具体解释参考https://cn.vuejs.org/v2/api/#render)。
类型：(createElement: () => VNode) => VNode
详细：字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。
如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。
Vue 选项中的 render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
render: h => h(App) 是下面内容的缩写：
render: function (createElement) {
    return createElement(App);
}
进一步缩写为(ES6 语法)：
render (createElement) {
    return createElement(App);
}
再进一步缩写为：
render (h){
    return h(App);
}
按照 ES6 箭头函数的写法，就得到了：
render: h => h(App);
个人理解：createElement 函数是用来生成 HTML DOM 元素的，也就是上文中的 generate HTML structures，也就是 Hyperscript，这样作者才把 createElement 简写成 h。h是 Vue.js 里面的 createElement 函数，这个函数的作用就是生成一个 VNode节点，render 函数得到这个 VNode 节点之后，返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上

实际渲染
  import App from './App'
  import Vue from 'vue'
  new Vue({
    el:'#root',
    template:'<App></App>',
    components:{
      App
    }
  })
 手动挂载
 在Vue构造函数时，需要配置一个el属性，如果没有没有el属性时，可以使用.$mount('#app')进行挂载。
  // 配置了el属性：
  new Vue({
     el:"#app",
     router
  });
 // 如果没有配置el属性，可以使用手动挂载$mount("#app")
  new Vue({
     router
  }).$mount('#app');
*/



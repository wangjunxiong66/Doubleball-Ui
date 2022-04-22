<template>
  <!--一个项目中只能有一个id叫"app"-->
  <div id="app">
    <router-view></router-view>      <!--   v-if="isReloadData 是为了实现页面的局部刷新  "-->
    <!--    <router-view> 组件是一个 functional 组件，渲染路径匹配到的视图组件。<router-view> 渲染的组件还可以内嵌自己的 <router-view>，根据嵌套路径，渲染嵌套组件。
          其他属性 (非 router-view 使用的属性) 都直接传给渲染的组件， 很多时候，每个路由的数据都是包含在路由参数中。
          <router-view>有一个参数 name，类型是 string，默认值是 "default"。如果 <router-view>设置了名称，则会渲染对应的路由配置中 components 下的相应组件。如果 router-view 没有设置名字，那么默认为 default。
            例如  <router-view class="view one"></router-view>
            <router-view class="view two" name="a"></router-view>
            <router-view class="view three" name="b"></router-view>
            一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：
            const router = new VueRouter({
              routes: [
                {
                  path: '/',
                  components: {
                    default: Foo,
                    a: Bar,
                    b: Baz
                  }
                }
              ]
            })
    -->

  </div>
</template>


<script>
    export default {
        name: "App",
        // provide() {
        //     return{
        //         reload: this.reloadPart           //   定义一个局部刷新标识
        //     }
        // },
        // data() {
        //     return {
        //         isReloadData: true,     //   定义一个局部刷新标识
        //     }
        // },
        methods: {
        //     reloadPart(){                   //   定义一个局部刷新方法
        //         this.isReloadData = false ;
        //         this.$nextTick(function() {
        //             this.isReloadData = true
        //         })
        //     }
        }
    }
</script>

<!--Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言， Less 仅对 CSS 语言增加了少许方便的扩展-->
<style lang="less">
</style>
<!--=======-->
  <!--<div id="app">-->
    <!--<router-view></router-view>-->
  <!--</div>-->
<!--</template>-->

<!--<style>-->
  <!--@import "assets/css/base.css";-->
  <!--.el-header {-->
    <!--background-color: #B3C099;-->
    <!--color: #333;-->
    <!--line-height: 60px;-->
  <!--}-->

  <!--.el-aside {-->
    <!--/*color: #333;*/-->
  <!--}-->
<!--</style>-->

<!--<script>-->
    <!--export default {-->
    <!--};-->
<!--</script>-->
<!--&gt;>>>>>> ab63b491284f510d880a071ced6807536db2ce6b-->

<template>
  <!--引入container布局-->
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <div>
        <img src="../assets/img/lion.png" alt/>
        <span>个人运动平台</span>
      </div>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
    <!--主体-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <!--default-openeds 默认打开指定导航。background-color属性为下拉菜单整体的背景颜色。text-color为下拉菜单中的文字的颜色。active-text-color为选中的菜单的颜色-->
        <el-menu :default-openeds="['1', '3']" background-color="#545c64" text-color="#fff" active-text-color="#409eff" >
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主体内容-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>


<script>
    export default {
        methods: {
            //  安全退出
            logout(){
                window.sessionStorage.clear();  //  清除session
                this.$router.push("/login");   //  回到登录页面
            }
        }
    }
</script>


<style lang="less" scoped>
  //  布局器样式
  .home-container{
    height: 100%;
  }

  // 头样式
     .el-header{
       background-color: #373d41;
       display: flex;  //  "弹性布局"，用来为盒状模型提供最大的灵活性
       justify-content: space-between;  //  各元素位于各行之间留有空白的容器内，元素左右贴边。
       padding-left: 0%;
       color: #fff;
       font-size: 30px;
       >div{
         display: flex;
         align-items: center;  //  元素在y轴上如何对齐
         span{
           margin-left: 15px;
         }
       }
     }
  //  侧边样式
      .el-aside{
        background-color: #333744;
      }
  //  主体样式
      .el-main{
        background-color: #eaedf1;
      }
  .img{
    height: 85px;
    width: 170px;
  }

</style>




  <!--<div class="hello">-->
    <!--<h1>{{ msg }}</h1>-->
    <!--<p>-->
      <!--For a guide and recipes on how to configure / customize this project,<br>-->
      <!--check out the-->
      <!--<a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.-->
    <!--</p>-->
    <!--<h3>Installed CLI Plugins</h3>-->
    <!--<ul>-->
      <!--<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>-->
      <!--<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>-->
      <!--<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>-->
    <!--</ul>-->
    <!--<h3>Essential Links</h3>-->
    <!--<ul>-->
      <!--<li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>-->
      <!--<li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>-->
      <!--<li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>-->
      <!--<li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>-->
      <!--<li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>-->
    <!--</ul>-->
    <!--<h3>Ecosystem</h3>-->
    <!--<ul>-->
      <!--<li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>-->
      <!--<li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>-->
      <!--<li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>-->
      <!--<li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>-->
      <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>-->
    <!--</ul>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
  <!--name: 'HelloWorld',-->
  <!--props: {-->
    <!--msg: String-->
  <!--}-->
<!--}-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped>-->
<!--h3 {-->
  <!--margin: 40px 0 0;-->
<!--}-->
<!--ul {-->
  <!--list-style-type: none;-->
  <!--padding: 0;-->
<!--}-->
<!--li {-->
  <!--display: inline-block;-->
  <!--margin: 0 10px;-->
<!--}-->
<!--a {-->
  <!--color: #42b983;-->
<!--}-->
<!--&gt;>>>>>> ab63b491284f510d880a071ced6807536db2ce6b-->
<!--</style>-->

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
            <!--侧边栏。默认width="200px"，为了在伸缩时保持伸缩按钮和导航菜单的统一，做以下调整:width="isCollapse?'64px':'200px'"-->
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">《=》</div>
                <!--  为了保证只有一个子项打开，需要通过在el-menu上加 :unique-opened=true，或者直接加 unique-opened，它的默认值应该是 true  -->
                <!--default-openeds 默认打开指定导航。background-color属性为下拉菜单整体的背景颜色。text-color为下拉菜单中的文字的颜色。active-text-color为选中的菜单的颜色。如果不想让一级菜单展开太多，可以加上unique-opened，只能同时展开一个一级菜单。collapse-transition	是否开启折叠动画，不写该项时默认是开启-->
                <!-- :router  是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转。若使用router属性menu-item的index将对应router的path属性-->
                <!--default-active	当前激活菜单的 index-->
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" :collapse="isCollapse" :collapse-transition="false" :router="true"
                :default-active="activePath">
                    <!--一级菜单-->
                    <!-- 设置完unique-opened为true之后，还需要再设置el-submenu或者el-menu-item中index的唯一性，如果index中有一样的，那么设置的unique-opened就会无效  -->
                    <!--index是el-menu或者el-menu-item的唯一标识，赋值时需要注意，:index中只接受字符串，如果赋值了一个整数，需要改为字符串，例如  :index="item.id+''"-->
                    <!--使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。vue中列表循环需加:key="唯一标识"。唯一标识可以是item里面id、index等，因为vue组件高度复用，增加Key可以标识组件的唯一性，为了更好地区别各个组件， key的作用主要是为了高效的更新虚拟DOM。-->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <!--<template slot>作用域插槽,是对组件的扩展，通过slot插槽向组件内部指定位置传递内容，通过slot可以父子传参-->
                        <template slot="title"><i :class="iconObject[item.id]"></i><span>{{item.title}}</span></template>
                        <!--二级菜单-->
                        <!-- 设置完unique-opened为true之后，还需要再设置el-submenu或者el-menu-item中index的唯一性，如果index中有一样的，那么设置的unique-opened就会无效  -->
                        <!--index是el-menu或者el-menu-item的唯一标识，赋值时需要注意，:index中只接受字符串，如果赋值了一个整数，需要改为字符串，例如  :index="item.id+''"-->
                        <!--使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。vue中列表循环需加:key="唯一标识"。唯一标识可以是item里面id、index等，因为vue组件高度复用，增加Key可以标识组件的唯一性，为了更好地区别各个组件， key的作用主要是为了高效的更新虚拟DOM。-->
                        <el-menu-item :index="it.path" v-for="it in item.sList" :key="it.id" @click="saveNavState(it.path)">
                            <template slot="title"><i :class="iconObject[it.id]"></i><span>{{it.title}}</span></template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--主体内容-->
            <el-main>
                <router-view></router-view>
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
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
    export default {
        data(){
            return{
                //  菜单列表
                menulist:[],
                isCollapse: false,  //  侧边栏伸缩
                iconObject:{     //  罗列导航项的图标名称，这些图标由iconfont而来
                    '100': 'iconfont icon-denglu1',
                    '101': 'iconfont icon-yinliao3',
                    '102': 'iconfont icon-baseball-bat',
                    '103': 'iconfont icon-jiudiancanting-',
                    '104': 'iconfont icon-shangpinkuozhan',
                    '200': 'iconfont icon-Sportsentertainment',
                    '201': 'iconfont icon-shu',
                    '202': 'iconfont icon-qialuli',
                    '203': 'iconfont icon-92',
                    '204': 'iconfont icon-yinliao1',
                    '300': 'iconfont icon-Sportsentertainment',
                    '301': 'iconfont icon-yinliao1',
                    '302': 'iconfont icon-shangpin',
                    '303': 'iconfont icon-yinliao1',
                    '304': 'iconfont icon-yinliao1',
                    '400': 'iconfont icon-Sportsentertainment',
                    '401': 'iconfont icon-yinliao1',
                    '402': 'iconfont icon-yinliao1',
                    '403': 'iconfont icon-shangpin',
                },
                activePath:'/welcome',  // 默认路径
            }
        },
        // created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。执行顺序：父组件-子组件
        // mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。执行顺序：子组件-父组件
        //  onload 事件
        created(){
            //  先查询出主菜单、子菜单的信息，即上面的导航菜单列表menulist。但是不能使用 这种形式this.methods.getMenuList()，这种形式是错误的。
            this.getMenuList();
            //  刷新页面时不会触发点击二级导航栏，但是可以取出存在session中的路由进行访问
            this.activePath = window.sessionStorage.getItem('activePath'); // 取出session里的path动态修改activePath，当登录后停留在某个页面刷新时使用保存的activePath
        },
        methods: {
            //  安全退出
            logout(){
                window.sessionStorage.clear();  //  清除session
                this.$router.push("/login");   //  回到登录页面
            },
            //  获取导航菜单方法
            async getMenuList(){
                const {data:res} = await this.$http.get("menus");
                console.log(res);
                if (res.flag!=200) return this.$message.error("获取列表失败！！！"); // 访问失败的错误信息
                this.menulist = res.menus ;  // 数据回填
            },
            //  控制导航菜单的伸缩
            toggleCollapse(){
                this.isCollapse = !this.isCollapse ;
            },
            //  保存当前激活的路径
            saveNavState(activePath){
                window.sessionStorage.setItem('activePath',activePath);  //  存放在session里，当登录后停留在某个页面刷新时使用保存的activePath
                this.activePath = activePath ;
            }
        }
    }
</script>


<style lang="less" scoped>
    /* 布局器样式 */
    .home-container{
    height: 100%;
    }
    /* 头样式 */
    /*  <el-header>：顶部栏容器，<el-aside>：侧边栏容器，<el-main>：内容区域容器，<el-footer>：底部栏容器。可以直接使用".el-header"、".el-aside"、".el-main"、".el-footer"设置样式，不需要设置class或者id值  */
    .el-header{
        background-color: #373d41;
        display: flex;  /* "弹性布局"，用来为盒状模型提供最大的灵活性 */
        justify-content: space-between;  /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。space-between表示各元素位于各行之间留有空白的容器内，元素左右贴边。 */
        padding-left: 0%;   /* 该样式是为了让左侧的图片靠近左边，与左边界不留空隙 */
        align-items: center;  /* 定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。在"安全退出"按钮处可以看出来 */
        color: #fff;
        font-size: 30px;
        >div{
            display: flex;
            align-items: center;  /*  定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
            span{
                margin-left: 15px;
            }
        }
    }
    /* 侧边样式 */
    .el-aside{
        background-color: #333744;
        .el-menu{
            /* 该样式是为了解决主菜单或者子菜单被选中时，在菜单项右侧会出现向右突出的样式的问题 */
            border-right: none;
        }
    }
    /* 主体样式 */
    .el-main{
        background-color: #eaedf1;
    }
    .img{
        height: 85px;
        width: 170px;
    }
    /*控制导航菜单收缩伸展*/
    .toggle-button{
        background-color: #4A5864;
        font-size: 15px;
        line-height: 25px;  /* 设置行高 */
        color: #fff ;  /*  字体颜色 */
        text-align: center;  /* 规定元素中的文本的水平对齐方式 */
        letter-spacing: 0.2cm;   /*  增加或减少字符间的空白（字符间距） */
        cursor: pointer;  /*  鼠标移到此处时显示小手 */
    }
</style>

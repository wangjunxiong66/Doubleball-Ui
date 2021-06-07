<template>
    <!--<div>-->
    <el-container>
        <el-header>
            <h1>Header</h1>
        </el-header>
        <el-container style="border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%;position: fixed; left: 0;">
                <!--<el-menu :default-openeds="['1', '3']" :default-active="'1-1'">-->
                <!--<el-submenu index="1">-->
                <!--<template slot="title"><i class="el-icon-message"></i>导航一</template>-->
                <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
                <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
                <!--<el-submenu index="1-3">-->
                <!--<template slot="title"><i class="el-icon-menu"></i>选项3</template>-->
                <!--<el-menu-item index="1-3-1">选项3-1</el-menu-item>-->
                <!--<el-menu-item index="1-3-3">选项3-1</el-menu-item>-->
                <!--</el-submenu>-->
                <!--</el-submenu>-->
                <!--<el-submenu index="2">-->
                <!--<template slot="title"><i class="el-icon-setting"></i> 导航二</template>-->
                <!--<el-menu-item index="2-1">选项2-1</el-menu-item>-->
                <!--</el-submenu>-->
                <!--</el-menu>-->
                <el-menu router :default-openeds="['0']" style="">
                    <!--如果不加入index，会导致点击左侧导航栏时会同时打开或者关闭所有导航栏-->
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" >
                        <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
                        <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :class="$route.path==item2.path?'is-active':''" v-if="item2.show !== false">{{item2.name}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container style="margin-left: 200px">
                <!--<el-header style="text-align: right; font-size: 12px">-->
                    <!--<el-dropdown>-->
                        <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
                        <!--<el-dropdown-menu slot="dropdown">-->
                            <!--<el-dropdown-item>查看</el-dropdown-item>-->
                            <!--<el-dropdown-item>新增</el-dropdown-item>-->
                            <!--<el-dropdown-item>删除</el-dropdown-item>-->
                        <!--</el-dropdown-menu>-->
                    <!--</el-dropdown>-->
                    <!--<span>王小虎</span>-->
                <!--</el-header>-->

                <el-main>
                    <!--此处的router-view是为了在浏览器访问页面地址时，展示页面的真正信息-->
                    <router-view></router-view>
                    <!--<el-table :data="tableData">-->
                    <!--<el-table-column prop="date" label="日期" width="140">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="name" label="姓名" width="120">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="address" label="地址">-->
                    <!--</el-table-column>-->
                    <!--</el-table>-->
                </el-main>
            </el-container>
        </el-container>
    </el-container>
    <!--</div>-->
</template>1234

<style>
    body {
        /*background-color: #ff0000;*/
    }
</style>

<script>
    export default {
        // data() {
        //     return {msg: '这个是Home模板页'}
        // }
    }
</script>
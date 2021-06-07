<template>
    <div>
        <h3>用户列表！！！</h3>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/welcome">权限管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表主体-->
        <el-card>
            <!--Layout布局。对于栅格布局，分栏之间存在间隔，设置分栏与分栏之间的间隔距离，需要在 el-row 组件添加一个 gutter 的配置，表示栅格间隔-->
            <el-row :gutter="25">
                <!--搜索区域-->
                <!--搜索添加-->
                <!--Layout布局的主要目标是支持24分栏，即一行能被切成24份，那么对于每一个el-col，我们想要知道它的占比，只需要指定它在24份中分配的份数即可。span 属性指定栅格占据的列数-->
                <el-col :span="10">
                <!--placeholder 输入框占位文本，该属性提供可描述输入字段预期值的提示信息(hint)。v-model属性是绑定值。clearable 是否可清空，默认是可以，但是清空的标志只有在输入框中输入信息后才显示-->
                <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList">
                    <!--输入框slot。append 输入框后置内容，只对 type="text" 有效，即将图标放在输入框后面-->
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
                </el-col>
                <!--添加按钮-->
                <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>

            <!--用户列表。border 边框。stripe 隔行变色。-->
            <!--stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。-->
            <el-table :data="userList" border stripe style="width: 100%">   <!-- :data="用于存放请求数据回来的数组，是对象数组" -->
                <el-table-column type="index" label="排序"></el-table-column>    <!-- 索引列 -->
                <el-table-column label="用户名" prop="username"></el-table-column>  <!-- prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名 -->
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态" prop="state">
                    <!--数据库中状态值是数值类型，而页面是true或false，直接使用prop="state"不会直接使状态值显示出来，需要借助作用域插槽-->
                    <template slot-scope="scope">   <!--  slot-scope="scope" 这里取到当前单元格。slot-scope 作用域插槽，scope.row存储了当前行的信息 -->
                          <!--<span>{{scope.row}}</span>   &lt;!&ndash; scope.row 直接取到该单元格对象。  &ndash;&gt;-->
                          <!--<span>{{scope.row.state}}</span>   &lt;!&ndash; scope.row.xxx 直接取到该单元格对象某个属性的值  &ndash;&gt;-->
                          <!--<span>{{scope.$index}}</span>   &lt;!&ndash; scope.$index 直接取到该单元格索引值  &ndash;&gt;-->
                          <!--change是vue组件switch开关在switch状态发生变化时的回调函数，回调参数返回了新状态的值。根据后台传值动态显示开关（0为关，1为开），对开关进行操作时请求后台，需要传两个参数：ID，State-->
                        <el-switch @change="userStateChanged(scope.row)" v-model="scope.row.state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">   <!--自定义插槽-->
                    <template slot-scope="scope">
                    <!--修改-->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    <!--删除-->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteuser(scope.row.id)"></el-button>
                    <!--权限-->
                    <!--effect 主题背景颜色，content文字提示内容，placement显示位置，enterable鼠标是否可进入到 tooltip 中-->
                    <el-tooltip effect="dark" content="分配权限" placement="top-start" :enterable="false">
                    <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                    </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页组件。
                @size-change="handleSizeChange"   size-change事件来处理页码大小变动时候触发的事件。
                @current-change="handleCurrentChange"    current-change事件来处理当前页变动时候触发的事件。
                :current-page.sync="currentPage2"         当前页数
                :page-sizes="[100, 200, 300, 400]"       page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项，[100, 200, 300, 400]表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。
                :page-size="100"                         每页显示条目个数，应该是每页显示个数的默认选项
                layout="total, sizes, prev, pager, next, jumper"        设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。prev表示上一页，next为下一页，pager表示页码列表，除此以外还提供了jumper和total，size和特殊的布局符号->，->后的元素会靠右显示，jumper表示跳页元素，total表示总条目数，size用于设置每页显示的页码数量。
                :total="1000"  total表示显示页码总数  -->
            <div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 100]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!--新增用户区域。title是Dialog 的标题，也可通过具名slot传入。visible决定是否显示 Dialog，支持.sync修饰符。width是Dialog的宽度。@close是Dialog 关闭的回调。center决定是否对头部和底部采用居中布局。-->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed" center>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <!--用户名-->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <!--邮箱-->
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button style="margin-left: 100px; margin-right: 110px" type="primary" @click="addUser"><span v-html="'确 定'"></span></el-button>
                    <el-button type="info" @click="addDialogVisible=false"><span v-html="'取 消'"></span></el-button>
                </el-form-item>
            </el-form>
            <!--内容底部区域-->
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="addDialogVisible=false">取 消</el-button>-->
                <!--<el-button type="primary" @click="addUser" style="margin-left:50px;">确 定</el-button>-->
            <!--</span>-->
        </el-dialog>

        <!--修改用户对话框-->
        <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed" center>
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <!--用户名-->
                <el-form-item label="用户名" prop="username">
                    <!--用户姓名只能显示，但是不能修改，用disabled属性即可-->
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <!--邮箱-->
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <!--内容底部区域-->
            <!--<span slot="footer" class="dialog-footer">-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>


<script>
    export default {
        data() {
            return{
                //  查询信息实体
                queryInfo:{
                    query: "",    //  查询信息，即用户姓名username
                    pageNum: 1 ,     //  当前页
                    pageSize: 5   //  每页最大数
                },
                userList:[],   //  用户列表
                total: 0,     // 总记录数
                addDialogVisible: false,  //  添加用户的对话框状态
                addForm:{
                    username: '',
                    password: '',
                    email: ''
                },
                //  修改用户信息表单对话框的显示/隐藏
                editDialogVisible: false,
                //  修改用户信息表单
                editForm:{
                    username: '',
                    password: '',
                    email: ''
                },
                //  添加用户表单验证
                addFormRules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ]
                },
                //  修改用户表单验证
                editFormRules:{
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.getUserList();
        },
        methods:{
            //  获取所有用户
            async getUserList(){
                const {data:res} = await this.$http.get("alluser",{params:this.queryInfo}) ;
                this.userList = res.data;  // 用户列表数据封装
                this.total = res.numbers;  // 总用户数封装
            },
            //  每页最大数，pageSize的触发动作，处理页码大小变动时候触发的事件
            handleSizeChange(newSize){
                this.queryInfo.pageSize = newSize ;
                this.getUserList() ; // 每页最大数发生变化时，需要重新请求数据
            },
            //  当前页，pageNum的触发动作
            handleCurrentChange(newPage){
                this.queryInfo.pageNum = newPage ;
                this.getUserList() ;    // 当前页发生变化时，需要重新请求数据
            },
            //  修改用户状态
            async userStateChanged(userInfo){
                //  直接使用下面的语句是不可以的，因为不能解析${userInfo.id} 和 ${userInfo.state}的内容
                // const {data:res} = await this.$http.put("updateuserstate?id=${userInfo.id}&state=${userInfo.state}");
                let id = userInfo.id ;
                let state = userInfo.state ;
                const {data:res} = await this.$http.put("updateuserstate?id="+id+"&state="+state);
                if (res!="success"){
                    userInfo.id != userInfo.id ;    // 如果失败，不能让用户的id和修改之后的用户id保持一致，应为修改后的值是错误的
                    return this.$message.error("操作失败！！！")
                }
                this.$message.success("操作成功！！！")
            },
            //  监听添加用户
            addDialogClosed(){
                //  需要在关闭对话框时重置弹框内的表单，否则下次弹出弹框时输入项不是初始状态
                this.$refs.addFormRef.resetFields();
            },
            //  添加用户
            addUser(){
                this.$refs.addFormRef.validate(async valid=>{
                    if (!valid) return ;
                    const {data:res} = await this.$http.post("adduser",this.addForm) ;
                    if (res!= "success"){
                        return this.$message.error("添加用户失败！！！")
                    }
                    this.$message.success("添加用户成功！！！");
                    this.addDialogVisible = false ;
                    this.getUserList() ;
                });
            },
            //  根据主键删除用户
            async deleteuser(id){
                const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    type: 'warning'
                }).catch(err => err) ;
                if (confirmResult!='confirm'){
                    return this.$message.info("已取消删除") ;
                }
                const {data:res} = await this.$http.delete("deleteuser?id="+id) ;
                if (res!= "success"){
                    return this.$message.error("删除失败！！！")
                }
                this.$message.success("删除成功！！！");
                this.getUserList() ;
            },
            //  显示对话框
            async showEditDialog(id){
                const {data:res} = await this.$http.get("getupdateuser?id="+id) ;
                this.editForm = res ; //  查询出用户信息反填回编辑表单
                console.log("res 是  "+res.state) ;  //  会返回用户所有信息，但是只会把对应的字段信息分别赋值，其余的字段舍掉
                this.editDialogVisible = true ;  //  开启编辑对话框
            },
            //  关闭窗口
            editDialogClosed(){
                this.$refs.editFormRef.resetFields();
            },
            //  确认修改
            editUserInfo(){
                this.$refs.editFormRef.validate(async valid=>{
                    if (!valid) return ;
                    const {data:res} = await this.$http.put("edituser",this.editForm) ;
                    if (res!= "success"){
                        return this.$message.error("修改失败！！！")
                    }
                    this.$message.success("修改成功！！！");
                    this.editDialogVisible = false ;
                    this.getUserList() ;
                });
            }
        }
    }
</script>


<style lang="less" scoped>
    /*  面包屑样式*/
    .el-breadcrumb{
        margin-bottom: 15px;           /* 该项生效 */
        font-size: 12px;           /* 该项不生效 */
        /*        color: red;            该项不生效 */
        /*        padding: 30px;            该项生效 */
        /*        border: 3px solid blue;            该项生效 */
    }
</style>

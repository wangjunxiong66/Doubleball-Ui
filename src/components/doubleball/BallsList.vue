<template>
    <div class="ball-list">
        <div class="ball-list-title">
            <h3>双色球往期数据列表</h3>
        </div>
        <!--双色球列表主体-->
        <el-card>
            <!--Layout布局。对于栅格布局，分栏之间存在间隔，设置分栏与分栏之间的间隔距离，需要在 el-row 组件添加一个 gutter 的配置，表示栅格间隔-->
            <el-row :gutter="45">
                <!--搜索区域-->
                <!--搜索添加-->
                <!--Layout布局的主要目标是支持24分栏，即一行能被切成24份，那么对于每一个el-col，我们想要知道它的占比，只需要指定它在24份中分配的份数即可。span 属性指定栅格占据的列数-->
                <el-col :span="10">
                    <!--placeholder 输入框占位文本，该属性提供可描述输入字段预期值的提示信息(hint)。v-model属性是绑定值。clearable 是否可清空，默认是可以，但是清空的标志只有在输入框中输入信息后才显示-->
                    <el-input placeholder="请输入要搜索的期号" v-model="queryInfo.query" clearable @clear="getBallsList">
                        <!--输入框slot。append 输入框后置内容，只对 type="text" 有效，即将图标放在输入框后面-->
                        <el-button slot="append" icon="el-icon-search" @click="getBallsList"></el-button>
                    </el-input>
                </el-col>
                <!--添加按钮-->
                <el-col :span="3">
                    <el-button type="primary" @click="addDialogVisible=true">添加双色球记录</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getRandomBall">机选双色球记录</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="calculateBall">统计双色球记录</el-button>
                </el-col>
            </el-row>

            <!--双色球记录列表。border 边框。stripe 隔行变色。-->
            <!--stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。-->
            <el-table :data="ballList" border stripe style="width: 100%">   <!-- :data="用于存放请求数据回来的数组，是对象数组" -->
                <!--<el-table-column type="index" label="排序"></el-table-column>    &lt;!&ndash; 索引列 &ndash;&gt;-->
                <el-table-column label="序号" prop="id" width="90" align="center"></el-table-column>
                <el-table-column label="期号" prop="issue" width="90" align="center"></el-table-column>
                <el-table-column label="红球一" prop="red_one" width="90" align="center"></el-table-column>
                <el-table-column label="红球二" prop="red_two" width="90" align="center"></el-table-column>
                <el-table-column label="红球三" prop="red_three" width="90" align="center"></el-table-column>
                <el-table-column label="红球四" prop="red_four" width="90" align="center"></el-table-column>
                <el-table-column label="红球五" prop="red_five" width="90" align="center"></el-table-column>
                <el-table-column label="红球六" prop="red_six" width="90" align="center"></el-table-column>
                <el-table-column label="蓝球" prop="blue" width="90" align="center"></el-table-column>
                <el-table-column label="开奖日期" prop="draw_prize_date" width="130" align="center"></el-table-column>
                <el-table-column label="操作" align="center">   <!--自定义插槽-->
                    <template slot-scope="scope">
                        <!--修改-->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!--删除-->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteball(scope.row.id)"></el-button>
                        <!--  slot-scope="scope" 这里取到当前单元格。slot-scope 作用域插槽，scope.row存储了当前行的信息 -->
                        <!--<span>{{scope.row}}</span>   &lt;!&ndash; scope.row 直接取到该单元格对象。  &ndash;&gt;-->
                        <!--<span>{{scope.row.state}}</span>   &lt;!&ndash; scope.row.xxx 直接取到该单元格对象某个属性的值  &ndash;&gt;-->
                        <!--<span>{{scope.$index}}</span>   &lt;!&ndash; scope.$index 直接取到该单元格索引值  &ndash;&gt;-->
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
            <div style="margin-top: 20px">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryInfo.pageNum"
                        :page-sizes="[5, 10, 20, 50, 100]"
                        :page-size="queryInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!--新增双色球区域。title是Dialog 的标题，也可通过具名slot传入。visible决定是否显示 Dialog，支持.sync修饰符。width是Dialog的宽度。@close是Dialog 关闭的回调。center决定是否对头部和底部采用居中布局。-->
        <el-dialog title="添加双色球记录" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed" center>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="期号" prop="issue">
                    <el-input v-model="addForm.issue" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球一" prop="red_one">
                    <el-input v-model="addForm.red_one" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球二" prop="red_two">
                    <el-input v-model="addForm.red_two" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球三" prop="red_three">
                    <el-input v-model="addForm.red_three" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球四" prop="red_four">
                    <el-input v-model="addForm.red_four" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球五" prop="red_five">
                    <el-input v-model="addForm.red_five" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球六" prop="red_six">
                    <el-input v-model="addForm.red_six" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="蓝球" prop="blue">
                    <el-input v-model="addForm.blue" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="开奖日期" prop="draw_prize_date">
                    <el-input v-model="addForm.draw_prize_date" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button style="margin-left: 100px; margin-right: 110px" type="primary" @click="addBall"><span v-html="'确 定'"></span></el-button>
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
        <el-dialog title="修改双色球记录" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed" center>
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="序号" prop="id">
                    <el-input v-model="editForm.id" style="width: 90%" disabled></el-input>
                </el-form-item>
                <!--  使用type="number"表示只能输入数字。在使用type="number"时，需要在前面的v-model加上".number"，变成v-model.number  -->
                <!--  type="number"后输入框右边会有上下箭头。使用type="number"后滚动鼠标的滚轮可以改变数值。要想去掉这个效果可以添加@mousewheel.native.prevent事件  -->
                <el-form-item label="期号" prop="issue">
                    <el-input v-model.number="editForm.issue" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球一" prop="red_one">
                    <el-input v-model.number="editForm.red_one" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球二" prop="red_two">
                    <el-input v-model.number="editForm.red_two" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球三" prop="red_three">
                    <el-input v-model.number="editForm.red_three" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球四" prop="red_four">
                    <el-input v-model.number="editForm.red_four" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球五" prop="red_five">
                    <el-input v-model.number="editForm.red_five" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="红球六" prop="red_six">
                    <el-input v-model.number="editForm.red_six" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="蓝球" prop="blue">
                    <el-input v-model.number="editForm.blue" type="number" @mousewheel.native.prevent style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="开奖日期" prop="draw_prize_date">
                    <el-input v-model="editForm.draw_prize_date" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button style="margin-left: 100px; margin-right: 110px" type="primary" @click="editBallInfo"><span v-html="'确 定'"></span></el-button>
                    <el-button type="info" @click="editDialogVisible=false"><span v-html="'取 消'"></span></el-button>
                </el-form-item>
            </el-form>
            <!--内容底部区域-->
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button type="primary" @click="editUserInfo" style="margin-right: 50px">确 定</el-button>-->
                <!--<el-button @click="editDialogVisible=false" style="margin-left: 50px">取 消</el-button>-->
            <!--</span>-->
        </el-dialog>


    </div>
</template>


<script>
    export default {
        data() {
            return{
                //  查询双色球记录
                queryInfo:{
                    query: "",    //  查询信息，即期号issue
                    pageNum: 1 ,     //  当前页
                    pageSize: 10   //  每页最大数
                },
                ballList:[],   //  双色球记录列表
                total: 0,     // 总记录数
                addDialogVisible: false,  //  添加双色球的对话框状态
                addForm:{
                    issue: '',
                    red_one: '',
                    red_two: '',
                    red_three: '',
                    red_four: '',
                    red_five: '',
                    red_six: '',
                    blue: '',
                    draw_prize_date: '',
                },
                //  修改用户信息表单对话框的显示/隐藏
                editDialogVisible: false,
                //  生成随机双色球记录
                randomBall: {
                    issue: '',
                    red_one: '',
                    red_two: '',
                    red_three: '',
                    red_four: '',
                    red_five: '',
                    red_six: '',
                    blue: '',
                    draw_prize_date: '',
                },
                //  修改用户信息表单
                editForm:{
                    // id: 1,
                    issue: 1,
                    red_one: 1,
                    red_two: 1,
                    red_three: 1,
                    red_four: 1,
                    red_five: 1,
                    red_six: 1,
                    blue: 1,
                    draw_prize_date: ''
                },
                //  添加用户表单验证
                addFormRules:{
                    issue: [
                        { required: true, message: '请输入期号', trigger: 'blur' },
                        { min: 1, max: 8, message: '长度在 1 到 8 个数字', trigger: 'blur' }
                    ],
                    red_one: [
                        { required: true, message: '请输入红球一数值', trigger: 'blur' },
                        { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' }
                    ],
                    red_two: [
                        { required: true, message: '请输入红球二数值', trigger: 'blur' },
                        { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' }
                    ],
                    red_three: [
                        { required: true, message: '请输入红球三数值', trigger: 'blur' },
                        { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' }
                    ],
                    red_four: [
                        { required: true, message: '请输入红球四数值', trigger: 'blur' },
                        { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' }
                    ],
                    red_five: [
                        { required: true, message: '请输入红球五数值', trigger: 'blur' },
                        { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' }
                    ],
                    red_six: [
                        { required: true, message: '请输入红球六数值', trigger: 'blur' },
                        { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' }
                    ],
                    blue: [
                        { required: true, message: '请输入蓝球数值', trigger: 'blur' },
                        { min: 1, max: 2, message: '数值范围是 1 - 16', trigger: 'blur' }
                    ],
                    draw_prize_date: [
                        { required: true, message: '请输入开奖日期', trigger: 'blur' },
                        { min: 10, max: 10, message: '格式为 YYYY-MM-DD', trigger: 'blur' }
                    ]
                },
                //  修改用户表单验证
                editFormRules:{
                    issue: [
                        { required: true, message: '请输入期号', trigger: 'blur' },
                        // { min: 1, max: 8, message: '长度在 1 到 8 个数字', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    red_one: [
                        { required: true, message: '请输入红球一数值', trigger: 'blur' },
                        // { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    red_two: [
                        { required: true, message: '请输入红球二数值', trigger: 'blur' },
                        // { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    red_three: [
                        { required: true, message: '请输入红球三数值', trigger: 'blur' },
                        // { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    red_four: [
                        { required: true, message: '请输入红球四数值', trigger: 'blur' },
                        // { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    red_five: [
                        { required: true, message: '请输入红球五数值', trigger: 'blur' },
                        // { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    red_six: [
                        { required: true, message: '请输入红球六数值', trigger: 'blur' },
                        // { min: 1, max: 2, message: '数值范围是 1 - 33', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    blue: [
                        { required: true, message: '请输入蓝球数值', trigger: 'blur' },
                        // { min: 1, max: 2, message: '数值范围是 1 - 16', trigger: 'blur' },
                        // { type:'number', message: '数量必须为数字值'}
                    ],
                    draw_prize_date: [
                        { required: true, message: '请输入开奖日期', trigger: 'blur' },
                        { min: 1, max: 10, message: '格式为 YYYY-MM-DD', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.getBallsList();

        },
        methods:{
            //  获取所有双色球记录
            async getBallsList(){
                const {data:res} = await this.$http.get("/ballapi/allball",{params:this.queryInfo}) ;
                console.log("res: "+res.data) ;
                this.ballList = res.data;  // 双色球列表数据封装
                console.log("ballList: "+this.ballList) ;
                this.total = res.numbers;  // 总双色球数封装
            },
            //  每页最大数，pageSize的触发动作，处理页码大小变动时候触发的事件
            handleSizeChange(newSize){
                this.queryInfo.pageSize = newSize ;
                this.getBallsList() ; // 每页最大数发生变化时，需要重新请求数据
            },
            //  当前页，pageNum的触发动作
            handleCurrentChange(newPage){
                this.queryInfo.pageNum = newPage ;
                this.getBallsList() ;    // 当前页发生变化时，需要重新请求数据
            },
            //  监听添加双色球记录
            addDialogClosed(){
                //  需要在关闭对话框时重置弹框内的表单，否则下次弹出弹框时输入项不是初始状态
                this.$refs.addFormRef.resetFields();
            },
            //  添加双色球记录
            addBall(){
                // this.$refs.addFormRef.validate(async valid=>{
                //     if (!valid) return ;
                //     const {data: res} = await this.$http.post("addball",this.addForm) ;
                //     {}
                //     console.log(res)
                //     if (res!= "success"){
                //         return this.$message.error("添加双色球记录失败！")
                //     }
                //     this.$message.success("添加双色球记录成功！");
                //     this.addDialogVisible = false ;3
                //     this.getBallsList() ;

                this.$refs.addFormRef.validate(valid=>{
                    if (valid) {
                        // 在需要显示的提示信息中，需要换行的地方分成数组 confirmText
                        const confirmText = ['此操作将添加如下双色球记录, 是否继续?',`红球：${this.addForm.red_one}  ${this.addForm.red_two}  ${this.addForm.red_three}  ${this.addForm.red_four}  ${this.addForm.red_five}  ${this.addForm.red_six}`,`蓝球：${this.addForm.blue}`,`期号：${this.addForm.issue}`,`开奖日期：${this.addForm.draw_prize_date}`]
                        const newDatas = []
                        //  Vue 提供了createElement 来创建虚拟dom，方便我们以函数化的方式来定义复杂的组件结构。createElement 最终是通过调用new VNode 来创建虚拟dom，函数在调用new VNode之前处理了很多限制的情况，比如：data不能是响应式数据，tag是否为空等等。
                        const h = this.$createElement
                        for (const i in confirmText) {
                            //  createElement 默认暴露给用户传递3个参数：{String | Object | Function}，三项为：一个 HTML 标签名、组件选项对象、async 函数
                            newDatas.push(h('p', null, confirmText[i]))
                        }
                        //  下面是弹出messagebox弹框
                        this.$confirm(
                            '提示',  //  此处的标题没有起作用
                            {
                                title: '提  示',      //  此处的标题起作用
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                message: h('div', null, newDatas),
                                type: 'warning',
                                center: true
                        }).then(async () => {
                            const {data:res} = await this.$http.post("/ballapi/addball",this.addForm) ;
                            if (res.code === 2) {
                                this.$message.error(res.data);
                            }
                            if (res.code === 0) {
                                //  下面两种形式都可以获取接口返回值信息
                                // this.$message.error(res.data);
                                this.$message.error(`${res.data}`);
                            }
                            if (res.code === 1) {
                                this.$message.success("添加双色球记录成功！");
                            }
                            this.addDialogVisible = false ;
                            this.getBallsList() ;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消添加！'
                            });
                        });
                    };




                });
            },
            //  根据主键删除用户
            async deleteball(id){
                const confirmResult = await this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    type: 'warning'
                }).catch(err => err) ;
                if (confirmResult!='confirm'){
                    return this.$message.info("已取消删除") ;
                }
                const {data:res} = await this.$http.delete("/ballapi/deleteball?id="+id) ;
                if (res.code === 0){
                    return this.$message.error("删除失败！！！")
                }
                if (res.code === 1){
                    this.$message.success("删除成功！！！");
                }
                this.getBallsList() ;
            },
            //  显示编辑双色球记录的对话框
            async showEditDialog(id){
                const {data:res} = await this.$http.get("/ballapi/getupdateball?id="+id) ;
                if (res.code !=1){
                    return this.$message.error("获取指定的双色球记录失败！");
                }
                this.editForm = res.data ; //  查询出双色球记录后反填回编辑表单。查询出双色球记录所有信息，但是只会把对应的字段信息分别赋值，其余的字段舍掉
                this.editDialogVisible = true ;  //  开启编辑对话框
            },
            //  关闭窗口
            editDialogClosed(){
                this.$refs.editFormRef.resetFields();
            },
            //  在编辑双色球记录的对话框中点击"确认"按钮修改双色球记录
            editBallInfo(){
                this.$refs.editFormRef.validate(async valid=>{
                    if (valid) {
                        // 在需要显示的提示信息中，需要换行的地方分成数组 confirmText
                        const confirmText = ['此操作将会修改为如下双色球记录, 是否继续?',`红球：${this.editForm.red_one}  ${this.editForm.red_two}  ${this.editForm.red_three}  ${this.editForm.red_four}  ${this.editForm.red_five}  ${this.editForm.red_six}`,`蓝球：${this.editForm.blue}`,`期号：${this.editForm.issue}`,`开奖日期：${this.editForm.draw_prize_date}`]
                        const newDatas = []
                        //  Vue 提供了createElement 来创建虚拟dom，方便我们以函数化的方式来定义复杂的组件结构。createElement 最终是通过调用new VNode 来创建虚拟dom，函数在调用new VNode之前处理了很多限制的情况，比如：data不能是响应式数据，tag是否为空等等。
                        const h = this.$createElement
                        for (const i in confirmText) {
                            //  createElement 默认暴露给用户传递3个参数：{String | Object | Function}，三项为：一个 HTML 标签名、组件选项对象、async 函数
                            newDatas.push(h('p', null, confirmText[i]))
                        }
                        //  下面是弹出messagebox弹框
                        this.$confirm(
                            '提示',  //  此处的标题没有起作用
                            {
                                title: '提  示',      //  此处的标题起作用
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                message: h('div', null, newDatas),
                                type: 'warning',
                                center: true
                            }).then(async () => {
                            const {data:res} = await this.$http.put("/ballapi/editball",this.editForm) ;
                            if (res.code === 1) {
                                this.$message.success("修改双色球记录成功！");
                            }
                            this.editDialogVisible = false ;
                            this.getBallsList() ;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改！'
                            });
                        });
                    };

                });
            },
            //  点击"机选双色球记录"按钮预测下一期双色球记录
            async getRandomBall(){
                // //  先把randomBall置空，否则在请求多次时会将数据一直累积
                // this.randomBall = []
                //  this.randomBall.push(resp.data) 意思是将对象resp.data  push进去，获得一个数组
                const {data:res} = await this.$http.get("/ballapi/getrandomball") ;
                this.randomBall = res.data
                // 在需要显示的提示信息中，需要换行的地方分成数组 confirmText
                const confirmText = ['下一期双色球记录可能是',`红球：${this.randomBall.red_one}  ${this.randomBall.red_two}  ${this.randomBall.red_three}  ${this.randomBall.red_four}  ${this.randomBall.red_five}  ${this.randomBall.red_six}`,`蓝球：${this.randomBall.blue}`]
                const newDatas = []
                //  Vue 提供了createElement 来创建虚拟dom，方便我们以函数化的方式来定义复杂的组件结构。createElement 最终是通过调用new VNode 来创建虚拟dom，函数在调用new VNode之前处理了很多限制的情况，比如：data不能是响应式数据，tag是否为空等等。
                const h = this.$createElement
                for (const i in confirmText) {
                    //  createElement 默认暴露给用户传递3个参数：{String | Object | Function}，三项为：一个 HTML 标签名、组件选项对象、async 函数
                    newDatas.push(h('p', null, confirmText[i]))
                }
                //  下面是弹出messagebox弹框
                this.$confirm(
                    '提示',  //  此处的标题没有起作用
                    {
                        title: '提  示',      //  此处的标题起作用
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        message: h('div', null, newDatas),
                        type: 'warning',
                        center: true
                    }).then(async () => {
                        this.$message.success("双色球记录生成完成！");
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '双色球记录生成完成！'
                    });
                });
            },
            //  统计双色球记录中各类球的统计数据
            async calculateBall(){
                const {data:res} = await this.$http.get("/ballapi/calculateBall") ;
                console.log("res.code   "+res.code)
                if ( res.code === 0){
                    this.$message({
                        type: 'warning',
                        message: res.data
                    });
                }
                if ( res.code === 1){
                    this.$message.success(res.data);
                }
                if ( res.code === 2){
                    this.$message.warning(res.data);
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    .ball-list>.ball-list-title{
        text-align: center;
        line-height: 0px;
        font-size: 20px;
    }
    /*表单输入项中需要验证只能输入数字时，有一种解决方法就是使用type="number"。写上type="number"后输入框右边会有上下箭头，影响视觉体验。可以使用下面方法去除。？？？下面的貌似没起作用？？？*/
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{
        -moz-appearance:textfield;
    }
</style>

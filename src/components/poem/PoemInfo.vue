<template>
    <div class="ball-list">
        <div class="ball-list-title">
            <h3>诗歌汇集列表</h3>
        </div>
        <!--诗歌列表主体-->
        <el-card>
            <!--查询参数部分-->
            <!--:inline="true" v-show="showSearch"   ？？？？？？？？-->
            <el-form :model="poemQueryInfo" ref="queryInfoRef" :inline="true" v-show="showSearch" label-width="75px" size="mini">
                <el-form-item label="诗歌名称" prop="title">
                    <el-input
                            v-model="poemQueryInfo.title"
                            placeholder="请输入诗歌名称"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item label="作者" prop="author">
                    <el-input
                            v-model="poemQueryInfo.author"
                            placeholder="请输入作者"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item label="朝代" prop="dynasty">
                    <el-input
                            v-model="poemQueryInfo.dynasty"
                            placeholder="请输入朝代"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item label="诗歌类别" prop="category">
                    <el-input
                            v-model="poemQueryInfo.category"
                            placeholder="请输入诗歌类别"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item label="诗歌内容" prop="content">
                    <el-input
                            v-model="poemQueryInfo.content"
                            placeholder="请输入诗歌内容"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item label="诗歌注释" prop="comment">
                    <el-input
                            v-model="poemQueryInfo.comment"
                            placeholder="请输入诗歌注释"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item label="创建时间" prop="create_time">
                    <el-input
                            v-model="poemQueryInfo.create_time"
                            placeholder="请输入创建时间"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item label="更新时间" prop="update_time">
                    <el-input
                            v-model="poemQueryInfo.update_time"
                            placeholder="请输入更新时间"
                            clearable
                            @keyup.enter.native="getPoemsList"
                    />
                </el-form-item>

                <el-form-item>
                    <el-button type="cyan" icon="el-icon-search" size="mini" @click="getPoemsList">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>

            <!--功能菜单部分-->
            <!--Layout布局。对于栅格布局，分栏之间存在间隔，设置分栏与分栏之间的间隔距离，需要在 el-row 组件添加一个 gutter 的配置，表示栅格间隔-->
            <el-row :gutter="45">
                <!--搜索区域-->
                <!--搜索添加-->
                <!--Layout布局的主要目标是支持24分栏，即一行能被切成24份，那么对于每一个el-col，我们想要知道它的占比，只需要指定它在24份中分配的份数即可。span 属性指定栅格占据的列数-->
                <!--<el-col :span="10">-->
                    <!--&lt;!&ndash;placeholder 输入框占位文本，该属性提供可描述输入字段预期值的提示信息(hint)。v-model属性是绑定值。clearable 是否可清空，默认是可以，但是清空的标志只有在输入框中输入信息后才显示&ndash;&gt;-->
                    <!--<el-input placeholder="请输入要搜索的诗歌内容" v-model="queryInfo.query" clearable @clear="getPoemsList">-->
                        <!--&lt;!&ndash;输入框slot。append 输入框后置内容，只对 type="text" 有效，即将图标放在输入框后面&ndash;&gt;-->
                        <!--<el-button slot="append" icon="el-icon-search" @click="getPoemsList"></el-button>-->
                    <!--</el-input>-->
                <!--</el-col>-->
                <!--添加按钮-->
                <el-col :span="3">
                    <el-button type="primary" @click="addDialogVisible=true">添加诗歌</el-button>
                </el-col>
            </el-row>

            <!--诗歌记录列表。border 边框。stripe 隔行变色。-->
            <!--stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。-->
            <el-table :data="poemList" border stripe style="width: 100%">   <!-- :data="用于存放请求数据回来的数组，是对象数组" -->
                <!--<el-table-column type="index" label="排序"></el-table-column>    &lt;!&ndash; 索引列 &ndash;&gt;-->
                <el-table-column label="序号" prop="id" width="60" align="center"></el-table-column>
                <el-table-column label="名称" prop="title" width="100" align="center"></el-table-column>
                <el-table-column label="作者" prop="author" width="100" align="center"></el-table-column>
                <el-table-column label="朝代" prop="dynasty" width="60" align="center"></el-table-column>
                <el-table-column label="诗歌类别" prop="category" width="100" align="center"></el-table-column>
                <el-table-column label="内容" width="180" align="center">
                    <!--回车换行符号"\r\n"替换为"<br/>"，<br/>是html的标签，表示文本另起一行。-->
                    <template slot-scope="scope">
                        <div v-html="scope.row.content.replace(/[\r\n]/g,'<br/>')"></div>
                    </template>
                </el-table-column>
                <el-table-column label="注释" prop="comment" width="180" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="create_time" width="90" align="center"></el-table-column>
                <el-table-column label="更新时间" prop="update_time" width="90" align="center"></el-table-column>
                <el-table-column label="操作"  align="center">   <!--自定义插槽-->
                    <template slot-scope="scope">
                        <!--修改-->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!--删除-->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletepoem(scope.row.id)"></el-button>
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
                        :current-page="poemQueryInfo.pageNum"
                        :page-sizes="[5, 10, 20, 50, 100]"
                        :page-size="poemQueryInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!--新增区域。title是Dialog 的标题，也可通过具名slot传入。visible决定是否显示 Dialog，支持.sync修饰符。width是Dialog的宽度。@close是Dialog 关闭的回调。center决定是否对头部和底部采用居中布局。-->
        <el-dialog title="添加诗歌" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed" center>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="名称" prop="title">
                    <el-input v-model="addForm.title" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="addForm.author" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="朝代" prop="dynasty">
                    <el-input v-model="addForm.dynasty" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="category">
                    <el-input v-model="addForm.category" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <!--<el-input v-model="addForm.content" style="width: 90%"></el-input>-->
                    <el-input  type="textarea" :rows="12" v-model="addForm.content" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="注释" prop="comment">
                    <!--<el-input v-model="addForm.comment" style="width: 90%"></el-input>-->
                    <el-input  type="textarea" :rows="12" v-model="addForm.comment" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button style="margin-left: 100px; margin-right: 110px" type="primary" @click="addPoem"><span v-html="'确 定'"></span></el-button>
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

        <!--修改对话框-->
        <el-dialog title="修改诗歌" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed" center>
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="序号" prop="id">
                <el-input v-model="editForm.id" style="width: 90%" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="title">
                    <el-input v-model="editForm.title" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="editForm.author" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="朝代" prop="dynasty">
                    <el-input v-model="editForm.dynasty" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="category">
                    <el-input v-model="editForm.category" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input  type="textarea" :rows="12" v-model="editForm.content" style="width: 90%"></el-input>
                    <!--<el-input v-model="editForm.content" style="width: 90%"></el-input>-->
                </el-form-item>
                <el-form-item label="注释" prop="comment">
                    <!--<el-input v-model="editForm.comment" style="width: 90%"></el-input>-->
                    <el-input  type="textarea" :rows="12" v-model="editForm.comment" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button style="margin-left: 100px; margin-right: 110px" type="primary" @click="editPoemInfo"><span v-html="'确 定'"></span></el-button>
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
                //  查询诗歌
                poemQueryInfo:{
                    title: null,       // 诗歌名称
                    author: null,       // 诗歌作者
                    dynasty: null,       // 诗人朝代
                    category: null,       // 诗歌类别
                    content: null,       // 诗歌内容
                    comment: null,       // 诗歌注释
                    create_time: null,    //  创建时间
                    update_time: null,    //  更新时间
                    pageNum: 1 ,     //  当前页
                    pageSize: 10   //  每页最大数
                },
                poemList:[],   //  双色球记录列表
                total: 0,     // 总记录数
                addDialogVisible: false,  //  添加诗歌的对话框状态
                // 显示搜索条件
                showSearch: true,
                addForm:{
                    title: '',
                    author: '',
                    dynasty: '',
                    category: '',
                    content: '',
                    comment: '',
                },
                //  修改用户信息表单对话框的显示/隐藏
                editDialogVisible: false,
                //  修改诗歌表单
                editForm:{
                    id: 1,
                    title: '',
                    author: '',
                    dynasty: '',
                    category: '',
                    content: '',
                    comment: '',
                },
                //  添加诗歌表单验证
                addFormRules:{
                    title: [
                        { required: true, message: '请输入诗歌名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '诗歌名称长度在 1 到 50 个字符之间', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入作者', trigger: 'blur' },
                        { min: 1, max: 200, message: '作者名称长度在 1 到 200 个字符之间', trigger: 'blur' }
                    ],
                    dynasty: [
                        { required: true, message: '请输入朝代', trigger: 'blur' },
                        { min: 1, max: 40, message: '朝代长度在 1 到 40 个字符之间', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '请输诗歌类别，例如唐诗、宋词、元曲', trigger: 'blur' },
                        { min: 1, max: 40, message: '诗歌类别长度在 1 到 40 个字符之间', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入诗歌内容', trigger: 'blur' },
                        { min: 1, max: 2000, message: '诗歌内容长度在 1 到 2000 个字符之间', trigger: 'blur' }
                    ],
                    comment: [
                        { required: true, message: '请输入诗歌注释', trigger: 'blur' },
                        { min: 1, max: 5000, message: '诗歌注释长度在 1 到 5000 个字符之间', trigger: 'blur' }
                    ]
                },
                //  修改诗歌表单验证
                editFormRules:{
                    title: [
                        { required: true, message: '请输入诗歌名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '诗歌名称长度在 1 到 50 个字符之间', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入作者', trigger: 'blur' },
                        { min: 1, max: 200, message: '作者名称长度在 1 到 200 个字符之间', trigger: 'blur' }
                    ],
                    dynasty: [
                        { required: true, message: '请输入朝代', trigger: 'blur' },
                        { min: 1, max: 40, message: '朝代长度在 1 到 40 个字符之间', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '请输诗歌类别，例如唐诗、宋词、元曲', trigger: 'blur' },
                        { min: 1, max: 40, message: '诗歌类别长度在 1 到 40 个字符之间', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入诗歌内容', trigger: 'blur' },
                        { min: 1, max: 2000, message: '诗歌内容长度在 1 到 2000 个字符之间', trigger: 'blur' }
                    ],
                    comment: [
                        { required: true, message: '请输入诗歌注释', trigger: 'blur' },
                        { min: 1, max: 5000, message: '诗歌注释长度在 1 到 5000 个字符之间', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.getPoemsList();

        },
        methods:{

            /** 重置按钮操作 */
            resetQuery() {
                // this.$refs[queryInfoRef].resetFields();
                this.$refs.queryInfoRef.resetFields();
                this.getPoemsList();
            },
            //  获取诗歌
            async getPoemsList(){
                const {data:res} = await this.$http.get("/poemapi/allpoem",{params:this.poemQueryInfo}) ;
                console.log("res: "+JSON.stringify(res.data)) ;
                this.poemList = res.data;  // 诗歌列表数据封装
                console.log("poemList: "+this.poemList) ;
                this.total = res.numbers;  // 总诗歌数封装
            },
            //  每页最大数，pageSize的触发动作，处理页码大小变动时候触发的事件
            handleSizeChange(newSize){
                this.poemQueryInfo.pageSize = newSize ;
                this.getPoemsList() ; // 每页最大数发生变化时，需要重新请求数据
            },
            //  当前页，pageNum的触发动作
            handleCurrentChange(newPage){
                this.poemQueryInfo.pageNum = newPage ;
                this.getPoemsList() ;    // 当前页发生变化时，需要重新请求数据
            },
            //  监听添加诗歌记录
            addDialogClosed(){
                //  需要在关闭对话框时重置弹框内的表单，否则下次弹出弹框时输入项不是初始状态
                this.$refs.addFormRef.resetFields();
            },
            //  添加诗歌
            addPoem(){
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
                //     this.getPoemsList() ;

                this.$refs.addFormRef.validate(valid=>{
                    if (valid) {
                        // // 在需要显示的提示信息中，需要换行的地方分成数组 confirmText
                        // const confirmText = ['此操作将添加如下双色球记录, 是否继续?',`红球：${this.addForm.red_one}  ${this.addForm.red_two}  ${this.addForm.red_three}  ${this.addForm.red_four}  ${this.addForm.red_five}  ${this.addForm.red_six}`,`蓝球：${this.addForm.blue}`,`期号：${this.addForm.issue}`,`开奖日期：${this.addForm.draw_prize_date}`]
                        // const newDatas = []
                        // //  Vue 提供了createElement 来创建虚拟dom，方便我们以函数化的方式来定义复杂的组件结构。createElement 最终是通过调用new VNode 来创建虚拟dom，函数在调用new VNode之前处理了很多限制的情况，比如：data不能是响应式数据，tag是否为空等等。
                        // const h = this.$createElement
                        // for (const i in confirmText) {
                        //     //  createElement 默认暴露给用户传递3个参数：{String | Object | Function}，三项为：一个 HTML 标签名、组件选项对象、async 函数
                        //     newDatas.push(h('p', null, confirmText[i]))
                        // }
                        //  下面是弹出messagebox弹框
                        this.$confirm(
                            '是否确定要添加此诗歌？',  //  此处的标题没有起作用
                            {
                                title: '提  示',      //  此处的标题起作用
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                // message: h('div', null, newDatas),
                                type: 'warning',
                                center: true
                            }).then(async () => {
                            const {data:res} = await this.$http.post("/poemapi/addpoem",this.addForm) ;
                            if (res.code === 1) {
                                //  下面两种形式都可以获取接口返回值信息
                                // this.$message.error(res.data);
                                // this.$message.error(`${res.data}`);
                                this.$message.success(`${res.data}`);
                            } else {
                                this.$message.error(res.data);
                            }
                            this.addDialogVisible = false ;
                            this.getPoemsList() ;
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
            async deletepoem(id){
                const confirmResult = await this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    type: 'warning'
                }).catch(err => err) ;
                if (confirmResult!='confirm'){
                    return this.$message.info("已取消删除") ;
                }
                const {data:res} = await this.$http.delete("/poemapi/deletepoem?id="+id) ;
                if (res.code === 0){
                    return this.$message.error("删除失败！！！")
                }
                if (res.code === 1){
                    this.$message.success("删除成功！！！");
                }
                this.getPoemsList() ;
            },
            //  显示编辑双色球记录的对话框
            async showEditDialog(id){
                const {data:res} = await this.$http.get("/poemapi/getupdatepoem?id="+id) ;
                if (res.code !=1){
                    return this.$message.error("获取指定的诗歌失败！");
                }
                this.editForm = res.data ; //  查询出诗歌后反填回编辑表单。查询出诗歌所有信息，但是只会把对应的字段信息分别赋值，其余的字段舍掉
                this.editDialogVisible = true ;  //  开启编辑对话框
            },
            //  关闭窗口
            editDialogClosed(){
                this.$refs.editFormRef.resetFields();
            },
            //  在编辑诗歌的对话框中点击"确认"按钮修改诗歌
            editPoemInfo(){
                this.$refs.editFormRef.validate(async valid=>{
                    if (valid) {
                        //  下面是弹出messagebox弹框
                        this.$confirm(
                            '确定要修改该诗歌吗？',
                            {
                                title: '提  示',      //  此处起标题作用
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                            }).then(async () => {
                            const {data:res} = await this.$http.put("/poemapi/editpoem",this.editForm) ;
                            if (res.code === 1) {
                                this.$message.success("修改诗歌成功！");
                            }
                            this.editDialogVisible = false ;
                            this.getPoemsList() ;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改！'
                            });
                        });
                    };

                });
            },
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

<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="序号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="issue"
                    label="期号"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="red_one"
                    label="红球一"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="red_two"
                    label="红球二"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="red_three"
                    label="红球三"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="red_four"
                    label="红球四"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="red_five"
                    label="红球五"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="red_six"
                    label="红球六"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="blue"
                    label="蓝球"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="draw_prize_date"
                    label="开奖日期"
                    width="160">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="260">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small" plain>修改</el-button>
                    <!--此处不能用delete，因为delete是关键字，点击后没有反应-->
                    <el-button @click="delete2(scope.row)" type="danger" size="small" plain>直接删除</el-button>
                    <el-button @click="delete3(scope.row)" type="warning" size="small" plain>确认删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        methods: {
            // 此处不能用delete，因为delete是关键字，点击后没有反应
            delete2(row) {
                const _this = this
                axios.delete('http://localhost:8181/douballapi/deleteballbyid/'+row.id).then(function (resp) {
                    if (resp.data.bean=='success'){
                        _this.$alert(row.issue+' 期删除成功', '消息提醒', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // 此处不能用_this.$router.push('RecordManage')设置跳转的路由，因为此处地址已经是"RecordManage"了要用下面的语句进行刷新
                                //  添加动态刷新语法，刷新后回到首页
                                window.location.reload()
                            }
                        });

                    } else {
                        _this.$alert(row.issue+' 期删除失败', '消息提醒', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // _this.$router.push()设置跳转的路由
                                // _this.$router.push('RecordManage')
                            }
                        });
                    }
                })
            },
            delete3(row){
                const _this = this
                this.$confirm('此操作将永久删记录 '+row.issue+' , 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((action) => {
                    if(action === 'confirm') {
                        axios.delete('http://localhost:8181/douballapi/deleteballbyid/' + row.id).then(function (resp) {
                            if (resp.data.bean == 'success') {
                                _this.$alert(row.issue + ' 期删除成功', '消息提醒', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // 此处不能用_this.$router.push('RecordManage')设置跳转的路由，因为此处地址已经是"RecordManage"了要用下面的语句进行刷新
                                        //  添加动态刷新语法，刷新后回到首页
                                        window.location.reload()
                                    }
                                })
                            } else {
                                _this.$alert(row.issue + ' 期删除失败', '消息提醒', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // _this.$router.push()设置跳转的路由
                                        // _this.$router.push('RecordManage')
                                    }
                                });
                            }
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            edit(row) {
                // console.log(row);
                // row.id
                // this.$router.push('/recordupdate') 这句话是点击修改按钮后直接跳转到recordupdate页面
                // 下面这句话是点击修改按钮后直接跳转到recordupdate页面，跳转时还带着row.id
                this.$router.push({
                    path: '/recordupdate',
                    query:{
                        id: row.id
                    }
                })
            },
            page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/douballapi/queryallballbypage/'+currentPage+'/10').then(function (resp) {
                    // console.log(resp)
                    _this.tableData = resp.data.bean.list
                    _this.total = resp.data.bean.count
                })
            },
        },
        data() {
            return {
                pageSize: 10,
                total: 0,
                tableData: null
            }
        },
        created(){
            // 调用方法page，直接选择第1页
            this.page(1)
    }
}
</script>


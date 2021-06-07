<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="red_one"
                    label="红球一">
            </el-table-column>
            <el-table-column
                    prop="red_two"
                    label="红球二">
            </el-table-column>
            <el-table-column
                    prop="red_three"
                    label="红球三">
            </el-table-column>
            <el-table-column
                    prop="red_four"
                    label="红球四">
            </el-table-column>
            <el-table-column
                    prop="red_five"
                    label="红球五">
            </el-table-column>
            <el-table-column
                    prop="red_six"
                    label="红球六">
            </el-table-column>
            <el-table-column
                    prop="blue"
                    label="蓝球">
            </el-table-column>
        </el-table>
        <p>
            <el-button class="el-button-style" @click="forecast" type="primary" round>点击预测</el-button>
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        methods: {
            forecast() {
                const _this = this
                axios.get('http://localhost:8181/douballapi/getrandomnum/').then(function (resp) {
                    //  先把tableData置空，否则在请求多次时会将数据一直累积
                    _this.tableData = []
                    //  _this.tableData.push(resp.data.bean) 意思是将对象resp.data.beanpush进去，获得一个数组
                    _this.tableData.push(resp.data.bean)
                })
            }
        },
        data() {
            return {
                tableData: []
            }
        },
        created(){
        }
    }
</script>

<style>
    .el-button {
        text-align:center;
    }
    .el-button-style {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
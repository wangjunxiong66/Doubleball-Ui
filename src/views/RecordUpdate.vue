<template>
    <el-form style="width: 600px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="序号">
            <!--添加 readOnly 预防id被修改-->
            <el-input v-model="ruleForm.id" readOnly></el-input>
        </el-form-item>
        <el-form-item label="期号" prop="issue">
            <el-input v-model="ruleForm.issue"></el-input>
        </el-form-item>
        <el-form-item label="红球一" prop="red_one">
            <el-input v-model="ruleForm.red_one"></el-input>
        </el-form-item>
        <el-form-item label="红球二" prop="red_two">
            <el-input v-model="ruleForm.red_two"></el-input>
        </el-form-item>
        <el-form-item label="红球三" prop="red_three">
            <el-input v-model="ruleForm.red_three"></el-input>
        </el-form-item>
        <el-form-item label="红球四" prop="red_four">
            <el-input v-model="ruleForm.red_four"></el-input>
        </el-form-item>
        <el-form-item label="红球五" prop="red_five">
            <el-input v-model="ruleForm.red_five"></el-input>
        </el-form-item>
        <el-form-item label="红球六" prop="red_six">
            <el-input v-model="ruleForm.red_six"></el-input>
        </el-form-item>
        <el-form-item label="蓝球" prop="blue">
            <el-input v-model="ruleForm.blue"></el-input>
        </el-form-item>
        <el-form-item label="开奖日期" prop="draw_prize_date">
            <el-input v-model="ruleForm.draw_prize_date"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>


<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                ruleForm: {
                    id: '',
                    issue: '',
                    red_one: '',
                    red_two: '',
                    red_three: '',
                    red_four: '',
                    red_five: '',
                    red_six: '',
                    blue: '',
                    draw_prize_date: ''
                },
                rules: {
                    id: [
                        { required: true, message: '请输入期号', trigger: 'blur' }
                    ],
                    issue: [
                        { required: true, message: '请输入期号', trigger: 'blur' }
                    ],
                    red_one: [
                        { required: true, message: '请输入红球一', trigger: 'blur' }
                    ],
                    red_two: [
                        { required: true, message: '请输入红球二', trigger: 'blur' }
                    ],
                    red_three: [
                        { required: true, message: '请输入红球三', trigger: 'blur' }
                    ],
                    red_four: [
                        { required: true, message: '请输入红球四', trigger: 'blur' }
                    ],
                    red_five: [
                        { required: true, message: '请输入红球五', trigger: 'blur' }
                    ],
                    red_six: [
                        { required: true, message: '请输入红球六', trigger: 'blur' }
                    ],
                    blue: [
                        { required: true, message: '请输入蓝球', trigger: 'blur' }
                    ],
                    draw_prize_date: [
                        { required: true, message: '请输入开奖日期', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('http://localhost:8181/douballapi/updateballbyid',this.ruleForm).then(function (resp) {
                            if (resp.data.bean=='success'){
                                _this.$alert(_this.ruleForm.issue+' 期修改成功', '消息提醒', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // _this.$router.push()设置跳转的路由
                                        _this.$router.push('RecordManage')
                                    }
                                });

                            } else {
                                _this.$alert(_this.ruleForm.issue+' 期修改失败', '消息提醒', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // _this.$router.push()设置跳转的路由
                                        // _this.$router.push('RecordManage')
                                    }
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // created(){
            //     const _this = this
            //     // alert(this.$route.query.id)
            //     axios.get('http://localhost:8181/douballapi/queryballbyid/'+this.$route.query.id).then(function (resp) {
            //         _this.ruleForm = resp.data.bean
            //     })
            // }

        },
        async created(){
            // 通过 this.$route.query.id 获取参数值，然后通过请求将数据传给this.ruleForm进行展示
            let resp = await axios.get('http://localhost:8181/douballapi/queryballbyid/'+this.$route.query.id)
            this.ruleForm = resp.data.bean
        },
        //渲染的图表的方法放在mounted()，因为mounted()在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
        mounted(){

        }
    }
</script>



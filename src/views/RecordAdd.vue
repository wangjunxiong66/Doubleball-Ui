<template>
    <el-form style="width: 600px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
                        axios.post('http://localhost:8181/douballapi/insertball',this.ruleForm).then(function (resp) {
                            console.log(resp)
                            if (resp.data=='success'){
                                // _this.$message('添加成功')
                                _this.$alert(_this.ruleForm.issue+' 期添加成功', '消息提醒', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // _this.$router.push()设置跳转的路由
                                        _this.$router.push('RecordManage')
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
            }
        }
    }
</script>
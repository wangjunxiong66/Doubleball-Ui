<template>
    <div class="tabs-div">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="selenium自动化测试相关" name="first">
                <div class="label_login_163_mail">
                    <label>登录163邮箱</label>
                </div>
                <div class="login_form" >
                    <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="login_form" label-width="150px">
                        <!-- 用户名。label 用于显示文案的标签，prop处是rules校验标签的名字-->
                        <el-form-item label="邮箱账号或手机号码" prop="account">
                            <!--<el-form-item>-->
                            <el-input v-model="loginForm.account" prefix-icon="iconfont icon-denglu1" style="width: 30%"></el-input>
                        </el-form-item>
                        <!-- 密码。label 用于显示文案的标签，prop处是rules校验标签的名字 -->
                        <!-- 此处不使用<el-form-item label="密码">，而是使用下面的方式，主要是为了让文案样式统一。slot 插槽相当于一个占位符，当没有内容传递过去的时候会显示插槽的内容，有内容时不会显示插槽的内容。此处名字必须使用"label"，因为要与<el-form-item label="">中的label保持一致，否则不会被覆盖-->
                        <el-form-item label="密 码" prop="password">
                            <!--<template slot="label"><span v-html="'密&nbsp;&nbsp;&nbsp;码'"></span></template>-->
                            <!-- 将密码输入框设置为 type="password"，是为了在前端显示中将密码输入框中数据显示为"******"-->
                            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima"  style="width: 30%"></el-input>
                        </el-form-item>
                        <!-- 按钮 -->
                        <el-form-item class="btns">
                            <!--<el-button type="primary">提交</el-button>-->
                            <el-button style="margin-right: 110px" type="primary" @click="login">
                                <!--<el-button :loading="loading" style="margin-right: 110px" type="primary" @click="login">-->
                                <!--<span v-html="'提&nbsp;&nbsp;&nbsp;&nbsp;交'"></span>-->
                                <span v-if="!loading"><span v-html="'提&nbsp;&nbsp;&nbsp;&nbsp;交'"></span></span>
                                <span v-else>提交中...</span>
                            </el-button>
                            <!--<el-button type="info">重置</el-button>-->
                            <el-button type="info" @click="resetLoginForm"><span v-html="'重&nbsp;&nbsp;&nbsp;&nbsp;置'"></span></el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="appium自动化测试相关" name="second">appium自动化测试相关</el-tab-pane>
            <el-tab-pane label="jmeter性能测试相关" name="third">jmeter性能测试相关</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "Automation",
        data(){
            return{
                // 表单数据对象
                loginForm:{
                    account:'',
                    password:''
                },
                // 验证对象
                loginRules:{
                    account:[
                        //  必须项校验
                        { required: true, message: '请输入邮箱账号或手机号码', trigger: 'blur' },
                        //  长度校验
                        // { min: 1, message: '长度过短', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入邮箱密码', trigger: 'blur' },
                        // { min: 1, message: '长度过短', trigger: 'blur' }
                    ],
                },
                //  登录状态的区分
                loading: false,
            }
        },
        methods:{
            //  重置表单内容
            resetLoginForm(){
                // 重置表单各项为初始值，方法为 resetFields()
                this.$refs.loginFormRef.resetFields();  // 也可以这样写  this.$refs['loginFormRef'].resetFields();
            },
            login(){
                //  1.验证校验规则
                //  validate中有一个回调函数，回调函数的参数valid是布尔值，表示表单是否验证通过，正确则返回true，否则返回false。
                this.$refs.loginFormRef.validate(async (valid) =>{
                    if (!valid) return ;
                    this.loading = false;  //  提交信息对的区分
                    this.$message.success("信息传入成功！");
                    const {data:res} = await this.$http.get("/selenium/mail/login",{params:this.loginForm})
                    if (res.flag=="ok"){
                        //  弹出提示信息
                        this.loading = false;
                    }else {
                        this.$message.error("信息传入失败！");
                        this.loading = false;
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    /*.tabs-div{*/
    /*.url_form{*/
    /*margin-bottom: 60px;*/
    /*margin-top: 15px;*/
    /*width: 80%;*/
    /*height: 30%;*/
    /*position: relative;*/
    /*}*/
    /*//???????   需要优化*/
    /*.qr_img{*/
    /*img{*/
    /*position: relative;*/
    /*left: 30%;*/
    /*top: 20%;*/
    /*width: 40%;*/
    /*height: 40%;*/
    /*transform: translate(- 50%, - 50%);  // 往左（x轴）、上（y轴）移动自身长宽的 50% ，以使其居于中心位置。*/
    /*}*/
    /*}*/
    /*}*/

    .label_login_163_mail{
        margin: 20px;
    }
    .login_form{
        margin: 20px;
    }
</style>


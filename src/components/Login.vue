<template>
    <div class="login_container">
        <!--登录块-->
        <div class="login_box">
            <!--头像-->
            <div class="avatar_box">
                <!--标签<img>定义图像，src是要显示的图像的URL，alt定义有关图像的短的描述(前端页面不显示)，height定义图像的高度，width设置图像的宽度，align规定如何根据周围的文本来对齐图像(top，bottom，middle，left，right)，ismap把图像定义为服务器端的图像映射，usemap定义作为客户端图像映射的一幅图像-->
                <img src="../assets/img/logo.png" alt="">
            </div>
            <!--表单区域-->
            <!--label-width设置表单域标签的宽度，作为Form直接子元素的form-item会继承该值。支持auto用于自适应标签的长度，例如 label-width="auto" 。如果给固定值，例如label-width="60px"，还可以设置label标签的对齐方式 label-position="left"，默认应该是label-position="right"。-->
            <!--ref 定义以后操作该表单的DOM元素所使用的名字。model是表单数据对象，主要是为了配合表单验证，也需要在返回数据处使用。-->
            <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="login_form" label-width="70px">
                <!-- 用户名。label 用于显示文案的标签，prop处是rules校验标签的名字-->
                <el-form-item label="用户名" prop="username">
                    <!--<el-form-item>-->
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-denglu1" style="width: 85%"></el-input>
                </el-form-item>
                <!-- 密码。label 用于显示文案的标签，prop处是rules校验标签的名字 -->
                <!-- 此处不使用<el-form-item label="密码">，而是使用下面的方式，主要是为了让文案样式统一。slot 插槽相当于一个占位符，当没有内容传递过去的时候会显示插槽的内容，有内容时不会显示插槽的内容。此处名字必须使用"label"，因为要与<el-form-item label="">中的label保持一致，否则不会被覆盖-->
                <el-form-item label="密 码" prop="password">
                    <!--<template slot="label"><span v-html="'密&nbsp;&nbsp;&nbsp;码'"></span></template>-->
                    <!-- 将密码输入框设置为 type="password"，是为了在前端显示中将密码输入框中数据显示为"******"-->
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password"  style="width: 85%"></el-input>
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
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // 表单数据对象
                loginForm:{
                    username:'admin',
                    password:'123456'
                },
                // 验证对象
                loginRules:{
                    username:[
                        //  必须项校验
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        //  长度校验
                        { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
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
                    this.loading = true;  //  登录状态对的区分
                    const {data:res} = await this.$http.post("login",this.loginForm)
                    if (res.flag=="ok"){
                        //  弹出提示信息
                        this.$message.success("登录成功！");
                        //  为session存储user用户信息
                        window.sessionStorage.setItem("user",res.user);
                        //  setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
                        //  此处需要设置延迟，待用户信息注入到session以后才能做跳转动作，否则路由导航守卫代码过早判断没有用户登录，还是会跳到"/login"
                        setTimeout(() => {
                            //  this.$router.push({path:"/home"})或者 this.$router.push("/home")用来在点击按钮时跳转到路径"/home"指定的vue模块
                            this.$router.push({path:"/home"});  //  页面路由跳转
                        }, 1000)
                    }else {
                        this.$message.error("登录失败，用户名或密码错误！");
                        this.loading = false;
                    }
                })
            }
        }
    }
</script>


<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 450px;
        /*width: 450px;   //  宽度*/
        /*height: 300px;  // 为什么改变的只是背景的高度？？？？？？？X？？？*/
        height: 300px;
        /*background-color: #fff;   // 背景颜色*/
        background-color: #669900;
        /*border-radius: 13px;  //  添加边框的圆角*/
        border-radius: 13px;
        /*position: absolute;   //  位置*/
        position: absolute;
        /*left: 50%;   //  login_box左边缘距离login_container左边缘为login_container宽度的一半*/
        /*top: 50%;   //  login_box上边缘距离login_container上边缘为login_container高度的一半*/
        /*transform: translate(-50%,-50%) ;  //  往左（x轴）、上（y轴）移动自身长宽的 50%，以使其居于中心位置。*/
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .login_box>.avatar_box{
        width: 130px;
        height: 130px;
        background-color: #0ee;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        /*box-shadow 属性向框添加一个或多个下拉阴影。  box-shadow: h-shadow v-shadow blur spread color inset  水平阴影的位置，垂直阴影的位置，模糊的程度，阴影的尺寸，阴影的颜色*/
        box-shadow: 0 0 20px 5px pink;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .login_box>.avatar_box>img{
        width: 100%;
        height: 100%;
        background-color: #eee;
        border-radius: 50%;
    }
    .btns{
        /*布局方式设置为弹性盒flex*/
        display: flex;
        /*justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。*/
        justify-content: flex-start;
    }
    .login_form{
        position: absolute;
        bottom: 0%;
        width: 100%;
        padding: 0 10px;
        /*box-sizing属性允许你以“W3C的盒模型”或“IE盒模型”来定义元素，以适应区域，即当前元素使用哪种盒模型，可以由box-sizing属性来指定。
        它有两个值：
        ●  content-box (标准)
          padding和border不被包含在width和height内，元素的实际大小为宽高+border +padding,此为标准模式下的盒模型。
        ●  border-box (怪异)
          padding和border被包含在定义的width和height中，元素实际的大小为你定义了多宽就是多宽。此属性为怪异模式下的盒模型。*/
        box-sizing: border-box;
    }
</style>


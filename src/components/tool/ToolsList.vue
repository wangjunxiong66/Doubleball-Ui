<template>
    <div class="tabs-div">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="二维码" name="first">
                <div class="url_form" >
                    <el-form ref="urlformref" :model="urlform" :rules="urlRules" class="url_form" label-width="120px">
                        <el-form-item label="需转换的URL" prop="url">
                            <el-input size="small"  placeholder="请在此处输入需要转换的URL地址" v-model="urlform.url" clearable>   <!--placeholder	输入框占位文本。clearable 是否可清空，默认是可以-->
                                <el-button slot="append" icon="el-icon-search" @click="getqrcode()"></el-button>  <!--append 输入框后置内容，只对 type="text" 有效-->
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="qr_img">
                    <!--<img :src="$imgPrefix(images/QRCode.png')"/>-->
                    <img :src=qrimg />
                </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'first',
                urlform: {
                    url: null,
                },
                qrimg: 'http://localhost:9000/images/yinhexi.png',
                urlRules:{
                    //  校验是否为空
                    url:[
                        { required: true, message: 'URL为必填项', trigger: 'blur' },
                    ]
                }
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            async getqrcode(){

                this.$refs.urlformref.validate(async valid=>{
                    if (!valid) return ;
                    // const {data:res} = await this.$http.get("generateqrcode?timestamp="+Date.parse(new Date()),{params:this.urlform}) ;
                    const {data:res} = await this.$http.get("generateqrcode",{params:this.urlform}) ;
                    console.log("res 是 "+res) ;
                    if (res !==null){
                        this.$message.success("生成并获取二维码成功 ！！！");  //  成功提示
                        //  setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
                        setTimeout(() => {
                            // this.qrimg = this.$imgPrefix('images/QRCode.png') + `?v=${Math.random()}`;
                            this.qrimg = res;
                        }, 500)
                    }else {
                        this.$message.error("生成、获取二维码失败 ！！！");  //  错误提示
                        setTimeout(() => {
                            this.qrimg = null ;
                        }, 500)
                    }
                });
            },
        },

        created(){
            this.qrimg = 'http://localhost:9000/images/yinhexi.png' ;
        }
    };
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
    .qr_img{
        margin: 5% ;
        img{
            position: relative;
            left: 25%;
            top: 20%;
            width: 50%;
            height: 50%;
            transform: translate(- 50%, - 50%);  // 往左（x轴）、上（y轴）移动自身长宽的 50% ，以使其居于中心位置。
            }
    }
    .url_form{
        /*margin-bottom: 60px;*/
        margin-top: 15px;
        width: 80%;
        height: 30%;
        position: relative;
    }
</style>


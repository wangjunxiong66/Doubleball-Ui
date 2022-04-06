<template>
    <div class="app-container">
        <div class="app-header">
            <h1>以下是导入商品上架Excel所必须填写的信息</h1>
        </div>
        <el-form :model="onshelvesParamsForm" ref="onshelvesParamsForm" :rules="onshelvesParamsRules" :inline="true" label-width="120px">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="公用信息" name="1">
                    <div class="search-item">
                        <div class="search-content">
                            <el-form-item label="店铺ID" prop="shopid">
                                <el-input
                                        v-model="onshelvesParamsForm.shopid"
                                        placeholder="请输入店铺ID"
                                        size="small"
                                        style="width: 50px"
                                        defaultVal="18"
                                />
                            </el-form-item>
                            <el-form-item label="规格类型" prop="spectype">
                                <el-input
                                        v-model="onshelvesParamsForm.spectype"
                                        placeholder="请输入规格类型"
                                        size="small"
                                        style="width: 150px"
                                        value="多规格"
                                />
                            </el-form-item>
                            <el-form-item label="上架用序号" prop="issue">
                                <el-input
                                        v-model="onshelvesParamsForm.issue"
                                        placeholder="上架用序号"
                                        size="small"
                                        style="width: 200px"
                                        value="20220402001"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="基础信息" name="2">
                    <div class="search-item">
                        <div class="search-content">
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="价格库存" name="3">
                    <div class="search-item">
                        <div class="search-content">
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="物流设置" name="4">
                    <div class="search-item">
                        <div class="search-content">
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="其他设置" name="5">
                    <div class="search-item">
                        <div class="search-content">
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="商品详情" name="6">
                    <div class="search-item">
                        <div class="search-content">
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="积分抵扣活动设置" name="7">
                    <div class="search-item">
                        <div class="search-content">
                            <el-form-item label="活动名称" prop="acitvityname">
                                <el-input
                                        v-model="onshelvesParamsForm.acitvityname"
                                        placeholder="请输入活动名称"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="活动渠道" prop="acitvitychannel">
                                <el-input
                                        v-model="onshelvesParamsForm.acitvitychannel"
                                        placeholder="请输入活动渠道"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="活动开始时间" prop="acitvitystarttime" >   <!-- label-width="200px"  -->
                                <el-date-picker
                                        v-model="onshelvesParamsForm.acitvitystarttime"
                                        type="datetime"
                                        size="small"
                                        style="width: 200px"
                                        placeholder="活动开始时间"
                                        value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="活动结束时间" prop="acitvityendtime" >     <!-- label-width="200px"  -->
                                <el-date-picker
                                        v-model="onshelvesParamsForm.acitvityendtime"
                                        type="datetime"
                                        size="small"
                                        style="width: 200px"
                                        placeholder="活动结束时间"
                                        value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="规则设置" name="8">
                    <div class="search-item">
                        <div class="search-content">
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <el-form-item>
                <!--<el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
                <!--<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
                <el-button type="cyan" icon="el-icon-search" size="mini">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // import * as Basic from "@/js/basic"
    import * as validate from "../../js/validate"
    export default {
        name: "WriteToExcel",
        data() {
            return {
                activeName: '1',       //  对应折叠组件el-collapse的v-model，因为是accordion手风琴模式，所以应该是String类型
                onshelvesParamsForm: {
                    shopid: "8",
                    spectype: "多规格类型",
                    issue: "20220402002",
                    acitvityname: "active-name",    //  活动名称
                    acitvitystarttime: "",    //  活动开始时间
                    acitvityendtime:  "",   //  活动结束时间
                    acitvitychannel: "H5",    //  活动渠道
                },
                onshelvesParamsRules: {
                    shopid: [
                        {required: true, message: '请输入店铺ID', trigger: 'blur'}
                    ],
                    spectype: [
                        {required: true, message: '请输入规格类型', trigger: 'blur'}
                    ],
                    issue: [
                        {required: true, message: '请输入上架用序号', trigger: 'blur'}
                    ],
                    acitvityname: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'}
                    ],
                    acitvitystarttime: [
                        {required: true, message: '请输入活动开始时间', trigger: 'blur'},
                        // {required: true, validator: validate.validateStartTime(), trigger: 'blur' }
                    ],
                    acitvityendtime: [
                        {required: true, message: '请输入活动结束时间', trigger: 'blur'},
                        // { required: true, validator: validate.validateEndTime(), trigger: 'blur' }
                    ],
                    acitvitychannel: [
                        {required: true, message: '请输入活动渠道', trigger: 'blur'}
                    ]
                },
            };
        },
        created() {
        },
        watch: {
        },
        methods: {
        }
    };
</script>

<style scoped>
    .app-container>.app-header{
        text-align: center;
        line-height: 0px;
        font-size: 20px;
    }

</style>

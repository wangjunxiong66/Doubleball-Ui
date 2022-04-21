<template>
    <div class="app-container">
        <div class="app-header">
            <h1>以下是导入商品上架Excel所必须填写的信息</h1>
        </div>
        <el-form :model="onsaleParamsForm" ref="onsaleParamsFormRef" :rules="onsaleParamsFormRules" :inline="true" label-width="120px">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="公用信息" name="1">
                    <div class="common-info">
                        <div class="common-content">
                            <el-form-item label="店铺ID" prop="shop_id">
                                <el-input
                                        v-model="onsaleParamsForm.shop_id"
                                        placeholder="请输入店铺ID"
                                        size="small"
                                        style="width: 50px"
                                />
                            </el-form-item>
                            <el-form-item label="规格类型" prop="spec_type">
                                <el-input
                                        v-model="onsaleParamsForm.spec_type"
                                        placeholder="请输入规格类型"
                                        size="small"
                                        style="width: 150px"
                                />
                            </el-form-item>
                            <el-form-item label="上架用序号" prop="issue">
                                <el-input
                                        v-model="onsaleParamsForm.issue"
                                        placeholder="上架用序号"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="基础信息" name="2">
                    <div class="basic-info">
                        <div class="basic-content">
                            <el-form-item label="商品类型" prop="product_type">
                                <el-input
                                        v-model="onsaleParamsForm.product_type"
                                        placeholder="请输入商品类型"
                                        size="small"
                                        style="width: 250px"
                                />
                            </el-form-item>
                            <el-form-item label="商品名称" prop="product_name">
                                <el-input
                                        v-model="onsaleParamsForm.product_name"
                                        placeholder="请输入商品名称"
                                        size="small"
                                        style="width: 250px"
                                />
                            </el-form-item>
                            <el-form-item label="副标题" prop="sub_product_name">
                                <el-input
                                        v-model="onsaleParamsForm.sub_product_name"
                                        placeholder="请输入副标题"
                                        size="small"
                                        style="width: 250px"
                                />
                            </el-form-item>
                            <el-form-item label="主图张数" prop="main_picture_num">
                                <el-input
                                        v-model="onsaleParamsForm.main_picture_num"
                                        placeholder="请输入商品主图张数"
                                        size="small"
                                        style="width: 250px"
                                />
                            </el-form-item>
                            <el-form-item label="轮播图张数" prop="carousel_figure_num">
                                <el-input
                                        v-model="onsaleParamsForm.carousel_figure_num"
                                        placeholder="请输入商品轮播图张数"
                                        size="small"
                                        style="width: 250px"
                                />
                            </el-form-item>
                            <el-form-item label="分类一级" prop="first_category_name">
                                <!--<el-input-->
                                        <!--v-model="onsaleParamsForm.first_category_name"-->
                                        <!--placeholder="请输入商品分类一级"-->
                                        <!--size="small"-->
                                        <!--style="width: 250px"-->
                                <!--/>-->
                                <el-select v-model="onsaleParamsForm.first_category_name"
                                           placeholder="请选择商品一级分类"
                                           clearable
                                           size="small"
                                           style="width: 250px"
                                           @change="firstCategoryChange"
                                >
                                    <el-option
                                            v-for="item in first_category_name_Options"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分类二级" prop="secondary_category_name">
                                <!--<el-input-->
                                        <!--v-model="onsaleParamsForm.secondary_category_name"-->
                                        <!--placeholder="请选择商品分类二级"-->
                                        <!--size="small"-->
                                        <!--style="width: 250px"-->
                                <!--/>-->
                                <el-select v-model="onsaleParamsForm.secondary_category_name"
                                           placeholder="请选择商品二级分类"
                                           clearable
                                           size="small"
                                           style="width: 250px">
                                    <el-option
                                            v-for="item in secondary_category_name_Options"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="短标题" prop="short_name">
                                <el-input
                                        v-model="onsaleParamsForm.short_name"
                                        placeholder="请输入商品短标题"
                                        size="small"
                                        style="width: 250px"
                                />
                            </el-form-item>
                            <el-form-item label="分组" prop="group">
                                <el-select v-model="onsaleParamsForm.group" placeholder="请选择分组"  multiple clearable > <!--multiple-->
                                    <el-option
                                            v-for="item in groupOptions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id" />
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="支持" prop="label">
                                <el-input
                                        v-model="onsaleParamsForm.label"
                                        placeholder="请输入商品支持"
                                        size="small"
                                        style="width: 250px"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="价格库存" name="3">
                    <div class="price-stock">
                        <div class="price-stock-content">
                            <el-form-item label="商品规格" prop="good_specification">
                                <el-input
                                        v-model="onsaleParamsForm.good_specification"
                                        placeholder="商品规格"
                                        size="small"
                                        style="width: 100px"
                                />
                            </el-form-item>
                            <el-form-item label="礼包内商品编码" prop="peck_gift_good_code" label-width="200px">
                                <el-input
                                        v-model="onsaleParamsForm.peck_gift_good_code"
                                        placeholder="礼包内商品编码"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="规格" prop="product_spec">
                                <el-input
                                        v-model="onsaleParamsForm.product_spec"
                                        placeholder="规格"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="子规格" prop="product_spec_item">
                                <el-input
                                        v-model="onsaleParamsForm.product_spec_item"
                                        placeholder="子规格"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="规格图张数" prop="spec_picture__num">
                                <el-input
                                        v-model="onsaleParamsForm.spec_picture__num"
                                        placeholder="规格图张数"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="售卖价格" prop="selling_price">
                                <el-input
                                        v-model="onsaleParamsForm.selling_price"
                                        placeholder="售卖价格"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="划线价" prop="original_price">
                                <el-input
                                        v-model="onsaleParamsForm.original_price"
                                        placeholder="划线价"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="成本价" prop="cost_price">
                                <el-input
                                        v-model="onsaleParamsForm.cost_price"
                                        placeholder="成本价"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="库存量" prop="stock">
                                <el-input
                                        v-model="onsaleParamsForm.stock"
                                        placeholder="库存量"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="库存预警" prop="stock_warning">
                                <el-input
                                        v-model="onsaleParamsForm.stock_warning"
                                        placeholder="库存预警"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="商品编码" prop="product_code">
                                <!--<el-input-->
                                        <!--v-model="onsaleParamsForm.product_code"-->
                                        <!--placeholder="商品编码"-->
                                        <!--size="small"-->
                                        <!--style="width: 200px"-->
                                <!--/>-->
                                <el-select v-model="onsaleParamsForm.product_code" placeholder="请选择商品编码" clearable>
                                    <el-option
                                            v-for="item in product_codeOptions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id" />
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品条形码" prop="product_sn">
                                <el-input
                                        v-model="onsaleParamsForm.product_sn"
                                        placeholder="商品条形码"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="商品详情显示库存" prop="stock_hide" label-width="160px">
                                <!--<el-input-->
                                        <!--v-model="onsaleParamsForm.stock_hide"-->
                                        <!--placeholder="商品详情显示库存"-->
                                        <!--size="small"-->
                                        <!--style="width: 200px"-->
                                <!--/>-->
                                <el-select
                                        v-model="onsaleParamsForm.stock_hide"
                                        placeholder="商品详情显示库存"
                                        size="small"
                                        style="width: 200px"
                                        clearable
                                >
                                    <el-option
                                            v-for="item in stock_hide_Options"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="已出售数" prop="virtual_sales">
                                <el-input
                                        v-model="onsaleParamsForm.virtual_sales"
                                        placeholder="已出售数"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="商品详情显示销量" prop="sales_hide" label-width="160px">
                                <el-input
                                        v-model="onsaleParamsForm.sales_hide"
                                        placeholder="商品详情显示销量"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="物流设置" name="4">
                    <div class="logistics">
                        <div class="logistics-content">
                            <el-form-item label="物流支持" prop="dispatch_mode">
                                <el-input
                                        v-model="onsaleParamsForm.dispatch_mode"
                                        placeholder="物流支持"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="快递运费" prop="express_price">
                                <el-input
                                        v-model="onsaleParamsForm.express_price"
                                        placeholder="快递运费"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="运费模板" prop="express_template">
                                <el-input
                                        v-model="onsaleParamsForm.express_template"
                                        placeholder="运费模板"
                                        size="small"
                                        style="width: 300px"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="其他设置" name="5">
                    <div class="others">
                        <div class="others-content">
                            <el-form-item label="定时下架" prop="auto_warehouse_time">
                                <el-date-picker
                                        v-model="onsaleParamsForm.auto_warehouse_time"
                                        type="datetime"
                                        placeholder="请选择商品定时下架时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        default-time="00:00:00">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="状态" prop="status">
                                <el-input
                                        v-model="onsaleParamsForm.status"
                                        placeholder="状态"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="开启限购" prop="is_buy_num_limit">
                                <el-input
                                        v-model="onsaleParamsForm.is_buy_num_limit"
                                        placeholder="开启限购"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="起购数量" prop="min_buy">
                                <el-input
                                        v-model="onsaleParamsForm.min_buy"
                                        placeholder="起购数量"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="每人限购数量" prop="max_buy_total">
                                <el-input
                                        v-model="onsaleParamsForm.max_buy_total"
                                        placeholder="每人限购数量"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="浏览权限" prop="browse_authority">
                                <el-input
                                        v-model="onsaleParamsForm.browse_authority"
                                        placeholder="浏览权限"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="购买权限" prop="buy_authority">
                                <el-input
                                        v-model="onsaleParamsForm.buy_authority"
                                        placeholder="购买权限"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="参与会员权益" prop="join_member_discount">
                                <el-input
                                        v-model="onsaleParamsForm.join_member_discount"
                                        placeholder="参与会员权益"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="商品详情" name="6">
                    <div class="goods-detail">
                        <div class="goods-detail-content">
                            <el-form-item label="推广图文件名" prop="promotion_diagram_name">
                                <el-input
                                        v-model="onsaleParamsForm.promotion_diagram_name"
                                        placeholder="推广图文件名"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="推广图链接" prop="promotion_diagram_link">
                                <el-input
                                        v-model="onsaleParamsForm.promotion_diagram_link"
                                        placeholder="推广图链接"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="推广图会员等级是否展示" prop="promotion_diagram_degree">
                                <el-input
                                        v-model="onsaleParamsForm.promotion_diagram_degree"
                                        placeholder="推广图会员等级是否展示"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="商品详情图张数" prop="detailed_diagram_num" label-width="250">
                                <el-input
                                        v-model="onsaleParamsForm.detailed_diagram_num"
                                        placeholder="商品详情图张数"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="授权图文件名" prop="authorize_diagram_name">
                                <el-input
                                        v-model="onsaleParamsForm.authorize_diagram_name"
                                        placeholder="授权图文件名"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="公用图文件名" prop="common_diagram_name">
                                <el-input
                                        v-model="onsaleParamsForm.common_diagram_name"
                                        placeholder="公用图文件名"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="积分抵扣活动设置" name="7">
                    <div class="credit-activity">
                        <div class="credit-activity-content1">
                            <el-form-item label="活动名称" prop="activity_name">
                                <el-input
                                        v-model="onsaleParamsForm.activity_name"
                                        placeholder="请输入活动名称"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="活动渠道" prop="activity_channel">
                                <el-input
                                        v-model="onsaleParamsForm.activity_channel"
                                        placeholder="请输入活动渠道"
                                        size="small"
                                        style="width: 100px"
                                />
                            </el-form-item>
                        </div>
                        <div class="credit-activity-content2">
                            <el-form-item label="活动开始时间" prop="activity_start_time">
                                <el-date-picker
                                        v-model="onsaleParamsForm.activity_start_time"
                                        type="datetime"
                                        placeholder="请选择活动开始时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        default-time="00:00:00">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="活动结束时间" prop="activity_end_time">
                                <el-date-picker
                                        v-model="onsaleParamsForm.activity_end_time"
                                        type="datetime"
                                        placeholder="请选择活动结束时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        default-time="23:59:59">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="规则设置" name="8">
                    <div class="rule-set">
                        <div class="rule-set-content">
                            <el-form-item label="规则1活动对象" prop="activity_object">
                                <el-input
                                        v-model="onsaleParamsForm.activity_object"
                                        placeholder="规则1活动对象"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="规则1会员等级" prop="member_degree">
                                <el-input
                                        v-model="onsaleParamsForm.member_degree"
                                        placeholder="规则1会员等级"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                        </div>
                        <div class="rule-set-content">
                            <el-form-item label="规则1最大积分抵扣" prop="credit" label-width="300">
                                <el-input
                                        v-model="onsaleParamsForm.credit"
                                        placeholder="规则1最大积分抵扣"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                            <el-form-item label="规则1允许多件累计抵扣" prop="allow_accumulate" label-width="300">
                                <el-input
                                        v-model="onsaleParamsForm.allow_accumulate"
                                        placeholder="规则1允许多件累计抵扣"
                                        size="small"
                                        style="width: 200px"
                                />
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <el-form-item>
                <!--<el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
                <!--<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="submitOnsaleParamsForm">提交</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetOnsaleParamsForm">重置</el-button>
            </el-form-item>
        </el-form>

        <div class="content-show">
            <div class="content-title">
                <h3>Excel文件内容</h3>
            </div>
            <el-card>
            <!--border 边框。stripe 隔行变色。-->
            <!--stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。-->
                <el-table :data="excelForm" border stripe style="width: 100%">   <!-- :data="用于存放请求数据回来的数组，是对象数组" -->
                <!--<el-table-column type="index" label="排序"></el-table-column>    &lt;!&ndash; 索引列 &ndash;&gt;-->
                    <el-table-column label="店铺ID" prop="shop_id" width="90" align="center"></el-table-column>
                    <el-table-column label="规格类型" prop="spec_type" width="90" align="center"></el-table-column>
                    <el-table-column label="上架用序号" prop="issue" width="90" align="center"></el-table-column>
                    <el-table-column label="商品类型" prop="product_type" width="90" align="center"></el-table-column>
                    <el-table-column label="商品名称" prop="product_name" width="90" align="center"></el-table-column>
                    <el-table-column label="商品副标题" prop="sub_product_name" width="90" align="center"></el-table-column>
                    <el-table-column label="商品主图张数" prop="main_picture_num" width="90" align="center"></el-table-column>
                    <el-table-column label="商品轮播图张数" prop="carousel_figure_num" width="90" align="center"></el-table-column>
                    <el-table-column label="分类一级" prop="first_category_name" width="90" align="center"></el-table-column>
                    <el-table-column label="分类二级" prop="secondary_category_name" width="130" align="center"></el-table-column>
                    <el-table-column label="商品短标题" prop="short_name" width="130" align="center"></el-table-column>
                    <el-table-column label="商品分组" prop="group" width="130" align="center"></el-table-column>
                    <el-table-column label="商品支持" prop="label" width="130" align="center"></el-table-column>
                    <el-table-column label="商品规格" prop="good_specification" width="130" align="center"></el-table-column>
                    <el-table-column label="礼包内商品编码" prop="peck_gift_good_code" width="130" align="center"></el-table-column>
                    <el-table-column label="规格" prop="product_spec" width="130" align="center"></el-table-column>
                    <el-table-column label="子规格" prop="product_spec_item" width="130" align="center"></el-table-column>
                    <el-table-column label="规格图张数" prop="spec_picture__num" width="130" align="center"></el-table-column>
                    <el-table-column label="售卖价格" prop="selling_price" width="130" align="center"></el-table-column>
                    <el-table-column label="划线价" prop="original_price" width="130" align="center"></el-table-column>
                    <el-table-column label="成本价" prop="cost_price" width="130" align="center"></el-table-column>
                    <el-table-column label="库存量" prop="stock" width="130" align="center"></el-table-column>
                    <el-table-column label="库存预警" prop="stock_warning" width="130" align="center"></el-table-column>
                    <el-table-column label="商品编码" prop="product_code" width="130" align="center"></el-table-column>
                    <el-table-column label="商品条形码" prop="product_sn" width="130" align="center"></el-table-column>
                    <el-table-column label="商品详情显示库存" prop="stock_hide" width="130" align="center"></el-table-column>
                    <el-table-column label="已出售数" prop="virtual_sales" width="130" align="center"></el-table-column>
                    <el-table-column label="商品详情显示销量" prop="sales_hide" width="130" align="center"></el-table-column>
                    <el-table-column label="物流支持" prop="dispatch_mode" width="130" align="center"></el-table-column>
                    <el-table-column label="快递运费" prop="express_price" width="130" align="center"></el-table-column>
                    <el-table-column label="运费模板" prop="express_template" width="130" align="center"></el-table-column>
                    <el-table-column label="定时下架" prop="auto_warehouse_time" width="130" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="130" align="center"></el-table-column>
                    <el-table-column label="开启限购" prop="is_buy_num_limit" width="130" align="center"></el-table-column>
                    <el-table-column label="起购数量" prop="min_buy" width="130" align="center"></el-table-column>
                    <el-table-column label="每人限购数量" prop="max_buy_total" width="130" align="center"></el-table-column>
                    <el-table-column label="浏览权限" prop="browse_authority" width="130" align="center"></el-table-column>
                    <el-table-column label="购买权限" prop="buy_authority" width="130" align="center"></el-table-column>
                    <el-table-column label="参与会员权益" prop="join_member_discount" width="130" align="center"></el-table-column>
                    <el-table-column label="推广图文件名" prop="promotion_diagram_name" width="130" align="center"></el-table-column>
                    <el-table-column label="推广图链接" prop="promotion_diagram_link" width="130" align="center"></el-table-column>
                    <el-table-column label="推广图会员等级是否展示" prop="promotion_diagram_degree" width="130" align="center"></el-table-column>
                    <el-table-column label="商品详情图张数" prop="detailed_diagram_num" width="130" align="center"></el-table-column>
                    <el-table-column label="授权图文件名" prop="authorize_diagram_name" width="130" align="center"></el-table-column>
                    <el-table-column label="公用图文件名" prop="common_diagram_name" width="130" align="center"></el-table-column>
                    <el-table-column label="活动名称" prop="activity_name" width="130" align="center"></el-table-column>
                    <el-table-column label="活动开始时间" prop="activity_start_time" width="130" align="center"></el-table-column>
                    <el-table-column label="活动结束时间" prop="activity_end_time" width="130" align="center"></el-table-column>
                    <el-table-column label="活动渠道" prop="activity_channel" width="130" align="center"></el-table-column>
                    <el-table-column label="规则1活动对象" prop="activity_object" width="130" align="center"></el-table-column>
                    <el-table-column label="规则1会员等级" prop="member_degree" width="130" align="center"></el-table-column>
                    <el-table-column label="规则1最大积分抵扣" prop="credit" width="130" align="center"></el-table-column>
                    <el-table-column label="规则1允许多件累计抵扣" prop="allow_accumulate" width="130" align="center"></el-table-column>
                </el-table>

            </el-card>

        </div>

    </div>

</template>

<script>
    // import * as Basic from "@/js/basic"
    import * as validate from "../../js/validate"
    import _ from 'lodash'
    export default {
        name: "WriteToExcel",
        data() {
            return {
                activeName: '1',       //  对应折叠组件el-collapse的v-model，因为是accordion手风琴模式，所以应该是String类型
                groupOptions: [],         //  存储商品分组
                product_codeOptions: [],     //  存储商品编码
                first_category_name_Options: [],       //  存储商品一级分类
                secondary_category_name_Options: [],       //  存储商品二级分类
                stock_hide_Options: [],       //  商品详情显示库存
                onsaleParamsForm: {
                    //  设置上架商品公用信息-----设置上架商品公用信息-----设置上架商品公用信息-----设置上架商品公用信息
                    shop_id: "8",                //  店铺ID
                    spec_type: "多规格类型",      //  规格类型
                    issue: "20220402002",         //  上架用序号
                    //  基础信息-----基础信息-----基础信息-----基础信息-----基础信息-----基础信息-----基础信息
                    product_type: "实体商品",     //  商品类型
                    product_name: "成声波人电动牙刷P7-多规格商品3个商品",      //  商品名称
                    sub_product_name: "成声波人电动牙刷P7",        //  商品副标题
                    main_picture_num: 1,        //  商品主图张数
                    carousel_figure_num: 2,     //  商品轮播图张数
                    first_category_name: null,          //  商品分类一级
                    secondary_category_name: null,     //  商品分类二级
                    short_name: "成声波人电动牙刷-多规格3个商品",         //  商品短标题
                    group: null,         //  商品分组   "小额消耗品"
                    label: "质量问题包赔",       //  商品支持
                    //  价格库存-----价格库存-----价格库存-----价格库存-----价格库存-----价格库存-----价格库存
                    good_specification: "多规格商品",        //  商品规格
                    peck_gift_good_code: "",        //  礼包内商品编码
                    product_spec: "颜色",        //  规格
                    product_spec_item: "红色",      //  子规格
                    spec_picture__num: "1",     //  规格图张数
                    selling_price: "250",           //  售卖价格
                    original_price: "260",      //  划线价
                    cost_price: "270",     //  成本价
                    stock: "10000",      //  库存量
                    stock_warning: "10",       //  库存预警
                    product_code: null,       //  商品编码
                    product_sn: "000200008901",        //  商品条形码
                    stock_hide: "显示",        //  商品详情显示库存，显示或隐藏
                    virtual_sales: "20",        //  已出售数
                    sales_hide: "隐藏",         //  商品详情显示销量，显示或隐藏
                    //  物流设置-----物流设置-----物流设置-----物流设置-----物流设置-----物流设置-----物流设置
                    dispatch_mode: "快递发货",       //  物流支持，快递发货、同城配送、上门自提
                    express_price: "运费模板/统一运费",        //  快递运费，“统一运费”或者“运费模板”
                    express_template: "全国一件包邮运费模板/统一运费价格",       //  运费模板，取自数据库
                    //  其他设置-----其他设置-----其他设置-----其他设置-----其他设置-----其他设置-----其他设置
                    auto_warehouse_time: "",         //  定时下架
                    status: "上架售卖",        //  状态，上架售卖、上架隐藏、定时上架、放置仓库
                    is_buy_num_limit: "是",      //  开启限购，是或否
                    min_buy: "3",        //  起购数量
                    max_buy_total: "100",       //  每人限购数量
                    browse_authority: "普通会员",         //  浏览权限
                    buy_authority: "会员",        //  购买权限
                    join_member_discount: "会员卡",       //  参与会员权益，会员卡、会员价、会员等级折扣
                    //  商品详情-----商品详情-----商品详情-----商品详情-----商品详情-----商品详情-----商品详情-----商品详情
                    promotion_diagram_name: "tgt1.png",       //  推广图文件名
                    promotion_diagram_link: "http://www.baidu.com",         //  推广图链接
                    promotion_diagram_degree: "全部会员",       //  推广图会员等级是否展示
                    detailed_diagram_num:  2,      //  商品详情图张数
                    authorize_diagram_name: "sqt1.jpg",        //  授权图文件名
                    common_diagram_name: "gyt1.png",         //  公用图文件名

                    //  积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置
                    activity_name: "活动名称",    //  活动名称
                    activity_start_time: "",          //  活动开始时间
                    activity_end_time: "",            //  活动结束时间
                    activity_channel: "H5",    //  活动渠道
                    //  规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置
                    activity_object: "会员等级",         //  规则1活动对象，全部会员、会员等级、会员标签
                    member_degree: "会员",        //  规则1会员等级
                    credit: "500",        //  规则1最大积分抵扣
                    allow_accumulate: "是",        //  规则1允许多件累计抵扣
                },
                onsaleParamsFormRules: {
                    shop_id: [
                        {required: true, message: '请输入店铺ID', trigger: 'blur'}
                    ],
                    spec_type: [
                        {required: true, message: '请输入规格类型', trigger: 'blur'}
                    ],
                    issue: [
                        {required: true, message: '请输入上架用序号', trigger: 'blur'}
                    ],
                    product_type: [
                        {required: true, message: '请输入商品类型', trigger: 'blur'}
                    ],
                    product_name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'}
                    ],
                    sub_product_name: [
                        {required: true, message: '请输入商品副标题', trigger: 'blur'}
                    ],
                    main_picture_num: [
                        {required: true, message: '请输入商品主图张数', trigger: 'blur'}
                    ],
                    carousel_figure_num: [
                        {required: true, message: '请输入商品轮播图张数', trigger: 'blur'}
                    ],
                    first_category_name: [
                        {required: true, message: '请输入商品分类一级', trigger: 'blur'}
                    ],
                    secondary_category_name: [
                        {required: true, message: '请输入商品分类二级', trigger: 'blur'}
                    ],
                    short_name: [
                        {required: true, message: '请输入商品短标题', trigger: 'blur'}
                    ],
                    group: [
                        {required: true, message: '请选择商品分组', trigger: 'blur'}
                    ],
                    label: [
                        {required: true, message: '请输入商品支持', trigger: 'blur'}
                    ],
                    good_specification: [
                        {required: true, message: '请输入商品规格', trigger: 'blur'}
                    ],
                    // peck_gift_good_code: [
                    //     {required: true, message: '请输入礼包内商品编码', trigger: 'blur'}
                    // ],
                    // product_spec: [
                    //     {required: true, message: '请输入规格', trigger: 'blur'}
                    // ],
                    // product_spec_item: [
                    //     {required: true, message: '请输入子规格', trigger: 'blur'}
                    // ],
                    spec_picture__num: [
                        {required: true, message: '请输入规格图张数', trigger: 'blur'}
                    ],
                    selling_price: [
                        {required: true, message: '请输入售卖价格', trigger: 'blur'}
                    ],
                    original_price: [
                        {required: true, message: '请输入划线价', trigger: 'blur'}
                    ],
                    cost_price: [
                        {required: true, message: '请输入成本价', trigger: 'blur'}
                    ],
                    stock: [
                        {required: true, message: '请输入库存量', trigger: 'blur'}
                    ],
                    stock_warning: [
                        {required: true, message: '请输入库存预警', trigger: 'blur'}
                    ],
                    product_code: [
                        {required: true, message: '请输入商品编码', trigger: 'blur'}
                    ],
                    product_sn: [
                        {required: true, message: '请输入商品条形码', trigger: 'blur'}
                    ],
                    stock_hide: [
                        {required: true, message: '请输入商品详情显示库存', trigger: 'blur'}
                    ],
                    virtual_sales: [
                        {required: true, message: '请输入已出售数', trigger: 'blur'}
                    ],
                    sales_hide: [
                        {required: true, message: '请输入商品详情显示销量', trigger: 'blur'}
                    ],
                    dispatch_mode: [
                        {required: true, message: '请输入快递发货', trigger: 'blur'}
                    ],
                    express_price: [
                        {required: true, message: '请输入运费模板/统一运费', trigger: 'blur'}
                    ],
                    express_template: [
                        {required: true, message: '请输入运费模板内容或者统一运费价格', trigger: 'blur'}
                    ],

                    auto_warehouse_time: [
                        {required: true, message: '请输入定时下架', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请输入状态', trigger: 'blur'}
                    ],
                    is_buy_num_limit: [
                        {required: true, message: '请输入开启限购', trigger: 'blur'}
                    ],
                    min_buy: [
                        {required: true, message: '请输入起购数量', trigger: 'blur'}
                    ],
                    max_buy_total: [
                        {required: true, message: '请输入每人限购数量', trigger: 'blur'}
                    ],
                    browse_authority: [
                        {required: true, message: '请输入浏览权限', trigger: 'blur'}
                    ],
                    buy_authority: [
                        {required: true, message: '请输入购买权限', trigger: 'blur'}
                    ],
                    join_member_discount: [
                        {required: true, message: '请输入参与会员权益', trigger: 'blur'}
                    ],
                    promotion_diagram_name: [
                        {required: true, message: '请输入推广图文件名', trigger: 'blur'}
                    ],
                    promotion_diagram_link: [
                        {required: true, message: '请输入推广图链接', trigger: 'blur'}
                    ],
                    promotion_diagram_degree: [
                        {required: true, message: '请输入推广图会员等级是否展示', trigger: 'blur'}
                    ],
                    detailed_diagram_num: [
                        {required: true, message: '请输入商品详情图张数', trigger: 'blur'}
                    ],
                    authorize_diagram_name: [
                        {required: true, message: '请输入授权图文件名', trigger: 'blur'}
                    ],
                    common_diagram_name: [
                        {required: true, message: '请输入公用图文件名', trigger: 'blur'}
                    ],
                    activity_name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'}
                    ],
                    activity_start_time: [
                        {required: true, message: '请选择活动开始时间', trigger: 'blur'},
                    ],
                    activity_end_time: [
                        {required: true, message: '请选择活动结束时间', trigger: 'blur'},
                    ],
                    activity_channel: [
                        {required: true, message: '请输入活动渠道', trigger: 'blur'}
                    ],
                    activity_object: [
                        {required: true, message: '请输入规则1活动对象', trigger: 'blur'}
                    ],
                    member_degree: [
                        {required: true, message: '请输入规则1会员等级', trigger: 'blur'}
                    ],
                    credit: [
                        {required: true, message: '请输入规则1最大积分抵扣', trigger: 'blur'}
                    ],
                    allow_accumulate: [
                        {required: true, message: '请输入规则1允许多件累计抵扣', trigger: 'blur'}
                    ]
                },
                onsaleParamsForm_bak: {
                    //  设置上架商品公用信息-----设置上架商品公用信息-----设置上架商品公用信息-----设置上架商品公用信息
                    shop_id: "8",                //  店铺ID
                    spec_type: "多规格类型",      //  规格类型
                    issue: "20220402002",         //  上架用序号
                    //  基础信息-----基础信息-----基础信息-----基础信息-----基础信息-----基础信息-----基础信息
                    product_type: "实体商品",     //  商品类型
                    product_name: "成声波人电动牙刷P7-多规格商品3个商品",      //  商品名称
                    sub_product_name: "成声波人电动牙刷P7",        //  商品副标题
                    main_picture_num: 1,        //  商品主图张数
                    carousel_figure_num: 2,     //  商品轮播图张数
                    first_category_name: null,          //  商品分类一级
                    secondary_category_name: null,     //  商品分类二级
                    short_name: "成声波人电动牙刷-多规格3个商品",         //  商品短标题
                    group: null,         //  商品分组   "小额消耗品"
                    label: "质量问题包赔",       //  商品支持
                    //  价格库存-----价格库存-----价格库存-----价格库存-----价格库存-----价格库存-----价格库存
                    good_specification: "多规格商品",        //  商品规格
                    peck_gift_good_code: "",        //  礼包内商品编码
                    product_spec: "颜色",        //  规格
                    product_spec_item: "红色",      //  子规格
                    spec_picture__num: "1",     //  规格图张数
                    selling_price: "250",           //  售卖价格
                    original_price: "260",      //  划线价
                    cost_price: "270",     //  成本价
                    stock: "10000",      //  库存量
                    stock_warning: "10",       //  库存预警
                    product_code: null,       //  商品编码
                    product_sn: "000200008901",        //  商品条形码
                    stock_hide: "显示",        //  商品详情显示库存，显示或隐藏
                    virtual_sales: "20",        //  已出售数
                    sales_hide: "隐藏",         //  商品详情显示销量，显示或隐藏
                    //  物流设置-----物流设置-----物流设置-----物流设置-----物流设置-----物流设置-----物流设置
                    dispatch_mode: "快递发货",       //  物流支持，快递发货、同城配送、上门自提
                    express_price: "运费模板/统一运费",        //  快递运费，“统一运费”或者“运费模板”
                    express_template: "全国一件包邮运费模板/统一运费价格",       //  运费模板，取自数据库
                    //  其他设置-----其他设置-----其他设置-----其他设置-----其他设置-----其他设置-----其他设置
                    auto_warehouse_time: "",         //  定时下架
                    status: "上架售卖",        //  状态，上架售卖、上架隐藏、定时上架、放置仓库
                    is_buy_num_limit: "是",      //  开启限购，是或否
                    min_buy: "3",        //  起购数量
                    max_buy_total: "100",       //  每人限购数量
                    browse_authority: "普通会员",         //  浏览权限
                    buy_authority: "会员",        //  购买权限
                    join_member_discount: "会员卡",       //  参与会员权益，会员卡、会员价、会员等级折扣
                    //  商品详情-----商品详情-----商品详情-----商品详情-----商品详情-----商品详情-----商品详情-----商品详情
                    promotion_diagram_name: "tgt1.png",       //  推广图文件名
                    promotion_diagram_link: "http://www.baidu.com",         //  推广图链接
                    promotion_diagram_degree: "全部会员",       //  推广图会员等级是否展示
                    detailed_diagram_num:  2,      //  商品详情图张数
                    authorize_diagram_name: "sqt1.jpg",        //  授权图文件名
                    common_diagram_name: "gyt1.png",         //  公用图文件名

                    //  积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置-----积分抵扣活动设置
                    activity_name: "活动名称",    //  活动名称
                    activity_start_time: "",          //  活动开始时间
                    activity_end_time: "",            //  活动结束时间
                    activity_channel: "H5",    //  活动渠道
                    //  规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置-----规则设置
                    activity_object: "会员等级",         //  规则1活动对象，全部会员、会员等级、会员标签
                    member_degree: "会员",        //  规则1会员等级
                    credit: "500",        //  规则1最大积分抵扣
                    allow_accumulate: "是",        //  规则1允许多件累计抵扣
                },
                excelForm: [],
            };
        },
        created() {

            this.getProductinfo() ;

        },
        watch: {
        },
        methods: {
            //  在进入导入商品上架Excel信息页面时加载一些基础信息
            async getProductinfo(){
                const {data:res} = await this.$http.get("/excelOP/loading") ;
                this.groupOptions = res.group ;
                this.product_codeOptions = res.product_code ;
                this.first_category_name_Options = res.first_category_name ;
                this.excelForm = res.excelForm ;

                //  设置默认时间
                let nowDate = new Date()
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate()
                }

                if (parseInt(date.date) < 10) {
                    date.date = '0' + date.date
                }
                this.onsaleParamsForm.auto_warehouse_time = date.year + '-' + date.month + '-' + date.date + ' 00:00:00'
                this.onsaleParamsForm.activity_start_time = date.year + '-' + date.month + '-' + date.date + ' 00:00:00'
                this.onsaleParamsForm.activity_end_time = date.year + '-' + date.month + '-' + date.date + ' 23:59:59'

                // 商品详情显示库存
                this.stock_hide_Options = [
                    { 'id': 0, 'name': '显示' },
                    { 'id': 1, 'name': '隐藏' },
                ]

            },
            //  查询1级分类change事件
            async firstCategoryChange(selValue){           // 此处selValue的值为所选择的分类对应的id
                this.onsaleParamsForm.secondary_category_name = null;
                this.secondary_category_name_Options = [];
                if (selValue != null && selValue != '') {
                    const {data:res} = await this.$http.get("/excelOP/getnextcategory?parent_id="+selValue) ;
                    this.secondary_category_name_Options = res.secondary_category_name ;
                }
            },
            //  重置表单内容
            resetOnsaleParamsForm(){
                // 重置表单各项为初始值，方法为 resetFields()
                this.$refs.onsaleParamsFormRef.resetFields();  // 也可以这样写  this.$refs['loginFormRef'].resetFields();
            },
            submitOnsaleParamsForm(){
                //  因为提交时group是按照字符串提交的，当分组group是多选时，需要将字符串转换成单个字符才能提交到接口
                let str = this.onsaleParamsForm.group.toString(",");
                console.log(str);
                this.onsaleParamsForm.group = str ;
                // const tmp = _.cloneDeep(this.onsaleParamsForm) ;
                // console.log("tmp   "+tmp) ;
                // tmp.group = tmp.group.join(",") ;
                // console.log("tmp2   "+tmp) ;
                //  1.验证校验规则
                //  validate中有一个回调函数，回调函数的参数valid是布尔值，表示表单是否验证通过，正确则返回true，否则返回false。
                this.$refs.onsaleParamsFormRef.validate(async (valid) =>{
                    if (!valid) {
                        this.$message.error("表单有不合法项！");
                        return ;
                    }

                    const {data:res} = await this.$http.post("/excelOP/writeto",this.onsaleParamsForm) ;
                    console.log(res);
                    if (res.code=="1"){
                        //  弹出提示信息
                        this.$message.success("写入Excel成功！");
                         // setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
                         // 此处设置延迟，待写入Excel后刷新页面
                        setTimeout(() => {
                            //  this.$router.push({path:"/home"})或者 this.$router.push("/home")用来在点击按钮时跳转到路径"/home"指定的vue模块
                            // this.$router.push({path:"/writetoexcel"});  //  页面路由跳转
                            window.location.reload();    //  刷新当前页面
                        }, 3000)
                    }else {
                        this.$message.error("写入Excel失败！");
                    }
                })
            },

        }
    };
</script>

<style scoped>
    .app-container>.app-header{
        text-align: center;
        line-height: 0px;
        font-size: 20px;
    }
    .app-container>.content-show{
        text-align: center;
        line-height: 0px;
        font-size: 20px;
    }
</style>

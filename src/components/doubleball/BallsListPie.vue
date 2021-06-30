<template>
    <div>
        <!--步骤2：准备一个呈现图表的盒子，即div-->
        <div ref = 'myEchartRed' style="width: 100%; ; height:600px"></div>
        <p style="height: 50px;"></p>
        <div ref = 'myEchartBlue' style="width: 100%; ; height:600px"></div>
    </div>
</template>

<script type="text/babel">
    // 步骤1：引入echarts
    import echarts from 'echarts'
    import axios from 'axios'
    export default {
        data() {
            return {
                dataListRed:[
                    {value:1, name:'红球1'},
                    {value:1, name:'红球2'},
                    {value:1, name:'红球3'},
                    {value:1, name:'红球4'},
                    {value:1, name:'红球5'},
                    {value:1, name:'红球6'},
                    {value:1, name:'红球7'},
                    {value:1, name:'红球8'},
                    {value:1, name:'红球9'},
                    {value:1, name:'红球10'},
                    {value:1, name:'红球11'},
                    {value:1, name:'红球12'},
                    {value:1, name:'红球13'},
                    {value:1, name:'红球14'},
                    {value:1, name:'红球15'},
                    {value:1, name:'红球16'},
                    {value:1, name:'红球17'},
                    {value:1, name:'红球18'},
                    {value:1, name:'红球19'},
                    {value:1, name:'红球20'},
                    {value:1, name:'红球21'},
                    {value:1, name:'红球22'},
                    {value:1, name:'红球23'},
                    {value:1, name:'红球24'},
                    {value:1, name:'红球25'},
                    {value:1, name:'红球26'},
                    {value:1, name:'红球27'},
                    {value:1, name:'红球28'},
                    {value:1, name:'红球29'},
                    {value:1, name:'红球30'},
                    {value:1, name:'红球31'},
                    {value:1, name:'红球32'},
                    {value:1, name:'红球33'}
                ],
                dataListBlue:[
                    {value:1, name:'蓝球1'},
                    {value:1, name:'蓝球2'},
                    {value:1, name:'蓝球3'},
                    {value:1, name:'蓝球4'},
                    {value:1, name:'蓝球5'},
                    {value:1, name:'蓝球6'},
                    {value:1, name:'蓝球7'},
                    {value:1, name:'蓝球8'},
                    {value:1, name:'蓝球9'},
                    {value:1, name:'蓝球10'},
                    {value:1, name:'蓝球11'},
                    {value:1, name:'蓝球12'},
                    {value:1, name:'蓝球13'},
                    {value:1, name:'蓝球14'},
                    {value:1, name:'蓝球15'},
                    {value:1, name:'蓝球16'}
                ]
            }
        },
        methods: {
            // 步骤3：图表初始化数据，即初始化echarts实例对象
            initChart(){
                let myEchartRed = echarts.init(this.$refs.myEchartRed);
                let myEchartBlue = echarts.init(this.$refs.myEchartBlue);
                myEchartRed.setOption({
                    title: {                  // 设置标题组件，包含主标题和副标题。
                        text: '红球统计分布图',   // 设置标题的文字
                        subtext: '',   // 设置标题的子标题
                        left: 'center'       // 设置标题的位置
                    },
                    tooltip: {                  // 提示框组件
                        trigger:'item',         //  触发类型。可选：'item'(数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用)、'axis'(坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用)、'none'(什么都不触发)
                        formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"  //  提示框浮层内容格式器，支持字符串模板和回调函数两种形式。饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                    },
                    series : [             //  系列列表。每个系列通过 type 决定自己的图表类型
                        {
                            name:'红球出现次数及概率',   // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                            type: 'pie',          //  指定类型是饼图
                            radius : '80%',       //  饼图的半径。可以为如下类型：number(直接指定外半径值)、string(：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度)、Array.<number|string>(数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述)。可以将内半径设大显示成圆环图（Donut chart）。
                            center: ['52%', '53%'],   //  饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。使用示例：(1)、center: [400, 300]    // 设置成绝对的像素值；(2)、center: ['50%', '50%']  // 设置成相对的百分比
                            avoidLabelOverlap: false,  // 是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。如果不需要开启该策略，例如圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                            data: this.dataListRed,      //  系列中的数据内容数组
                            itemStyle: {       //  图形样式。
                                emphasis: {     //  高亮的扇区和标签样式。
                                    shadowBlur: 5,    //  图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                                    shadowOffsetX: 0,  //  阴影水平方向上的偏移距离。
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'  //  阴影颜色。支持的格式同color。
                                }
                            }
                        }
                    ]
                });
                myEchartBlue.setOption({
                    title: {                  // 设置标题组件，包含主标题和副标题。
                        text: '蓝球统计分布图',   // 设置标题的文字
                        subtext: '',   // 设置标题的子标题
                        left: 'center'       // 设置标题的位置
                    },
                    tooltip: {                  // 提示框组件
                        trigger:'item',         //  触发类型。可选：'item'(数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用)、'axis'(坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用)、'none'(什么都不触发)
                        formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"  //  提示框浮层内容格式器，支持字符串模板和回调函数两种形式。饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）.（数据项名称）b即返回值中的name，（数值）c即返回值中的value，百分比d自动计算
                    },
                    series : [             //  系列列表。每个系列通过 type 决定自己的图表类型
                        {
                            name:'蓝球出现次数及概率',   // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                            type: 'pie',          //  指定类型是饼图
                            hoverAnimation: true,  //  是否开启 hover 在扇区上的放大动画效果
                            hoverOffset: 40,       //  高亮扇区的偏移距离
                            cursor: 'wait',   // 鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor。默认是'pointer'手型，可为'crosshair'(十字线)、'wait'(此光标指示程序正忙（通常是一只表或沙漏）)等。
                            radius : '80%',       //  饼图的半径。可以为如下类型：number(直接指定外半径值)、string(：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度)、Array.<number|string>(数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述)。可以将内半径设大显示成圆环图（Donut chart）。
                            center: ['52%', '53%'],   //  饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。使用示例：(1)、center: [400, 300]    // 设置成绝对的像素值；(2)、center: ['50%', '50%']  // 设置成相对的百分比
                            avoidLabelOverlap: false,  // 是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。如果不需要开启该策略，例如圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                            data: this.dataListBlue,      //  系列中的数据内容数组
                            itemStyle: {       //  图形样式。
                                emphasis: {     //  高亮的扇区和标签样式。
                                    shadowBlur: 5,    //  图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                                    shadowOffsetX: 0,  //  阴影水平方向上的偏移距离。
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'  //  阴影颜色。支持的格式同color。
                                }
                            }
                        }
                    ]
                });
            },
            async getBallData(){
                // const _this = this
                // axios.get('http://localhost:8181/douballapi/getstatisticsdivide/').then(function (resp) {
                //     _this.dataListRed = resp.data.bean.redballs
                //     _this.dataListBlue = resp.data.bean.blueballs
                //     _this.initChart()
                    const {data:res} = await this.$http.get("/ballapi/getstatisticsdivide")
                    console.log("res.data.redballs"+res.data.redballs)
                    console.log("res.data.blueballs"+res.data.blueballs)
                    this.dataListRed = res.data.redballs
                    this.dataListBlue = res.data.blueballs
                    this.initChart()
            }
        },
        mounted () {
            this.getBallData();
        }
    }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>

</style>


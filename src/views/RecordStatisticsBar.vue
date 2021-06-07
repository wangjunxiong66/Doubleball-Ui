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
                dataListRed:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 6, 9],
                dataListBlue:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 6, 9]
            }
        },
        methods: {
            // 步骤3：图表初始化数据，即初始化echarts实例对象
            initChart(){
                let myEchartRed = echarts.init(this.$refs.myEchartRed);
                let myEchartBlue = echarts.init(this.$refs.myEchartBlue);
                myEchartRed.setOption({
                    tooltip: {     //  提示框组件。
                        trigger: 'axis',    //  触发类型。可选：'item'(数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用)、'axis'(坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用)、'none'(什么都不触发)
                        axisPointer: {     //  坐标轴指示器配置项。tooltip.axisPointer 是配置坐标轴指示器的快捷方式。实际上坐标轴指示器的全部功能，都可以通过轴上的 axisPointer 配置项完成（例如 xAxis.axisPointer 或 angleAxis.axisPointer）。但是使用 tooltip.axisPointer 在简单场景下会更方便一些。注意： tooltip.axisPointer 中诸配置项的优先级低于轴上的 axisPointer 的配置项。坐标轴指示器是指示坐标轴当前刻度的工具。
                            type: 'cross',   //  指示器类型。可选：(1)、'line' 直线指示器(2)、'shadow' 阴影指示器(3)、'none' 无指示器(4)、'cross' 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
                            crossStyle: {        //  当 axisPointer.type 为 'cross' 时有效。
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {      //  工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                        feature: {   //   各工具配置项。除了各个内置的工具按钮外，还可以自定义工具按钮。注意，自定义的工具名字，只能以 my 开头
                            dataView: {     //   数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                                show: true,   //  是否显示该工具。
                                readOnly: false    //  是否不可编辑（只读）。
                            },
                            magicType: {     //  动态类型切换
                                show: true,      //  是否显示该工具。
                                type: ['line', 'bar']     //  启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）。
                            },
                            restore: {      //  配置项还原。
                                show: true     //  是否显示该工具。
                            },
                            saveAsImage: {    //  保存为图片。
                                show: true    //  是否显示该工具。
                            }
                        }
                    },
                    legend: {    //  图例组件。图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。ECharts 3 中单个 echarts 实例中可以存在多个图例组件，会方便多个图例的布局。当图例数量过多时，可以使用 滚动图例（垂直） 或 滚动图例（水平），参见：legend.type
                        // data: ['蒸发量', '降水量']   //  图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）。图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行。如果 data 没有被指定，会自动从当前系列中获取。多数系列会取自 series.name 或者 series.encode 的 seriesName 所指定的维度。如 饼图 and 漏斗图 等会取自 series.data 中的 name。如果要设置单独一项的样式，也可以把该项写成配置项对象。此时必须使用 name 属性对应表示系列的 name。
                        data: ['红球统计数值']   //  图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）。图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行。如果 data 没有被指定，会自动从当前系列中获取。多数系列会取自 series.name 或者 series.encode 的 seriesName 所指定的维度。如 饼图 and 漏斗图 等会取自 series.data 中的 name。如果要设置单独一项的样式，也可以把该项写成配置项对象。此时必须使用 name 属性对应表示系列的 name。

                    },
                    xAxis: [   //  直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
                        {
                            type: 'category',   //  坐标轴类型。可选：(1)、'value' 数值轴，适用于连续数据。(2)、'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。(3)、'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。(4)、'log' 对数轴。适用于对数数据。
                            data: ['红球1', '红球2', '红球3', '红球4', '红球5', '红球6', '红球7', '红球8', '红球9', '红球10', '红球11', '红球12', '红球13', '红球14', '红球15', '红球16', '红球17', '红球18', '红球19', '红球20', '红球21', '红球22', '红球23', '红球24', '红球25', '红球26', '红球27', '红球28', '红球29', '红球30', '红球31', '红球32', '红球33'],
                            axisPointer: {   //  坐标轴指示器配置项。
                                type: 'line'   //  指示器类型。可选：(1)、'line' 直线指示器 (2)、'shadow' 阴影指示器 (3)、'none' 无指示器
                            }
                        }
                    ],
                    yAxis: [    //  直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
                        {
                            type: 'value',   //  坐标轴类型。可选：(1)、'value' 数值轴，适用于连续数据。(2)、'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 yAxis.data 设置类目数据。(3)、'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。(4)、'log' 对数轴。适用于对数数据。
                            name: '数值',   //  坐标轴名称。
                            min: 0,     //  坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。不设置时会自动计算最小值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数（如类目轴 data: ['类A', '类B', '类C'] 中，序数 2 表示 '类C'。也可以设置为负数，如 -3）。当设置成 function 形式时，可以根据计算得出的数据最大最小值设定坐标轴的最小值。
                            max: 700,   //   坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。不设置时会自动计算最大值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数（如类目轴 data: ['类A', '类B', '类C'] 中，序数 2 表示 '类C'。也可以设置为负数，如 -3）。当设置成 function 形式时，可以根据计算得出的数据最大最小值设定坐标轴的最小值。
                            interval: 50,   //   强制设置坐标轴分割间隔。因为 splitNumber 是预估的值，实际根据策略计算出来的刻度可能无法达到想要的效果，这时候可以使用 interval 配合 min、max 强制设定刻度划分，一般不建议使用。无法在类目轴中使用。在时间轴（type: 'time'）中需要传时间戳，在对数轴（type: 'log'）中需要传指数值。
                            axisLabel: {    //  坐标轴刻度标签的相关设置。
                                formatter: '{value}'   //  刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
                            }
                        }
                        // {
                        //     type: 'value',
                        //     name: '温度',
                        //     min: 0,
                        //     max: 25,
                        //     interval: 5,
                        //     axisLabel: {
                        //         formatter: '{value} °C'
                        //     }
                        // }
                    ],
                    series: [
                        {
                            name: '红球统计数值',
                            type: 'bar',
                            data: this.dataListRed
                            // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 6, 9]
                        }
                        // {
                        //     name: '降水量',
                        //     type: 'bar',
                        //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        // }
                    ]
                });
                myEchartBlue.setOption({
                    tooltip: {     //  提示框组件。
                        trigger: 'axis',    //  触发类型。可选：'item'(数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用)、'axis'(坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用)、'none'(什么都不触发)
                        axisPointer: {     //  坐标轴指示器配置项。tooltip.axisPointer 是配置坐标轴指示器的快捷方式。实际上坐标轴指示器的全部功能，都可以通过轴上的 axisPointer 配置项完成（例如 xAxis.axisPointer 或 angleAxis.axisPointer）。但是使用 tooltip.axisPointer 在简单场景下会更方便一些。注意： tooltip.axisPointer 中诸配置项的优先级低于轴上的 axisPointer 的配置项。坐标轴指示器是指示坐标轴当前刻度的工具。
                            type: 'cross',   //  指示器类型。可选：(1)、'line' 直线指示器(2)、'shadow' 阴影指示器(3)、'none' 无指示器(4)、'cross' 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
                            crossStyle: {        //  当 axisPointer.type 为 'cross' 时有效。
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {      //  工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                        feature: {   //   各工具配置项。除了各个内置的工具按钮外，还可以自定义工具按钮。注意，自定义的工具名字，只能以 my 开头
                            dataView: {     //   数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                                show: true,   //  是否显示该工具。
                                readOnly: false    //  是否不可编辑（只读）。
                            },
                            magicType: {     //  动态类型切换
                                show: true,      //  是否显示该工具。
                                type: ['line', 'bar']     //  启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）。
                            },
                            restore: {      //  配置项还原。
                                show: true     //  是否显示该工具。
                            },
                            saveAsImage: {    //  保存为图片。
                                show: true    //  是否显示该工具。
                            }
                        }
                    },
                    legend: {    //  图例组件。图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。ECharts 3 中单个 echarts 实例中可以存在多个图例组件，会方便多个图例的布局。当图例数量过多时，可以使用 滚动图例（垂直） 或 滚动图例（水平），参见：legend.type
                        // data: ['蒸发量', '降水量']   //  图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）。图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行。如果 data 没有被指定，会自动从当前系列中获取。多数系列会取自 series.name 或者 series.encode 的 seriesName 所指定的维度。如 饼图 and 漏斗图 等会取自 series.data 中的 name。如果要设置单独一项的样式，也可以把该项写成配置项对象。此时必须使用 name 属性对应表示系列的 name。
                        data: ['蓝球统计数值'],   //  图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）。图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行。如果 data 没有被指定，会自动从当前系列中获取。多数系列会取自 series.name 或者 series.encode 的 seriesName 所指定的维度。如 饼图 and 漏斗图 等会取自 series.data 中的 name。如果要设置单独一项的样式，也可以把该项写成配置项对象。此时必须使用 name 属性对应表示系列的 name。
                    },
                    xAxis: [   //  直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
                        {
                            type: 'category',   //  坐标轴类型。可选：(1)、'value' 数值轴，适用于连续数据。(2)、'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。(3)、'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。(4)、'log' 对数轴。适用于对数数据。
                            data: ['蓝球1', '蓝球2', '蓝球3', '蓝球4', '蓝球5', '蓝球6', '蓝球7', '蓝球8', '蓝球9', '蓝球10', '蓝球11', '蓝球12', '蓝球13', '蓝球14', '蓝球15', '蓝球16'],
                            axisPointer: {   //  坐标轴指示器配置项。
                                type: 'line'   //  指示器类型。可选：(1)、'line' 直线指示器 (2)、'shadow' 阴影指示器 (3)、'none' 无指示器
                            }
                        }
                    ],
                    yAxis: [    //  直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
                        {
                            type: 'value',   //  坐标轴类型。可选：(1)、'value' 数值轴，适用于连续数据。(2)、'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 yAxis.data 设置类目数据。(3)、'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。(4)、'log' 对数轴。适用于对数数据。
                            name: '数值',   //  坐标轴名称。
                            min: 0,     //  坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。不设置时会自动计算最小值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数（如类目轴 data: ['类A', '类B', '类C'] 中，序数 2 表示 '类C'。也可以设置为负数，如 -3）。当设置成 function 形式时，可以根据计算得出的数据最大最小值设定坐标轴的最小值。
                            max: 300,   //   坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。不设置时会自动计算最大值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数（如类目轴 data: ['类A', '类B', '类C'] 中，序数 2 表示 '类C'。也可以设置为负数，如 -3）。当设置成 function 形式时，可以根据计算得出的数据最大最小值设定坐标轴的最小值。
                            interval: 50,   //   强制设置坐标轴分割间隔。因为 splitNumber 是预估的值，实际根据策略计算出来的刻度可能无法达到想要的效果，这时候可以使用 interval 配合 min、max 强制设定刻度划分，一般不建议使用。无法在类目轴中使用。在时间轴（type: 'time'）中需要传时间戳，在对数轴（type: 'log'）中需要传指数值。
                            axisLabel: {    //  坐标轴刻度标签的相关设置。
                                formatter: '{value}'   //  刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
                            }
                        }
                    ],
                    series: [
                        {
                            name: '蓝球统计数值',
                            type: 'bar',
                            data: this.dataListBlue
                            // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 6, 9]
                        }
                    ]
                });
            },
            getBallData(){
                const _this = this
                axios.get('http://localhost:8181/douballapi/getstatisticsdivide/').then(function (resp) {
                    _this.dataListRed = resp.data.bean.redballsnum
                    _this.dataListBlue = resp.data.bean.blueballsnum
                    _this.initChart()
                })
            }
        },
        mounted () {
            this.getBallData();
        }
    }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>

</style>










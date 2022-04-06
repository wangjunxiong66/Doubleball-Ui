// 时间的校验
// export const validateStartTime = (rule, value, callback) => {
//     if (value === undefined) {
//         callback(new Error('请输入活动开始时间'))
//     } else {
//         if (new Date(this.onshelvesParamsForm.acitvitystarttime).getTime() <= new Date().getTime()) {
//             callback()
//         } else {
//             callback()
//         }
//     }
// }
// export const validateEndTime = (rule, value, callback) => {
//     if (value === undefined) {
//         callback(new Error('请输入活动结束时间'))
//     } else {
//         if (
//             new Date(this.onshelvesParamsForm.acitvitystarttime).getTime() >=
//             new Date(this.onshelvesParamsForm.acitvityendtime).getTime()
//         ) {
//             callback(new Error('结束时间必须大于开始时间！'))
//         } else {
//             callback()
//         }
//     }
// }


// export let login = {
//     account: [{
//         required: true,
//         trigger: 'blur',
//         message: '用户名称不能为空'
//     },
//         {
//             max: 30,
//             trigger: 'blur',
//             message: "长度不能超过30个字符"
//         }
//     ],
//     password: [{
//         required: true,
//         trigger: 'blur',
//         message: '密码不能为空'
//     }, {
//         max: 20,
//         trigger: 'blur',
//         message: "密码长度不能超过20个字符"
//     }],
//     phone: [{
//         required: true,
//         trigger: 'blur',
//         message: '手机号不能为空'
//     }]
// }


// 供应商结算账单类型
// export const billType = [
//     {
//         name: '订单',
//         value: 0
//     },
//     {
//         name: '退单',
//         value: 1
//     }
// ]

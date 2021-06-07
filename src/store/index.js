import Vue from 'vue'     //调用 vue 这里可以分号，也可以不添加分号
import Vuex from 'vuex'   //调用 vuex 插件 这里可以分号，也可以不添加分号

//  全局调用Vuex，这里千万不能添加分号
Vue.use(Vuex)

export default new Vuex.Store({     //实例化vuex仓库
  state: {     //共享数据池，声明公共数据，即状态
  },
  mutations: {     //用于处理公共数据
  },
  actions: {      //把数据处理委托给mutations对象的increment方法
  },
  modules: {
  }
})


/*  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
store运行机制：通过actions触发mutations(类似事件)，进而修改具体仓库状态state(store.state.count)。 Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。*/




//  https://blog.csdn.net/weixin_32377497/article/details/113031607


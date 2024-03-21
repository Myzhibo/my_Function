import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'


Vue.use(Vuex)

//创建vuex的实例
export default new Vuex.Store({
    // modules:{       //模块化
    //   modules
    // }
    modules           // es6写法，对象和字段名一样直接写一个就行
})
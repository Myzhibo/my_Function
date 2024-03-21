const state = {
  Basket: [],      // 抽屉
}
const getters = {
  get_Basket: (state) => {
    // 可以对state中的数据做些计算
    // 。。。
    return state.Basket
  },
}
const mutations = {
  // 存入
  setBasket_status(state, payload){
    state.Basket.push(payload);
  },
  // 移出
  removerBasket_status(state, payload){
    state.Basket.splice(state.Basket.indexOf(payload), 1);
  },
}
const actions = {
  // xxxxxxx ({ commit }, payload) {
  //   commit('xxxxxMutation', payload)
  // },
}

export default {
  name: 'common',     // 开启命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

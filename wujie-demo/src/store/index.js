import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    token: '',
    expireTimes: 30 * 60 * 1000,   // token有效期30分钟
    allMenu: [],
    tags: [{title:'首页', code: 'Dashboard', url: '/#/home'}],
    activeTag: {title:'首页', code: 'Dashboard', url: '/#/home'},
    isCollapse: false,
    dictAll: []
  },
  mutations: {
    SetGlobalState(state, data) {
      Object.assign(state, data)
    },
    GetGlobalState (state) {
      return state
    },
  },
  actions: {
    setGlobalState ({ commit }, data) {
      commit('SetGlobalState', data)
    },
    getGlobalState ({ commit }) {
      commit('GetGlobalState')
    },
  }
})

export default store
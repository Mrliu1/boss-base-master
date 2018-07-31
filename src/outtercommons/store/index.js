import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

// 可以制造user的store的module

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  modules: {
    app: app
  }
})

export default store

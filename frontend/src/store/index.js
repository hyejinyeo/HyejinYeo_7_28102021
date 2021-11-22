import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userLoggedIn: false
    },
    getters: {
        userLoggedIn(state) {
            return state.userLoggedIn;
          }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})

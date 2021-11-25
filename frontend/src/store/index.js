import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        userLoggedIn: false,
        token: null,
        user: {},

    },
    getters: {
        userLoggedIn(state) {
            return state.userLoggedIn;
        }
    },
    mutations: {
        LOG_IN(state, token) {
            state.token = token;
            if (token) {
                state.userLoggedIn = true;
            } 
            else {
                state.userLoggedIn = false;
            }
        }
        
    },
    actions: {
        logIn({ commit }, token) {
            commit("LOG_IN", token);
        },
        
    },
    modules: {
    }
})

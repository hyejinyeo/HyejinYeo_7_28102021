import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '../services/AuthenticationService';

import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        userLoggedIn: false,
        token: null,
        user: {},

    },
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
    getters: {
        userLoggedIn(state) {
            return state.userLoggedIn;
        },
        user(state) {
            return state.user;
        },
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
        },
        SET_USER(state, user) {
            state.user = user;
        },
        
        // for account page by user Id
        GET_USER_BY_ID(state, user) {
            state.user = user;
        },


        LOG_OUT(state) {
            localStorage.clear();
            state.userLoggedIn = false;
            state.token = null;
            state.user = null;
        }
        
    },
    actions: {
        logIn({ commit }, token) {
            commit("LOG_IN", token);
        },
        setUser({ commit }, user) {
            commit("SET_USER", user);
        },

        // for account page by user Id
        getUserById({ commit }) {
            let id = this.state.user.id;
            Auth.getUserById(id).then((response) => {
                const user = response.data;
                commit("GET_USER_BY_ID", user);
            })

        },


        logOut({ commit }) {
            commit("LOG_OUT");
        }
    },
    modules: {
    }
})

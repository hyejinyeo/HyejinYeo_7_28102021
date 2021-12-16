import Vue from 'vue';
import Vuex from 'vuex';
// import Auth from '../services/AuthenticationService';
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
// import PostService from '../services/PostService';


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        userLoggedIn: false,
        token: null,
        user: {},
        users: [],
        post: {},
        posts: [],
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    getters: {
        userLoggedIn(state) {
            return state.userLoggedIn;
        },
        user(state) {
            return state.user;
        },
        users(state) {
            return state.users;
        },
        posts(state) {
            return state.posts;
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
        // GET_USER_BY_ID(state, user) {
        //     state.user = user;
        // },

        UPDATE_ACCOUNT(state, updatedUser) {
            Object.assign(
                state.user, updatedUser
            )
        },
        DELETE_ACCOUNT(state) {
            state.user = {};
        },
        LOG_OUT(state) {
            sessionStorage.clear();
            state.userLoggedIn = false;
            state.token = null;
            state.user = null;
        },
        // POST
        GET_POSTS(state, posts) {
            state.posts = posts;
        },
        ADD_POST(state, post) {
            state.posts = [post, ...state.posts];
        },      
    },
    actions: {
        // USER
        logIn({ commit }, token) {
            commit("LOG_IN", token);
        },
        setUser({ commit }, user) {
            commit("SET_USER", user);
        },

        // for account page by user Id
        // getUserById({ commit }) {
        //     let id = this.state.user.id;
        //     Auth.getUserById(id).then((response) => {
        //         const user = response.data;
        //         commit("GET_USER_BY_ID", user);
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        // },

        updateAccount({ commit }, data) {
            let id = this.state.user.id;
            axios
                .put(`${process.env.PORT || 'http://localhost:3000/'}account/${id}`, data, {
                    headers: { Authorization: 'Bearer ' + this.state.token },
                })
                .then((response) => {
                    const updatedUser = response.data.user;
                    commit("UPDATE_ACCOUNT", updatedUser);
                })
                // .then (() => {
                //     PostService.getPosts().then((response) => {
                //         const posts = response.data;
                //         commit("GET_POSTS", posts);
                //     })
                // }) 
                .catch((error) => {
                    console.log(error)
                })      
        },
        deleteAccount({ commit }, id) {
            axios
                .delete(`${process.env.PORT || 'http://localhost:3000/'}account/${id}`, {
                    headers: { Authorization: 'Bearer ' + this.state.token },
                })
                .then((response) => {
                    console.log(response);
                    commit("DELETE_ACCOUNT");
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        logOut({ commit }) {
            commit("LOG_OUT");
        },


        // ---------------------------------------  POST  ---------------------------------------
        getPosts({ commit }) {
            // PostService.getPosts().then((response) => {
            //     const posts = response.data;
            //     commit("GET_POSTS", posts);
            // });
            axios
                .get(`${process.env.PORT || 'http://localhost:3000/'}feed`, {
                    headers: { Authorization: 'Bearer ' + this.state.token }, 
                })
                .then((response) => {
                    const posts = response.data;
                    commit("GET_POSTS", posts);
                })
        },
        createPost({ commit }, post) {
            // PostService.createPost(post)
            //     .then((response) => {
            //         const post = response.data;
            //         commit("ADD_POST", post);
            //     })
            //     .then(() => {
            //         PostService.getPosts().then((response) => {
            //             const posts = response.data;
            //             commit("GET_POSTS", posts);
            //         });
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     })

            axios
                .post(`${process.env.PORT || 'http://localhost:3000/'}feed`, post, {
                    headers: { Authorization: 'Bearer ' + this.state.token }, 
                })
                .then((response) => {
                    const post = response.data;
                    console.log(post)
                    commit("ADD_POST", post);
                })
                .then(() => {
                    axios
                        .get(`${process.env.PORT || 'http://localhost:3000/'}feed`, {
                            headers: { Authorization: 'Bearer ' + this.state.token }, 
                        })
                        .then((response) => {
                            const posts = response.data;
                            commit("GET_POSTS", posts);
                        })
                })
        }
        
    },
    modules: {

    }
})

import Vue from 'vue';
import Vuex from 'vuex';
// import Auth from '../services/AuthenticationService';
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
// import PostService from '../services/PostService';


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],

    // ***************************************  STATE  ***************************************
    state: {
        userLoggedIn: false,
        token: null,
        user: {},
        users: [],
        post: {},
        posts: [],
    },
    
    // ***************************************  GETTERS  ***************************************
    getters: {
        // -----------------------------------  USER  
        userLoggedIn(state) {
            return state.userLoggedIn;
        },
        user(state) {
            return state.user;
        },
        users(state) {
            return state.users;
        },
        // -----------------------------------  POST
        post(state) {
            return state.post;
        }, 
        posts(state) {
            return state.posts;
        },
    },

    // ***************************************  MUTATIONS  ***************************************
    mutations: {
        // -----------------------------------  USER  
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
            state.posts = [];
        },
        // -----------------------------------  POST 
        GET_ALL_POSTS(state, posts) {
            state.posts = posts;
        },
        GET_POST_BY_ID(state, post) {
            state.post = post;
        },
        RESET_POST(state) {
            state.post = {};
        },
        RESET_POSTS(state) {
            state.posts = [];
        },
        ADD_POST(state, post) {
            state.posts = [post, ...state.posts];
        },
        DELETE_POST(state) {
            state.post = {};
        },
        LIKE_POST(state, like) {
            state.posts = [like, ...state.posts];
        }
    },
    // ***************************************  ACTIONS  ***************************************
    actions: {
        // -----------------------------------  USER  
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
                .then (() => {
                    axios
                        .get(`${process.env.PORT || 'http://localhost:3000/'}feed`, {
                            headers: { Authorization: 'Bearer ' + this.state.token }, 
                        })
                        .then((response) => {
                            const posts = response.data;
                            commit("GET_POSTS", posts);
                        })
                }) 
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


        // -----------------------------------  POST
        getAllPosts({ commit }) {
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
                    commit("GET_ALL_POSTS", posts);
                });
        },
        getPostById({ commit }, id) {
            axios
                .get(`${process.env.PORT || 'http://localhost:3000/'}feed/${id}`, {
                    headers: { Authorization: 'Bearer ' + this.state.token }, 
                })
                .then((response) => {
                    const post = response.data;
                    commit("GET_POST_BY_ID", post);
                });
        },
        resetPost({ commit }) {
            commit("RESET_POST");
        },
        resetPosts({ commit }) {
            commit("RESET_POSTS");
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
                            commit("GET_ALL_POSTS", posts);
                        })
                });
        },
        updatePost({ commit }, post) {
            console.log('store actions received');
            let id = this.state.post.id
            axios
                .put(`${process.env.PORT || 'http://localhost:3000/'}feed/${id}`, post, {
                    headers: { Authorization: 'Bearer ' + this.state.token },     
                })
                .then((response) => {
                    const post = response.data;
                    commit("UPDATE_POST", id, post);
                });
        },
        deletePost({ commit }, id) {
            axios
                .delete(`${process.env.PORT || 'http://localhost:3000/'}feed/${id}`, {
                    headers: { Authorization: 'Bearer ' + this.state.token },     
                })
                .then(() => {
                    commit("DELETE_POST");
                })
        },
        likePost({ commit }, id) {
            
            console.log('post id : ' + id);
            const userId = this.state.user.id;
            console.log('user id : ' + userId);
            // const userId = payload.data.user_id;
            // console.log('received user id : ' + userId)
            // const postId = payload.data.post_id;
            // console.log('received post id : ' + postId)
            console.log(commit)
            
            axios
                .post(`${process.env.PORT || 'http://localhost:3000/'}feed/${id}/like`, { user_id: userId, post_id: id }, {
                    headers: { Authorization: 'Bearer ' + this.state.token }, 
                })
                .then((response) => {
                    const like = response.data;
                    commit("LIKE_POST", like)
                })
                .then(() => {
                    axios
                    .get(`${process.env.PORT || 'http://localhost:3000/'}feed`, {
                        headers: { Authorization: 'Bearer ' + this.state.token }, 
                    })
                    .then((response) => {
                        const posts = response.data;
                        commit("GET_ALL_POSTS", posts);
                    });
                })
        }
        
    },
    // ***************************************  MODULES  ***************************************
    modules: {

    }
})

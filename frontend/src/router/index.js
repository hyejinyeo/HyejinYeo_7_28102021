import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/feed',
        name: 'Feed',
        component: () => import('../views/Feed.vue')
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import('../views/Chat.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../components/Signup.vue')
    },
    {
        path: '/account/:id',
        name: 'Account',
        component: () => import('../views/Account.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue')
    }
    // TO ADD 
    // USER: Profil modification page (add photo, modify password, delete account)
    // FEED: Writing area(CRUD), Feed cards looping through the data
]

const router = new VueRouter({
    routes
})

export default router

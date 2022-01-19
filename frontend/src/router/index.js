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
        path: '/signup',
        name: 'Signup',
        component: () => import('../components/Signup.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
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
    },
    {
        path: '/feed',
        name: 'Feed',
        component: () => import('../views/Feed.vue')
    },
    {
        path: '/feed/:id',
        name: 'EditPost',
        component: () => import('../components/EditPost.vue')
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import('../views/Chat.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router

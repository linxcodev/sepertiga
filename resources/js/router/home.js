import Home from  '../views/Home.vue'
import About from '../views/About.vue'

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        // meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        // meta: { requiresAuth: true }
    }
]
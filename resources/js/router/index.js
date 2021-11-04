import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import home from './home'

Vue.use(VueRouter)

const routes = [
  ...home
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from , next) => {
  store.commit('CLEAR_ERRORS')
  store.commit('LOADING_PAGE', true)
  next()

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   let auth = store.getters.isAuth
  //   if (!auth) {
  //     next({ name: 'login' })
  //   }
  //   else {
  //     store.commit('LOADING_PAGE', true)
  //     next()
  //   }
  // }
  // else {
  //   store.commit('LOADING_PAGE', true)
  //   next()
  // }
})


router.afterEach(() => {
  store.commit('LOADING_PAGE', false)
  store.commit('SET_LOADING', false)
})

export default router
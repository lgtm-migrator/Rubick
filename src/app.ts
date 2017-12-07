import { AxiosInstance } from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import 'plugins'
import { ServerContext } from 'types'

import App from './views/App.vue'

import createRouter from './router'
import createStore from './store'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
])

export default (axios: AxiosInstance, context?: ServerContext) => {
  const store = createStore(axios)
  const router = createRouter(store)

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  const prepare = async () => await store.dispatch('commonCheck')

  const ready = () => {
    router.beforeEach((to, from, next) => {
      if (to.meta.auth) {
        if (!store.state.common.user.namespace) {
          next({
            path: '/login',
            replace: true,
          })
          return
        }
      }

      next()
    })
  }

  return { app, router, store, prepare, ready }
}

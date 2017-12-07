import axios from 'axios'
import Vue, { ComponentOptions } from 'vue'

import { translate } from 'plugins'
import { ServerContext } from 'types'

import createApp from './app'

export default (context: ServerContext) =>
  new Promise(async (resolve, reject) => {
    const start: boolean | number = __DEV__ && Date.now()

    const { ctx } = context

    const $t = translate.create(context.locale)

    Object.assign(context, {
      axios: axios.create({
        headers: ctx.headers,
      }),
      translate: $t,
      title: $t('alauda'),
    })

    const { app, router, store, prepare, ready } = createApp(context.axios)

    const { url } = ctx
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ status: 302, url: fullPath })
    }

    try {
      await prepare()
    } catch (e) {
      return reject(e)
    }

    ready()

    router.push(url)

    router.onReady(async () => {
      const matched = router.getMatchedComponents()

      if (!matched.length) {
        return reject({ status: 404 })
      }

      const { currentRoute: route } = router

      if (route.fullPath !== url) {
        return reject({ status: 302, url: route.fullPath })
      }

      await Promise.all(
        matched.map(
          ({ asyncData }: ComponentOptions<Vue>) =>
            asyncData &&
            asyncData({
              store,
              route,
            }),
        ),
      )

      if (__DEV__) {
        // tslint:disable-next-line:no-console
        console.log(`data pre-fetch: ${Date.now() - (start as number)}ms`)
      }
      context.state = store.state
      resolve(app)
    }, reject)
  })

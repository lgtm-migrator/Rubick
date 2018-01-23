import * as _debug from 'debug'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import * as VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

import config, { globals, paths, vendors } from '../config'

import baseConfig from './base'

const VUE_ENV = 'client'

const { devTool } = config

const { __DEV__, NODE_ENV } = globals

const debug = _debug('rubick:webpack:client')

debug(
  `create webpack configuration for NODE_ENV:${NODE_ENV}, VUE_ENV:${VUE_ENV}`,
)

const clientConfig = merge.smart(baseConfig, {
  entry: {
    app: [paths.src('entry-client.ts')],
    vendors,
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': JSON.stringify(VUE_ENV),
      __SERVER__: JSON.stringify(false),
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      filename: '__non-ssr-page__.html',
      favicon: 'src/assets/favicon.ico',
    }),
    new VueSSRClientPlugin({
      filename: '../vue-ssr-client-manifest.json',
    }),
  ],
})

if (!devTool) {
  debug(`Enable plugins for ${NODE_ENV} (UglifyJS).`)

  clientConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
  )
}

if (__DEV__) {
  clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())
} else {
  debug(`Enable plugins for ${NODE_ENV} (SWPrecache).`)

  clientConfig.plugins.push(
    new SWPrecacheWebpackPlugin({
      cacheId: 'rubick',
      directoryIndex: false,
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/, /\.json$/],
      stripPrefix: paths.dist('static').replace(/\\/g, '/'),
      runtimeCaching: [
        {
          urlPattern: /\//,
          handler: 'networkFirst',
        },
      ],
    }),
  )
}

export default clientConfig

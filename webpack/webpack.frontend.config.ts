import { CheckerPlugin } from 'awesome-typescript-loader'
import * as webpack from 'webpack'
import {
  buildPath,
  resolve,
  mode,
  rules,
  plugins,
  isProd,
  watchOptions,
} from './webpackConfUtils'

export const frontendConfigOutputPublicPath = '/static/'

export const frontendConfig: webpack.Configuration = {
  mode,
  resolve,
  watchOptions,
  entry: [
    ...(!isProd ? ['webpack-hot-middleware/client'] : []),
    buildPath('../src/frontend/index.ts'),
  ],
  ...(!isProd && { devtool: 'eval-source-map' }),
  module: {
    rules: [
      ...rules,
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    ...plugins,
    ...(!isProd ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  target: 'web',
  output: {
    filename: 'bundle-frontend.js',
    path: buildPath('../dist'),
    publicPath: frontendConfigOutputPublicPath,
  },
}

export default frontendConfig

import {
  buildPath,
  resolve,
  rules,
  mode,
  watchOptions,
  plugins,
  isProd,
} from './webpackConfUtils'
import * as nodeExternals from 'webpack-node-externals'
import { CheckerPlugin } from 'awesome-typescript-loader'
import * as webpack from 'webpack'

export const serverConfig: webpack.Configuration = {
  mode,
  resolve,
  watchOptions,
  entry: buildPath('../src/server/index.ts'),
  module: {
    rules,
  },
  plugins,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()], // ignores all modules in node_modules folder
  output: {
    filename: 'bundle-server.js',
    path: buildPath('../dist'),
  },
}

export default serverConfig

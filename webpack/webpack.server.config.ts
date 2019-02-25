import {
  buildPath,
  resolve,
  rules,
  mode,
  watchOptions,
  plugins,
} from './webpackConfUtils'
import * as webpack from 'webpack'
import webpackNodeExternals from 'webpack-node-externals'

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
  externals: [webpackNodeExternals()], // ignores all modules in node_modules folder
  output: {
    filename: 'bundle-server.js',
    path: buildPath('../dist'),
  },
}

export default serverConfig

import * as path from 'path'
import { CheckerPlugin } from 'awesome-typescript-loader'

export const isProd = process.env.NODE_ENV === 'production'

export function buildPath(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

export const mode = isProd ? 'production' : 'development'

export const resolve = {
  // Add .ts/.tsx to the resolve.extensions array.
  extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json'],
  alias: {
    tv: buildPath('../src'),
  },
}

export const rules = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: buildPath('../tsconfig.json'),
        },
      },
    ],
  },
]

export const plugins = [new CheckerPlugin()]

export const watchOptions = {
  ignored: /node_modules/,
}

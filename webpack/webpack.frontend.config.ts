import { CheckerPlugin } from "awesome-typescript-loader";
import * as webpack from "webpack";
import { buildPath } from "./webpackConfUtils";

export const frontendConfigOutputPublicPath = "/static/";
const isProd = process.env.NODE_ENV === "production";

export const frontendConfig: webpack.Configuration = {
  mode: isProd ? "production" : "development",
  entry: [
    ...(!isProd ? ["webpack-hot-middleware/client"] : []),
    buildPath("../src/frontend/index.ts")
  ],
  // Add .ts/.tsx to the resolve.extensions array.
  resolve: {
    extensions: [".ts", ".tsx", ".wasm", ".mjs", ".js", ".json"],
    alias: {
      tv: buildPath("../src")
    }
  },
  ...(!isProd && { devtool: "eval-source-map" }),
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: buildPath("../tsconfig.json")
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      APP_URL: JSON.stringify("http://localhost:3000")
    }),
    ...(!isProd ? [new webpack.HotModuleReplacementPlugin()] : [])
  ],
  target: "web",
  output: {
    filename: "bundle-frontend.js",
    path: buildPath("../dist"),
    publicPath: frontendConfigOutputPublicPath
  },
  watchOptions: {
    ignored: /node_modules/
  }
};

export default frontendConfig;

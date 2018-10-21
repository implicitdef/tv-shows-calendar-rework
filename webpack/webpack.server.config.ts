import { buildPath } from "./webpackConfUtils";
import * as nodeExternals from "webpack-node-externals";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as webpack from "webpack";
const isProd = process.env.NODE_ENV === "production";

export const serverConfig: webpack.Configuration = {
  mode: isProd ? "production" : "development",
  entry: buildPath("../src/server/index.ts"),
  resolve: {
    // Add .ts/.tsx to the resolve.extensions array.
    extensions: [".ts", ".tsx", ".wasm", ".mjs", ".js", ".json"],
    alias: {
      tv: buildPath("../src")
    }
  },
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: buildPath("../tsconfig.json")
            }
          }
        ]
      }
    ]
  },
  plugins: [new CheckerPlugin()],
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    filename: "bundle-server.js",
    path: buildPath("../dist")
  },
  watchOptions: {
    ignored: /node_modules/
  }
};

export default serverConfig;

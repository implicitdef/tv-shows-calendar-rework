import * as path from "path";
import * as nodeExternals from "webpack-node-externals";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as webpack from "webpack";

export const serverConfig: webpack.Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, "../src/server", "index.ts"),
  resolve: {
    // Add .ts/.tsx to the resolve.extensions array.
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      tv: path.resolve(__dirname, "../src")
    }
  },
  devtool: "source-map",
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve(__dirname, "../tsconfig.json")
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
    path: path.resolve(__dirname, "../dist")
  },
  watchOptions: {
    ignored: /node_modules/
  }
};

export default serverConfig;

import * as path from "path";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as webpack from "webpack";

export const frontendConfigOutputPublicPath = "/static/";
const isProd = process.env.NODE_ENV === "production";

export const frontendConfig: webpack.Configuration = {
  mode: isProd ? "production" : "development",
  entry: [
    ...(!isProd ? ["webpack-hot-middleware/client"] : []),
    path.resolve(__dirname, "../src/frontend", "index.ts")
  ],
  // Add .ts/.tsx to the resolve.extensions array.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      tv: path.resolve(__dirname, "../src")
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
              configFileName: path.resolve(__dirname, "../tsconfig.json")
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
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      APP_URL: JSON.stringify("http://localhost:3000")
    }),
    ...(!isProd ? [new webpack.HotModuleReplacementPlugin()] : []),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "web",
  output: {
    filename: "bundle-frontend.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: frontendConfigOutputPublicPath
  },
  watchOptions: {
    ignored: /node_modules/
  }
};

export default frontendConfig;

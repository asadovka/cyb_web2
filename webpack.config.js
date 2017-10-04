const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = function (options = {}) {
  // Settings
  // --env.NODE_ENV root --env.SOURCE_MAP source-map ...
  const NODE_ENV = options.NODE_ENV || "development"; // "production"
  const SOURCE_MAP = options.SOURCE_MAP || "eval-source-map"; // "source-map"
  const API_ROOT = options.API_ROOT || "http://search-api.cyber.fund"; // "http://cyber.fund/api/"
  const APP_VERSION = options.APP_VERSION || "DEV";

  console.log(`
Build started with following configuration:
===========================================
→ API_ROOT: ${API_ROOT}
→ NODE_ENV: ${NODE_ENV}
→ SOURCE_MAP: ${SOURCE_MAP}
→ APP_VERSION: ${APP_VERSION}
`);

  return {
    entry: {
      vendor: [
        "babel-polyfill",
        "react",
        "react-dom"
      ],
      app: [
        path.resolve(__dirname, "app", "src", "main.tsx")
      ]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js?[hash]",
      publicPath: "/"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    bail: false,
    devtool: SOURCE_MAP,
    module: {
      rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }, {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: "[name]_[local]"
          }
        }, {
          loader: "postcss-loader",
          options: {
            plugins: function () {
              return [
                autoprefixer
              ];
            }
          }
        }, {
          loader: "less-loader"
        }]
      }, {
        test: /\.s[ac]ss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: {
            plugins: function () {
              return [
                autoprefixer
              ];
            }
          }
        }, {
          loader: "sass-loader"
        }]
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 32768
        }
      }]
    },
    plugins: createListOfPlugins({NODE_ENV, APP_VERSION, API_ROOT}),
    devServer: {
      stats: {
        chunkModules: false,
        colors: true
      },
      historyApiFallback: true,
      inline: false,
      proxy: {
        "/api": {
          target: "http://search-api.cyber.fund",
          pathRewrite: {"^/api": ""}
        }
      }
    }
  }
};

function createListOfPlugins({NODE_ENV, APP_VERSION, API_ROOT}) {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app", "index.html"),
      favicon: path.resolve(__dirname, "app", "favicon.ico"),
      hash: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(NODE_ENV)
      },
      _API_ROOT: JSON.stringify(API_ROOT),
      _APP_VERSION: JSON.stringify(APP_VERSION)
    })
  ];

  if (NODE_ENV === "production") {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: 2
      })
    );
  }

  return plugins;
}

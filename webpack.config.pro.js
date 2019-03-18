var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, "./dist"), // 项目的打包文件路径
    filename: "build.js", // 打包后的文件名
    publicPath: "/",
  },
  devtool: "#source-map",
  resolve: {
    extensions: [".js", ".json", ".vue", ".scss", ".css"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          name: 'img/[name].[hash:7].[ext]',
          publicPath:"/" ,
          limit: 6000 // 大于6KB的不转为base64
        }
      },
      {
        test: /\.vue$/, // 以上的 css scss js 等的配置会自动加载到 .vue的文件里对应的 script style template 等模块
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: "src/html/index.html"
    })
  ]
};

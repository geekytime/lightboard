/* eslint-env node */
const HtmlWebpackPlugin = require("html-webpack-plugin")
const htmlWebpackTemplate = require("html-webpack-template")
const path = require("path")

const exclude = new RegExp(`(node_modules)/(?!@lightboard)`)

const headHtmlSnippet = `
  <meta
    name="viewport"
    content="width=device-width,initial-scale=1"
    user-scalable=no
  >
`

module.exports = {
  mode: "production",
  resolve: {
    symlinks: false
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ["babel-loader"],
      exclude
    },{
      test: /\.less|\.css$/,
      use: [
        "style-loader",
        "css-loader",
        "less-loader"
      ]
    },{
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: "file-loader",
        options: {}
      }]
    }]
  },
  node: {
    fs: "empty"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlWebpackTemplate,
      title: "Lightboard",
      filename: "index.html",
      inject: false,
      lang: "en-US",
      appMountId: "root",
      headHtmlSnippet
    })
  ]
}

const baseConfig = require("@lightboard/config/webpack.config.js")
const merge = require("webpack-merge")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

const config = merge(baseConfig, {
  entry: {
    app: ["./src/index.js"]
  }
})

config.module.rules.push({
  test: /\.vue$/,
  loader: "vue-loader"
})

config.plugins.unshift(new VueLoaderPlugin())

module.exports = config

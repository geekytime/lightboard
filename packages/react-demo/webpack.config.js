const baseConfig = require("@lightboard/config/webpack.config.js")
const merge = require("webpack-merge")

baseConfig.plugins[0].options.title = "Lightboard - React"

const config = merge(baseConfig, {
  entry: {
    app: ["./src/index.js"]
  }
})

module.exports = config

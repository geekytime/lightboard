const baseConfig = require("@lightboard/config/webpack.config.js")
const merge = require("webpack-merge")

const config = merge(baseConfig, {
  entry: {
    app: ["./src/index.js"]
  }
})

module.exports = config

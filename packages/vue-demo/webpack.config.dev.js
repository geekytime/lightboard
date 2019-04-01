const baseConfig = require("./webpack.config.js")
const devConfig = require("@lightboard/config/webpack.config.dev.js")
const merge = require("webpack-merge")

module.exports = merge(baseConfig, devConfig)

/* eslint-env node */
var path = require("path")

module.exports = {
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, "static"),
    publicPath: "/",
    disableHostCheck: true,
    port: 4433,
    host: "0.0.0.0",
    historyApiFallback: true
  },
  devtool: "cheap-module-source-map",
  mode: "development"
}

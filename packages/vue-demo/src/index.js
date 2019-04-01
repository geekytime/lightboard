import App from "./app.vue"
import Vue from "vue"
import "./index.less"

var rootEl = document.createElement("DIV")
rootEl.id = "root"
document.body.appendChild(rootEl)

// eslint-disable-next-line no-new
new Vue({
  el: "#root",
  render: h => h(App)
})

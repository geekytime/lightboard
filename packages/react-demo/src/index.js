import App from "./app.jsx"
import React from "react"
import ReactDOM from "react-dom"
import "@lightboard/common/styles/index.less"

try {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  )
} catch (error) {
  const div = document.createElement("div")
  div.innerHTML = "Sorry. It's not working right now."
  document.getElementById("root").appendChild(div)
}

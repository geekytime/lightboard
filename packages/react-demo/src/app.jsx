import React from "react"
import { Lightboard, Store } from "@lightboard/react"
import "@lightboard/common/styles/app.less"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.store = new Store()
  }

  render () {
    return (
      <div className="app">
        <Lightboard store={this.store} />
      </div>
    )
  }
}

export default App

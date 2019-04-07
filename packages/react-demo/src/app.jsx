import createControls from "@lightboard/common/src/create-controls.js"
import { Lightboard, Store } from "@lightboard/react"
import React from "react"
import "@lightboard/common/styles/app.less"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.store = new Store()
  }

  componentDidMount () {
    createControls(this.store)    
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

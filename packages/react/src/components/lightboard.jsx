import debounce from "debounce"
import Light from "./light.jsx"
import { observer } from "mobx-react"
import PropTypes from "prop-types"
import range from "../util/range.js"
import React from "react"
import Store from "../store/store.js"
import "@lightboard/common/styles/lightboard.less"

@observer
class Lightboard extends React.Component {
  constructor (props) {
    super(props)
    this.el = React.createRef()
  }

  componentDidMount () {
    this.resize()
    this.setStyleProperties()
    window.addEventListener("resize", debounce(this.resize, 250))
  }

  componentDidUpdate () {
    this.setStyleProperties()
  }

  setStyleProperties () {
    const { lightSize, fadeSpeed } = this.props.store
    const { style } = this.el.current
    style.setProperty("--light-size", `${lightSize}px`)
    style.setProperty("--fade-speed", `${fadeSpeed}ms`)
  }

  resize () {
    if (this.el && this.el.current) {
      const el = this.el.current
      const width = el.offsetWidth
      const height = el.offsetHeight
      const { store } = this.props
      store.resize({ width, height })
    }
  }

  render () {
    return (
      <div
        className="lightboard"
        ref={this.el}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {this.renderLights()}
      </div>
    )
  }

  renderLights () {
    const { store } = this.props
    return range(store.rowCount).map((o, i) => {
      return this.renderRow(i)
    })
  }

  renderRow (row) {
    const key = `row-${row}`
    return (
      <div className="row" key={key}>
        {this.renderCells(row)}
      </div>
    )
  }

  renderCells (row) {
    const { store } = this.props
    return range(store.colCount).map((o, col) => {
      return this.renderCell(row, col)
    })
  }

  renderCell (row, col) {
    const key = `cell-${row}-${col}`
    const { store } = this.props
    const color = store.getColor(row, col)
    return (
      <div className="cell" key={key} data-row={row} data-col={col}>
        <Light row={row} col={col} color={color} />
      </div>
    )
  }

  handleMouseDown = (event) => {
    const { row, col } = event.target.dataset
    const identifier = -1
    this.props.store.startTouch({ row, col, identifier })
  }

  handleMouseMove = (event) => {
    if (event.buttons > 0) {
      const { row, col } = event.target.dataset
      const identifier = -1
      this.props.store.startTouch({ row, col, identifier })
    }
  }

  handleMouseUp = (event) => {
    const { row, col } = event.target.dataset
    const identifier = -1
    this.props.store.endTouch({ row, col, identifier })
  }

  handleTouchStart = (event) => {
    const { row, col } = event.target.dataset
    for (let i = 0; i < event.touches.length; i++) {
      const { identifier } = event.touches[i]
      this.props.store.startTouch({ row, col, identifier })
    }
  }

  handleTouchMove = (event) => {    
    for (let i = 0; i < event.touches.length; i++) {
      const { pageX, pageY, identifier } = event.touches[i]
      const el = document.elementFromPoint(pageX, pageY)
      const { row, col } = el.dataset
      this.props.store.startTouch({ row, col, identifier })
    }
  }

  handleTouchEnd = (event) => {
    event.preventDefault()
    for (let i = 0; i < event.changedTouches.length; i++) {
      const { identifier } = event.changedTouches[i]
      this.props.store.endTouch({ identifier })
    }
  }
}

Lightboard.propTypes = {
  store: PropTypes.object
}

Lightboard.defaultProps = {
  store: new Store()
}

export default Lightboard

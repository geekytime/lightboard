import PropTypes from "prop-types"
import React from "react"
import "@lightboard/common/styles/light.less"

class Light extends React.Component {
  constructor (props) {
    super(props)
    this.el = React.createRef()
  }

  componentDidMount () {
    this.setColor()
  }

  render () {
    this.setColor()
    const { row, col } = this.props
    return (
      <div className="light" ref={this.el} data-row={row} data-col={col}>
      </div>
    )
  }

  setColor () {
    if (this.el && this.el.current) {
      const { color } = this.props
      const { style } = this.el.current
      style.setProperty("--light-color", color)
    }
  }
}

Light.propTypes = {
  color: PropTypes.string,
  row: PropTypes.number,
  col: PropTypes.number
}

export default Light

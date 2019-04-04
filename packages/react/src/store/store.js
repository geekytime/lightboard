import { action, computed, observable } from "mobx"

class Store {
  init () {
    requestAnimationFrame(this.processDecays)
  }

  @observable width = 100
  @observable height = 100
  @observable lightSize = 50
  @observable fadeSpeed = 500
  @observable decaySpeed = 0
  @observable color0 = "#FF4136"
  @observable color1 = "#FF851B"
  @observable color2 = "#FFDC00"
  @observable color3 = "#2ECC40"
  @observable color4 = "#0074D9"
  @observable color5 = "#B10DC9"
  @observable lights = {}
  @observable touches = {}
  @observable records = []

  @computed
  get colors () {
    return [
      this.color0,
      this.color1,
      this.color2,
      this.color3,
      this.color4,
      this.color5
    ]
  }

  @computed
  get colCount () {
    return Math.floor(this.width / this.lightSize) || 0
  }

  @computed
  get rowCount () {
    return Math.floor(this.height / this.lightSize) || 0
  }

  getColor (row, col) {
    const key = this.getKey(row, col)
    if (this.lights[key]) {
      const { colorIndex } = this.lights[key]
      return this.colors[colorIndex]
    }
    return this.colors[0]
  }

  getKey (row, col) {
    return `${row}-${col}`
  }

  @action
  initLight (key) {
    const newLight = {
      colorIndex: 0
    }
    this.lights[key] = newLight
  }

  onTouchList (identifier, key) {
    if (this.touches[identifier]) {
      return this.touches[identifier].includes(key)
    }
    return false
  }

  @action
  updateTouchList (identifier, key) {
    if (this.touches[identifier]) {
      this.touches[identifier].push(key)
    } else {
      this.touches[identifier] = [key]
    }
  }

  @action
  startTouch ({ row, col, identifier }) {
    const key = this.getKey(row, col)
    if (!this.lights[key]) {
      this.initLight(key)
    }
    if (!this.onTouchList(identifier, key)) {
      this.updateTouchList(identifier, key)
      const colorIndex = this.nextColor(this.lights[key].colorIndex)
      this.addRecord(key, colorIndex)
      this.lights[key] = { colorIndex }      
    }
  }

  @action
  endTouch ({ identifier }) {
    this.touches[identifier] = []
  }

  @action
  initTouches (identifier) {
    this.touches[identifier] = []
  }

  nextColor (colorIndex) {
    if (colorIndex === this.colors.length - 1) {
      return 0
    }
    return colorIndex + 1
  }

  previousColor (colorIndex) {
    if (colorIndex > 0) {
      return colorIndex - 1
    }
    return 0
  }

  @action
  addRecord (key) {
    const time = new Date().valueOf()
    this.records.push({ time, key })
  }

  @action
  processDecays () {
    if (this.decaySpeed > 0) {
      const now = new Date().valueOf()
      for (var i = 0; i < this.records.length; i++) {
        const { time, key } = this.records[i]
        if (now - time > this.decaySpeed) {
          setTimeout(() => {
            this.processDecay(key)
          }, 0)
        } else {
          break;
        }
      }
      this.records.splice(0, i)
    }
    requestAnimationFrame(this.processDecays)
  }

  @action
  processDecay (key) {
    const { colorIndex } = this.lights[key]
    this.lights[key].colorIndex = this.previousColor(colorIndex)
  }

  @action
  resize ({ width, height }) {
    this.width = width
    this.height = height
  }

  @action
  reset () {
    this.lights = {}
  }
}

export default Store

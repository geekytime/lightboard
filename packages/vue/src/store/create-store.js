import Vue from "vue"

const createStore = () => {
  return new Vue({
    data: {
      width: 100,
      height: 100,
      lightSize: 50,
      fadeSpeed: 500,
      lights: {},
      touches: {},
      color0: "#FF4136",
      color1: "#FF851B",
      color2: "#FFDC00",
      color3: "#2ECC40",
      color4: "#0074D9",
      color5: "#B10DC9"
    },
    computed: {
      colors () {
        return [
          this.color0,
          this.color1,
          this.color2,
          this.color3,
          this.color4,
          this.color5
        ]
      },
      colCount () {
        return Math.floor(this.width / this.lightSize) || 0
      },
      rowCount () {
        return Math.floor(this.height / this.lightSize) || 0
      }
    },
    methods: {
      getColor (row, col) {
        const key = this.getKey(row, col)
        if (this.lights[key]) {
          const { colorIndex } = this.lights[key]
          return this.colors[colorIndex]
        }
        return this.colors[0]
      },
      getKey (row, col) {
        return `${row}-${col}`
      },
      initLight (key) {
        const newLight = {
          colorIndex: 0
        }
        Vue.set(this.lights, key, newLight)
      },
      onTouchList (identifier, key) {
        if (this.touches[identifier]) {
          return this.touches[identifier].includes(key)
        }
        return false
      },
      updateTouchList (identifier, key) {
        if (this.touches[identifier]) {
          this.touches[identifier].push(key)
        } else {
          this.touches[identifier] = [key]
        }
      },
      startTouch ({ row, col, identifier }) {
        const key = this.getKey(row, col)
        if (!this.lights[key]) {
          this.initLight(key)
        }
        if (!this.onTouchList(identifier, key)) {
          this.updateTouchList(identifier, key)
          const colorIndex = this.nextColor(this.lights[key].colorIndex)
          Vue.set(this.lights, key, { colorIndex })
        }
      },
      endTouch ({ identifier }) {
        this.touches[identifier] = []
      },
      initTouches (identifier) {
        this.touches[identifier] = []
      },
      nextColor (colorIndex) {
        if (colorIndex === this.colors.length - 1) {
          return 0
        }
        return colorIndex + 1
      },
      resize ({ width, height }) {
        this.width = width
        this.height = height
      },
      reset () {
        this.lights = {}
      }
    }
  })
}

export default createStore

<template>
  <div class="app">
    <Lightboard :store="store" />
  </div>
</template>

<script>
import { Lightboard, createStore } from "@lightboard/vue"
import * as dat from "dat-gui"

export default {
  components: {
    Lightboard
  },
  beforeCreate () {
    this.store = createStore()
  },
  mounted () {
    this.createControls()
  },
  methods: {
    createControls () {
      const gui = new dat.GUI({ closed: true })
      gui.add(this.store, "lightSize", { sm: 30, md: 50, lg: 80, xl: 110 })
      gui.add(this.store, "fadeSpeed", { slow: 750, med: 500, fast: 250 })
      gui.add(this.store, "decaySpeed", {
        never: 0,
        "15s": 10000,
        "10s": 10000,
        "5s": 5000,
        "3s": 3000,
        "2s": 2000,
        "1s": 1000
      })
      const colors = gui.addFolder("colors")
      colors.addColor(this.store, "color0")
      colors.addColor(this.store, "color1")
      colors.addColor(this.store, "color2")
      colors.addColor(this.store, "color3")
      colors.addColor(this.store, "color4")
      colors.addColor(this.store, "color5")
      gui.add(this.store, "reset")
      gui.close()
    },
    reset () {
      this.store.reset()
    }
  }
}
</script>

<style lang="less">
@padding: 1em;
@controlsHeight: 3em;

.app {
  height: 100vh;
  width: 100vw;
  padding: @padding;

  .lightboard {
    margin-top: 10px;
    height: calc(100% - 10px);
  }
}
</style>

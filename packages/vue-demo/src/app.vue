<template>
  <div class="app">
    <Lightboard
      :light-size="lightSize"
      :seed="seed"
      :colors="colors"
    />
  </div>
</template>

<script>
import Lightboard from "@lightboard/vue"
import * as dat from "dat-gui"

export default {
  components: {
    Lightboard
  },
  data () {
    return {
      lightSize: 50,
      seed: 0,
      color0: "#FF4136",
      color1: "#0074D9",
      color2: "#FFDC00",
      color3: "#2ECC40",
      color4: "#B10DC9",
      color5: "#FF851B"
    }
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
    }
  },
  mounted () {
    const gui = new dat.GUI({ closed: true })
    gui.add(this, "lightSize", { sm: 30, md: 50, lg: 80, xl: 110 })
    const colors = gui.addFolder("colors")
    colors.addColor(this, "color0")
    colors.addColor(this, "color1")
    colors.addColor(this, "color2")
    colors.addColor(this, "color3")
    colors.addColor(this, "color4")
    colors.addColor(this, "color5")
    gui.add(this, "reset")
    gui.close()
  },
  methods: {
    reset () {
      this.seed++
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

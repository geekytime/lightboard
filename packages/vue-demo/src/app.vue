<template>
  <div class="app">
    <Lightboard :store="store" />
  </div>
</template>

<script>
import createControls from "@lightboard/common/src/create-controls.js"
import { Lightboard, createStore } from "@lightboard/vue"

export default {
  components: {
    Lightboard
  },
  beforeCreate () {
    this.store = createStore()
  },
  mounted () {
    createControls(this.store)
  }
}
</script>

<style lang="less">
@import "~@lightboard/common/styles/app.less";
</style>

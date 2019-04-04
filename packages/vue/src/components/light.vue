<template>
  <!-- Keep `color` in the template to force updates! -->
  <div :class="`light ${color}`" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "red"
    }
  },
  mounted () {
    this.$el.style.setProperty("--light-color", this.color)
  },
  beforeUpdate () {
    this.$el.style.setProperty("--light-color", this.color)
  }
}
</script>

<style lang="less">
@import "~@lightboard/common/styles/light.less";
</style>

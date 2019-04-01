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
.light {
  @color: var(--light-color);
  width: 100%;
  height: 100%;

  @size: calc(var(--light-size) * .75);
  transition: background-color 250ms ease, box-shadow 250ms ease;
  border-radius: 50%;
  width: @size;
  height: @size;

  background-color: @color;
  box-shadow:
    0px 0px calc(@size * 0.1) calc(@size * .1) @color;
}
</style>

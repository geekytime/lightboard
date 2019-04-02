<template>
  <div
    class="lightboard"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  >
    <div
      v-for="row in store.rowCount"
      :key="`row-${row}`"
      class="row"
    >
      <div
        v-for="col in store.colCount"
        :key="`col-${col}`"
        class="cell"
        :data-row="row"
        :data-col="col"
      >
        <Light
          :color="store.getColor(row, col)"
          :data-row="row"
          :data-col="col"
        />
      </div>
    </div>
  </div>
</template>

<script>
import createStore from "../store/create-store.js"
import debounce from "debounce"
import Light from "./light.vue"

export default {
  components: {
    Light
  },
  props: {
    store: {
      type: Object,
      default: createStore
    }
  },
  mounted () {
    this.resize()
    this.setStyleProperties()
    window.addEventListener("resize", debounce(this.resize, 250))
  },
  beforeDestroy () {
    window.removeEventListener("resize", debounce(this.resize, 250))
  },
  beforeUpdate () {
    this.setStyleProperties()
  },
  methods: {
    handleMouseDown (event) {
      const { row, col } = event.target.dataset
      const identifier = -1
      this.store.startTouch({ row, col, identifier })
    },
    handleMouseMove (event) {
      if (event.buttons > 0) {
        const { row, col } = event.target.dataset
        const identifier = -1
        this.store.startTouch({ row, col, identifier })
      }
    },
    handleMouseUp (event) {
      const { row, col } = event.target.dataset
      const identifier = -1
      this.store.endTouch({ row, col, identifier })
    },
    handleTouchStart (event) {
      event.preventDefault()
      const { row, col } = event.target.dataset
      for (let i = 0; i < event.touches.length; i++) {
        const { identifier } = event.touches[i]
        this.store.startTouch({ row, col, identifier })
      }
    },
    handleTouchMove (event) {
      event.preventDefault()
      for (let i = 0; i < event.touches.length; i++) {
        const { pageX, pageY, identifier } = event.touches[i]
        const el = document.elementFromPoint(pageX, pageY)
        const { row, col } = el.dataset
        this.store.startTouch({ row, col, identifier })
      }
    },
    handleTouchEnd (event) {
      event.preventDefault()
      for (let i = 0; i < event.changedTouches.length; i++) {
        const { identifier } = event.changedTouches[i]
        this.store.endTouch({ identifier })
      }
    },
    setStyleProperties () {
      this.$el.style.setProperty("--light-size", `${this.store.lightSize}px`)
      this.$el.style.setProperty("--fade-speed", `${this.store.fadeSpeed}ms`)
    },
    resize () {
      const width = this.$el.offsetWidth
      const height = this.$el.offsetHeight
      this.store.resize({ width, height })
    }
  }
}
</script>

<style lang="less">
.lightboard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .cell {
      display: flex;
      width: var(--light-size);
      height: var(--light-size);
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

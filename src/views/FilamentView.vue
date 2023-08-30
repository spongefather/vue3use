<template>
  <div id="google_engine">
    <canvas id="scene"></canvas>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { markRaw } from 'vue'
import { FilamentUsage } from '@/utils/BaseTypes'
import { FilamentSuzanne, FilamentTriangle } from '@/utils/FilamentUtil'

@Options({
  mounted () {
    new Promise(
      () => {
        this.build()
      }
    ).catch(
      (res) => {
        console.log(res)
      }
    )
  },
  unmounted () {
    new Promise(
      () => {
        this.destroy()
      }
    ).catch(
      (res) => {
        console.log(res)
      }
    )
  },
  updated() {
    new Promise(
      () => {
        this.destroy()
        this.build()
      }
    ).catch(
      (res) => {
        console.log(res)
      }
    )
  },
})
export default class FilamentView extends Vue {
  fe!: FilamentUsage

  build () {
    const canv:HTMLCanvasElement = document.querySelector('canvas#scene')!
    this.fe = markRaw(new FilamentSuzanne(canv))
    // FilamentSuzanne or FilamentTriangle
  }

  destroy () {
    this.fe.destroy()
  }
}
</script>
<style>
#google_engine {
  width: 100%;
}

#google_engine canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>@/error/bad.js

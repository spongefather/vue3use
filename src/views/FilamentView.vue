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
import Trackball from 'gltumble'

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
  trackball!: Trackball

  build () {
    const canv:HTMLCanvasElement = document.querySelector('canvas#scene')!
    if (! this.trackball) {
      this.trackball = new Trackball(canv, {startSpin: 0.035})
    }
    this.fe = markRaw(new FilamentSuzanne(canv, this.trackball))
    // FilamentSuzanne or FilamentTriangle
  }

  destroy () {
    this.fe.destroy()
    // TODO release wasmMemory
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
</style>

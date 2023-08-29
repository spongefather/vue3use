<template>
  <div id="google_engine">
    <canvas id="scene"></canvas>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { markRaw } from 'vue'
import { FilamentEngine } from '@/utils/FilamentUtil'

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
        this.destroy() // destroy error this version ...
      }
    ).catch(
      (res) => {
        console.log(res)
      }
    )
  },
  beforeUpdate () {
    // rebuild the engine ... is use for hotload
    new Promise(
      () => {
        this.destroy() // destroy error this version ...
      }
    ).catch(
      (res) => {
        console.log(res)
      }
    )
  }
})
export default class FilamentView extends Vue {
  fe: FilamentEngine | undefined

  build () {
    const canv:HTMLCanvasElement = document.querySelector('canvas#scene')!
    this.fe = markRaw(new FilamentEngine(canv))
  }

  destroy () {
    this.fe?.destroy()
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

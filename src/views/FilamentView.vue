<template>
  <div id="google_engine">
    <canvas id="scene"></canvas>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { badInit, EmscriptenModuleConfig } from '@/error/bad'
import Filament from 'filament'
import 'gl-matrix'


/**
 * change Filament like this
 * Filament({
 *    locateFile : (file: string, dir:string) => {
 *      console.log(dir + file)
 *      return 'filament.wasm'
 *    }
 *  })
 * Filament.init should have a paramter
 */
@Options({
  mounted() {
      new Promise(
        () => {
          this.build()
        }
      )
  },
  unmounted () {
    this.destroy()
  }
})
export default class FilamentView extends Vue {
  engine: Filament.Engine | null = null
  config: EmscriptenModuleConfig = {}
  build () {
    this.config.locateFile = () => '/filament.wasm'
    badInit([], () => {
      const ele: HTMLCanvasElement = document.querySelector('canvas#scene')!
      this.draw(ele)
    }, this.config, Filament)
  }
  draw (ele:HTMLCanvasElement) {
    this.engine = Filament.Engine.create(ele, {
      // scene
    })
  }
  destroy () {
    if(this.engine) {
      Filament.Engine.destroy(this.engine)
    }
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

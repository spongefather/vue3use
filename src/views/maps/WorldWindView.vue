<template>
  <div class="www_map">
    <canvas id="earth" />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { initWorldWind, destroyWorldWind } from '@/error/bad'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery-ui/dist/themes/smoothness/jquery-ui.min.css'
// require('bootstrap/dist/js/bootstrap.min.js')
// require('jquery-ui/dist/jquery-ui.min.js')
require('@/assets/worldwind.min.js')

/**
 * simple use for worldwind ...
 * TODO be module and types ...
 */
@Options({
  mounted() {
    this.build()
  },
  unmounted() {
    this.destroy()
  },
})
export default class WorldWindView extends Vue {

  www:any

  build() {
    this.www = initWorldWind("earth", this.clacRange())
  }

  clacRange() {
    const cav = document.querySelector("#earth")!
    const wid = cav.clientWidth
    const hei = cav.clientHeight
    const value = wid > hei ? hei: wid
    return 12742000 / value * 2646 / devicePixelRatio
  }

  destroy () {
    destroyWorldWind(this.www)
  }
}
</script>
<style>
.www_map , #earth {
  width: 100%;
  height: 100%;
  position: relative;
}
#earth {
  display: block;
  background-color: #303030;
}
</style>

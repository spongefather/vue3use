<template>
  <div class="www_map">
    <canvas id="earth" />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { initWorldWind } from '@/error/bad'
require('@/assets/worldwind.min.js')

/**
 * simple use for worldwind ...
 * TODO be module and types ...
 */
@Options({
  mounted() {
    this.build()
  }
})
export default class WorldWindView extends Vue {
  build() {
    initWorldWind()
  }
}
</script>
<style>
.www_map , #earth {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

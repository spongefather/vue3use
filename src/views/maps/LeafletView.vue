<template>
  <div class="leaflet">
    <div id="map_leaf" />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import L from 'leaflet'

@Options({
  mounted() {
    this.build()
  },
})
export default class LeafletView extends Vue {

  build() {
    var map = L.map('map_leaf', {
      center: [0, 0],
      zoom: 13
    });
  }
}
</script>
<style>
.leaflet , #map_leaf {
  width: 100%;
  height: 100%;
}
</style>

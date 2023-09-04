<template>
  <div class="leaflet">
    <div id="map_leaf" />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import L, { tileLayer, CRS, LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'

@Options({
  mounted() {
    this.build()
  },
})
export default class LeafletView extends Vue {

  build() {
    const map = L.map('map_leaf', {
      center: new LatLng(43.806958, 87.57306),
      zoom: 5
    })

    // geoserver ne world map
    const url = '/geoserver/ne/wms'
    tileLayer.wms(url, {
      crs: CRS.EPSG4326,
      layers: 'ne:world',
      styles: '',
      format: 'image/png',
      version: '1.3.0',
      uppercase: true,
      transparent: true
    }).addTo(map)

    tileLayer.wms(url, {
      crs: CRS.EPSG4326,
      layers: 'ne:populated_places',
      styles: '',
      format: 'image/png',
      version: '1.3.0',
      uppercase: true,
      transparent: true
    }).addTo(map)

    tileLayer.wms(url, {
      crs: CRS.EPSG4326,
      layers: 'ne:boundary_lines',
      styles: '',
      format: 'image/png',
      version: '1.3.0',
      uppercase: true,
      transparent: true
    }).addTo(map)

  }
}
</script>
<style>
.leaflet , #map_leaf {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

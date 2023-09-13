<template>
  <div class="maps">
    <nav>
      <span>| </span>
      <router-link to="/maps/cesium">Cesium</router-link>
      <span> | </span>
      <router-link to="/maps/leaflet">Leaflet</router-link>
      <span> | </span>
      <router-link to="/maps/worldwind">WorldWind</router-link>
      <span> | </span>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style>
.maps,.container{
  width: 100%;
  height: calc(100% - 50px);
}
.maps nav {
  height: 20px;
  padding: 0 0 30px;
}
</style>

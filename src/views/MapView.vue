<template>
  <div class="maps">
    <nav>
      | <router-link to="/maps/cesium">Cesium</router-link> |
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { Options, Vue } from 'vue-class-component'

// @Options({})
// export default class MapView extends Vue {}
</script>
<style>
.maps,.container{
  width: 100%;
  height: calc(100% - 80px);
}
.maps nav {
  height: 20px;
  padding: 30px;
}
</style>

<template>
  <div class="aframe_container">
    <a-scene stats>
      <!-- <a-assets>
        <a-asset-item id="centermodel" src="/ms/Bee.glb"></a-asset-item>
      </a-assets> -->
      <a-entity gltf-model="/ms/Bee.glb" animation-mixer position="0 -4 8"></a-entity>
    </a-scene>
  </div>

</template>
<script setup lang="ts">
require('aframe')

</script>
<style>
</style>

<template>
  <div class="aframe_container">
    <a-scene class="ascontainer" stats>
      <!-- <a-assets>
        <a-asset-item id="centermodel" src="/ms/Bee.glb"></a-asset-item>
      </a-assets> -->
      <a-entity
        gltf-model="/ms/Bee.glb"
        animation-mixer
        position="0 0 0"
      >
      </a-entity>
      <a-entity
        camera=""
        position="0 0 24"
        wasd-controls=""
        rotation=""
        look-controls=""
        aframe-injected=""
      >
      </a-entity>
    </a-scene>
  </div>

</template>
<script setup lang="ts">
require('aframe')
// aframe-environment-component use
</script>
<style>
.ascontainer {
  transform: rotate(0deg);
}
</style>

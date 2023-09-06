<template>
  <div class="aframe_container">
    <a-scene class="ascontainer" stats>
      <a-assets>
        <a-asset-item id="ballobj" src="/shader_ball.obj"></a-asset-item>
        <a-asset-item id="ballmtl" src="/shader_ball.mtl"></a-asset-item>
      </a-assets>
      <a-entity
        obj-model="obj: #ballobj; mtl: #ballmtl"
        position="0 -1 0"
      >

      </a-entity>
      <a-entity
        camera
        position="0 0 4"
        wasd-controls
        rotation
        look-controls
        aframe-injected
      >
      </a-entity>
      <a-sky color="#ECECEC"></a-sky>
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

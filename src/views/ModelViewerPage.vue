<template>
  <div class="mv_page">
    <model-viewer
      class="container"
      alt="test"
      src="/ms/Bee.glb"
      ar
      shadow-intensity="1"
      camera-controls
      touch-action="pan-y"
    >
    <!-- environment-image="shared-assets/environments/moon_1k.hdr"
      poster="shared-assets/models/NeilArmstrong.webp" -->
    </model-viewer>
  </div>
</template>
<script setup lang="ts">
require('@google/model-viewer')
</script>
<style>
.container {
  width: 100%;
  height: 100%;
}
</style>

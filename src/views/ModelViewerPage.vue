<template>
  <div class="mv_page">
    <model-viewer
      class="container"
      alt="test"
      src="/ms/model.glb"
      ar
      shadow-intensity="1"
      camera-controls
      touch-action="pan-y"
    >
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

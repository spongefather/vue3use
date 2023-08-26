<template>
  <div class="home">
    <HelloWorld msg="Welcome to Threejs 3D world."/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class HomeView extends Vue {}
</script>
<style>
.home {
  height: calc(100% - 80px);
  width: 100%;
}
</style>

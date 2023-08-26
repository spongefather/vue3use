<template>
  <div class="about">
    <div id="viewer"></div>
  </div>
</template>

<script lang="ts">
import '@photo-sphere-viewer/core/index.css'
import { Options, Vue } from 'vue-class-component'
import { Viewer } from '@photo-sphere-viewer/core'

let view:Viewer

const year = new Date().getFullYear()

@Options({
  mounted () {
    new Promise(() => {
      this.initPage()
    }).catch().then()
  },
  unmounted () {
    if (view) {
      view.destroy()
    }
  }
})
export default class HomeView extends Vue {
  initPage () {
    if (view) {
      console.log('init error')
    }
    view = new Viewer({
      // container: document.querySelector('#viewer'),
      container: 'viewer',
      panorama: '/sphere.jpg',
      // A text displayed in the navbar. If the navbar is disabled, the caption won't be visible.
      caption: `xxx <b> &copy; ${year}</b>`,
      loadingImg: '/loader.gif',
      // loadingImg: gif,
      // navbar: [],
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true
    })
  }
}
</script>
<style>
.about {
  width: 100%;
  height: calc(100% - 80px);
  /* min-height: 800px; */
}
#viewer {
  width: 100%;
  height: 100%;
}
</style>

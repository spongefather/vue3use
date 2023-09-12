<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="view">
      <canvas id="threecanv"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let end = false
let scene:THREE.Scene,
  camera:THREE.PerspectiveCamera,
  render:THREE.WebGLRenderer,
  frame:number

@Options({
  props: {
    msg: String
  },
  mounted () {
    new Promise(() => {
      this.initFrame()
    }).catch().then()
  },
  unmounted () {
    // destory the frame
    end = true
    cancelAnimationFrame(frame)
    console.log('stop your scene')
    // THREE.EventDispatcher
    // render.domElement.addEventListener('dblclick', ent, false)
    render.forceContextLoss()
    render.dispose()
    scene.clear()
    // render.domElement = undefined
  }
})

export default class HelloWorld extends Vue {
  msg!: string
  async initFrame () {
    const ele = document.getElementById('view')
    const width = ele?.clientWidth ?? 1
    const height = ele?.clientHeight ?? 1
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const cv: HTMLCanvasElement = document.querySelector('#threecanv')!
    render = new THREE.WebGLRenderer({
      canvas: cv,
      antialias: true,
      alpha: true,
      precision: 'highp',
      depth: true,
      preserveDrawingBuffer: true,
      logarithmicDepthBuffer: true
    })
    render.setSize(width, height)
    const controls = new OrbitControls( camera, cv )
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x00bf22 }),
      new THREE.MeshBasicMaterial({ color: 0xd32200 }),
      new THREE.MeshBasicMaterial({ color: 0xd2ac22 }),
      new THREE.MeshBasicMaterial({ color: 0x22cda6 }),
      new THREE.MeshBasicMaterial({ color: 0xb23410 }),
      new THREE.MeshBasicMaterial({ color: 0x01bc56 }),
    ]
    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)
    camera.position.x = 10
    camera.position.y = 10
    camera.position.z = 160
    controls.autoRotate = true
    // ...other
    controls.update()
    const rende = function () {
      if (end) {
        cancelAnimationFrame(frame)
        return
      }
      frame = requestAnimationFrame(rende)
      controls.update()
      render.render(scene, camera)
    }
    end = false
    rende()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  width: 100%;
}
#view {
  height: calc(100% - 40px);
  width: 100%;
  background-color: #80808099;
}
#threecanv {
  display: block;
}
h1 {
  margin: 0;
  height: 40px;
}
</style>

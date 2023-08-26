<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="view"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import * as THREE from 'three'

let end = false
let scene:THREE.Scene, camera:THREE.PerspectiveCamera, render:THREE.WebGLRenderer, geometry, material
let frame:number

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
    render = new THREE.WebGLRenderer()
    render.setSize(width, height)
    document.getElementById('view')?.appendChild(render.domElement)
    geometry = new THREE.BoxGeometry(3, 3, 3)
    material = new THREE.MeshBasicMaterial({ color: 0x291785 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 5
    const rende = function () {
      if (end) {
        return
      }
      frame = requestAnimationFrame(rende)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
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
}
h1 {
  margin: 0;
  height: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

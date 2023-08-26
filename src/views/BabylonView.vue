<template>
  <div class="babylon">
    <BabaylonLoading ref="load" />
    <canvas id="scene" tabindex="0"></canvas>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BabaylonLoading from '@/components/BabaylonLoading.vue'

import {
  Scene,
  Engine,
  EngineOptions,
  FreeCamera,
  HemisphericLight,
  Vector3,
  // CreateSphere,
  CreateGround,
  ILoadingScreen,
  SceneLoader,
  WebGPUEngine,
  WebGPUEngineOptions
  // AssetsManager,
  // AbstractMesh,
  // IParticleSystem,
  // Skeleton,
  // AnimationGroup,
  // TransformNode,
  // Geometry,
  // Light
} from '@babylonjs/core'
import '@babylonjs/loaders'
import '@babylonjs/inspector'

@Options({
  components: {
    BabaylonLoading
  },
  // 设置
  mounted () {
    // resolve, reject
    new Promise(() => {
      this.webGLInit()
    })
      .catch((e) => { console.log('error', e) })
      .then((re) => { console.log('inited .', re) })
  },
  unmounted () {
    if (this.engine) {
      this.engine.loadingScreen.displayLoadingUI()
      this.engine.dispose()
    }
    window.removeEventListener('resize', this.resizeHandler)
  }
})
export default class Babylon extends Vue {
  ele: HTMLCanvasElement | null = null
  engine:Engine | WebGPUEngine | null = null

  webGLInit () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.ele = document.querySelector('canvas#scene')!
    const option:EngineOptions = {}
    this.engine = new Engine(this.ele, true, option, true)
    this.initScene()
  }

  async webGpuInit () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.ele = document.querySelector('canvas#scene')!
    const option:WebGPUEngineOptions = {}
    const en = new WebGPUEngine(this.ele, option)
    await en.initAsync()
    this.engine = en
    this.initScene()
  }

  initScene () {
    if (!this.engine) {
      throw new Error('engine init error')
    }
    this.engine.loadingScreen = this.$refs.load as ILoadingScreen
    this.engine.loadingScreen.displayLoadingUI()
    const scene = new Scene(this.engine)
    const camera = new FreeCamera('main', new Vector3(0, 15, -20), scene)
    camera.setTarget(Vector3.Zero())
    camera.attachControl(this.ele, true)

    const light = new HemisphericLight('mainlight', new Vector3(0, 20, 0), scene)
    light.intensity = 0.7
    // SceneLoader.Append 加载模型时，会有加载动画
    SceneLoader.Append('/', 'City Apartment Building.glb', scene, (ts) => {
      this.engine?.loadingScreen.hideLoadingUI()
      // const config = { embedMode: true }
      scene.debugLayer.show()
      // Inspector.Show(scene, { embedMode: true })
      ts.createDefaultCameraOrLight(true, true, true)
      this.engine?.runRenderLoop(() => {
        scene.render()
      })
    })
    window.addEventListener('resize', this.resizeHandler)
  }

  resizeHandler () {
    if (this.engine) {
      console.log('ready to resize engine .')
      this.engine.resize()
    }
  }
}
</script>
<style>
/* inline-block 有换行也会被解析为元素，会增加空白，设置文字大小为0 或者将行内元素展示为 block */
.babylon {
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
  /* font-size: 0; */
}
.babylon canvas {
  display: block;
}
</style>

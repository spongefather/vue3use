import { badInit, EmscriptenModuleConfig, DefaultConfig } from '@/error/bad'
import Filament from 'filament'
import { mat4 } from 'gl-matrix'
import { FilamentUsage } from './BaseTypes'
import Trackball from 'gltumble'

abstract class AbstractFilament implements FilamentUsage {
  config: EmscriptenModuleConfig = DefaultConfig()
  engine!: Filament.Engine
  scene!: Filament.Scene
  swapChain!: Filament.SwapChain
  renderer!: Filament.Renderer
  camera!: Filament.Camera
  view!: Filament.View
  entity!: Filament.Entity
  trackball: Trackball
  running = false
  req: number| undefined

  constructor (ele:HTMLCanvasElement, tb: Trackball) {
    // do something ...
    this.running = false
    this.trackball = tb
  }

  destroy () {
    this.running = false
    if(this.req)
      cancelAnimationFrame(this.req)
    // release this.trackball
    if (this.engine) {
      // this.engine ...
      Filament.Engine.destroy(this.engine)
    }
    Object.assign(Filament, { initialized: false })
    // clean Module config
    this.config = DefaultConfig()
  }

  resize () {
    // do some thing
  }

  render () {
    if(this.running) {
      const radians = Date.now() / 1000
      const transform = mat4.fromRotation(mat4.create(), radians, [0, 1, 0])
      const tcm = this.engine.getTransformManager()
      const inst = tcm.getInstance(this.entity)
      // tcm.setTransform(inst, this.trackball.getMatrix())
      tcm.setTransform(inst, transform)
      inst.delete()
      this.renderer.render(this.swapChain, this.view)
      this.req = window.requestAnimationFrame(this.render)
    } else {
      if(this.req) {
        window.cancelAnimationFrame(this.req)
      }
    }

  }
}

/**
 * test for draw Triangle copy from filament demo
 */
export class FilamentTriangle extends AbstractFilament {
  canvas:HTMLCanvasElement
  vb!: Filament.VertexBuffer
  ib!: Filament.IndexBuffer

  constructor (ele:HTMLCanvasElement, tb: Trackball) {
    super(ele,tb)
    // Object.assign(window, { glMatrix })
    this.canvas = ele
    badInit(['/triangle.filamat'], () => {
      this.engine = Filament.Engine.create(this.canvas, {})
      this.scene = this.engine.createScene()
      this.entity = Filament.EntityManager.get().create()
      this.scene.addEntity(this.entity)
      const TRIANGLE_POSITIONS = new Float32Array([
        1, 0,
        Math.cos(Math.PI * 2 / 3), Math.sin(Math.PI * 2 / 3),
        Math.cos(Math.PI * 4 / 3), Math.sin(Math.PI * 4 / 3)
      ])
      const TRIANGLE_COLORS = new Uint32Array([0xffff0000, 0xff00ff00, 0xff0000ff])
      this.vb = Filament.VertexBuffer.Builder()
        .vertexCount(3)
        .bufferCount(2)
        .attribute(Filament.VertexAttribute.POSITION, 0, Filament.VertexBuffer$AttributeType.FLOAT2, 0, 8)
        .attribute(Filament.VertexAttribute.COLOR, 1, Filament.VertexBuffer$AttributeType.UBYTE4, 0, 4)
        .normalized(Filament.VertexAttribute.COLOR)
        .build(this.engine)

      this.vb.setBufferAt(this.engine, 0, TRIANGLE_POSITIONS)
      this.vb.setBufferAt(this.engine, 1, TRIANGLE_COLORS)

      this.ib = Filament.IndexBuffer.Builder()
        .indexCount(3)
        .bufferType(Filament.IndexBuffer$IndexType.USHORT)
        .build(this.engine)

      this.ib.setBuffer(this.engine, new Uint16Array([0, 1, 2]))

      // version wrong ...
      // const mat = this.engine.createMaterial('/triangle.filamat')
      // const matinst = mat.getDefaultInstance()
      Filament.RenderableManager.Builder(1)
        .boundingBox({ center: [-1, -1, -1], halfExtent: [1, 1, 1] })
        // .material(0, matinst)
        .geometry(0, Filament.RenderableManager$PrimitiveType.TRIANGLES, this.vb, this.ib)
        .build(this.engine, this.entity)

      this.swapChain = this.engine.createSwapChain()
      this.renderer = this.engine.createRenderer()
      this.camera = this.engine.createCamera(Filament.EntityManager.get().create())

      this.view = this.engine.createView()
      // this.view.setSampleCount(4)
      this.view.setMultiSampleAntiAliasingOptions({ sampleCount: 4 })
      this.view.setCamera(this.camera)
      this.view.setScene(this.scene)

      this.renderer.setClearOptions({ clearColor: [0.0, 0.1, 0.2, 1.0], clear: true })

      this.resize()
      this.render = this.render.bind(this)
      this.resize = this.resize.bind(this)
      window.addEventListener('resize', this.resize)
      this.running = true
      this.req = window.requestAnimationFrame(this.render)
    }, this.config, Filament)
  }

  resize () {
    const dpr = window.devicePixelRatio
    const width = this.canvas.width = window.innerWidth * dpr
    const height = this.canvas.height = window.innerHeight * dpr
    this.view.setViewport([0, 0, width, height])
    const aspect = width / height
    this.camera.setProjection(Filament.Camera$Projection.ORTHO, -aspect, aspect, -1, 1, 0, 1)
  }
}

/**
 * gltumble
 */
export class FilamentSuzanne extends AbstractFilament {
  canvas:HTMLCanvasElement
  ibl!: Filament.IndirectLight

  constructor (ele:HTMLCanvasElement, tb: Trackball) {
    super(ele, tb)
    const env = 'venetian_crossroads_2k'
    const iblUrl = `/suzanne/${env}_ibl.ktx`
    const skyUrl = `/suzanne/${env}_skybox.ktx`
    const albedoUrl = '/suzanne/albedo.ktx'
    const aoUrl = '/suzanne/ao.ktx'
    const metallicUrl = '/suzanne/metallic.ktx'
    const normalUrl = '/suzanne/normal.ktx'
    const roughnessUrl = '/suzanne/roughness.ktx'
    const filamatUrl = '/suzanne/textured.filamat'
    const filameshUrl = '/suzanne/suzanne.filamesh'
    this.canvas = ele
    badInit([
      filamatUrl,
      filameshUrl,
      albedoUrl,
      aoUrl,
      metallicUrl,
      normalUrl,
      roughnessUrl,
      iblUrl,
      skyUrl
    ], () => {
      const engine = this.engine = Filament.Engine.create(this.canvas)
      this.scene = engine.createScene()

      const sunlight = Filament.EntityManager.get().create()
      Filament.LightManager.Builder(Filament.LightManager$Type.SUN)
        .color([0.98, 0.92, 0.89])
        .intensity(80000.0)
        .direction([0.6, -1.0, -0.8])
        .castShadows(true)
        .sunAngularRadius(1.9)
        .sunHaloSize(10.0)
        .sunHaloFalloff(80.0)
        .build(engine, sunlight)
      this.scene.addEntity(sunlight)

      const indirectLight = this.ibl = engine.createIblFromKtx1(iblUrl)
      this.scene.setIndirectLight(indirectLight)
      indirectLight.setIntensity(80000)

      const skybox = engine.createSkyFromKtx1(skyUrl)
      this.scene.setSkybox(skybox)

      const material = engine.createMaterial(filamatUrl)
      const matinstance = material.createInstance()

      const sampler = new Filament.TextureSampler(
        Filament.MinFilter.LINEAR_MIPMAP_LINEAR,
        Filament.MagFilter.LINEAR,
        Filament.WrapMode.CLAMP_TO_EDGE
      )

      const albedo = engine.createTextureFromKtx1(albedoUrl, {
        srgb: true,
        formats: [
          Filament.Texture$InternalFormat.DXT5_RGBA,
          Filament.Texture$InternalFormat.DXT5_SRGBA,
          Filament.Texture$InternalFormat.ETC2_EAC_SRGBA8
        ]
      })
      const roughness = engine.createTextureFromKtx1(roughnessUrl)
      const metallic = engine.createTextureFromKtx1(metallicUrl)
      const ao = engine.createTextureFromKtx1(aoUrl)
      const normal = engine.createTextureFromKtx1(normalUrl)

      matinstance.setTextureParameter('albedo', albedo, sampler)
      matinstance.setTextureParameter('roughness', roughness, sampler)
      matinstance.setTextureParameter('metallic', metallic, sampler)
      matinstance.setTextureParameter('normal', normal, sampler)
      matinstance.setTextureParameter('ao', ao, sampler)

      const mesh = engine.loadFilamesh(filameshUrl, matinstance)
      this.entity = mesh.renderable
      this.scene.addEntity(mesh.renderable)

      this.swapChain = engine.createSwapChain()
      this.renderer = engine.createRenderer()
      this.camera = engine.createCamera(Filament.EntityManager.get().create())
      this.view = engine.createView()
      this.view.setCamera(this.camera)
      this.view.setScene(this.scene)
      this.resize()
      this.render = this.render.bind(this)
      this.resize = this.resize.bind(this)
      window.addEventListener('resize', this.resize)
      this.running = true
      this.req = window.requestAnimationFrame(this.render)

      // console.info(`The 4x4 transform looks like: ${mat}.`)
    }, this.config, Filament)
  }

  resize () {
    const dpr = window.devicePixelRatio
    const width = this.canvas.width = window.innerWidth * dpr
    const height = this.canvas.height = window.innerHeight * dpr
    this.view.setViewport([0, 0, width, height])
    const eye = [0, 0, 4]; const center = [0, 0, 0]; const up = [0, 1, 0]
    this.camera.lookAt(eye, center, up)
    const aspect = width / height
    const fov = aspect < 1 ? Filament.Camera$Fov.HORIZONTAL : Filament.Camera$Fov.VERTICAL
    this.camera.setProjectionFov(45, aspect, 1.0, 10.0, fov)
  }
}

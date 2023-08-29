import { markRaw } from 'vue'
import { badInit, EmscriptenModuleConfig } from '@/error/bad'
import Filament from 'filament'
import { mat4, glMatrix } from 'gl-matrix'

export class FilamentEngine {
  canvas:HTMLCanvasElement
  engine: Filament.Engine | undefined
  config: EmscriptenModuleConfig = {}
  scene: Filament.Scene| undefined
  triangle: Filament.Entity| undefined
  vb: Filament.VertexBuffer| undefined
  ib: Filament.IndexBuffer| undefined
  swapChain: Filament.SwapChain| undefined
  renderer: Filament.Renderer| undefined
  camera: Filament.Camera| undefined
  view: Filament.View| undefined

  constructor (ele:HTMLCanvasElement) {
    markRaw(Filament)
    Object.assign(window, { glMatrix })
    this.canvas = ele
    this.config.locateFile = () => '/filament.wasm'
    this.config.noExitRuntime = false
    badInit(['/nonlit.mat'], () => {
      this.engine = Filament.Engine.create(this.canvas, {})
      this.scene = this.engine.createScene()
      this.triangle = Filament.EntityManager.get().create()
      this.scene.addEntity(this.triangle)
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

      // const mat = this.engine.createMaterial('nonlit.mat')
      // const matinst = mat.getDefaultInstance()
      Filament.RenderableManager.Builder(1)
        .boundingBox({ center: [-1, -1, -1], halfExtent: [1, 1, 1] })
        // .material(0, matinst)
        .geometry(0, Filament.RenderableManager$PrimitiveType.TRIANGLES, this.vb, this.ib)
        .build(this.engine, this.triangle)

      this.swapChain = this.engine.createSwapChain()
      this.renderer = this.engine.createRenderer()
      this.camera = this.engine.createCamera(Filament.EntityManager.get().create())

      this.view = this.engine.createView()
      // this.view.setSampleCount(4)
      this.view.setCamera(this.camera)
      this.view.setScene(this.scene)

      this.renderer.setClearOptions({ clearColor: [0.0, 0.1, 0.2, 1.0], clear: true })

      this.resize()
      this.render = this.render.bind(this)
      this.resize = this.resize.bind(this)
      window.addEventListener('resize', this.resize)
      window.requestAnimationFrame(this.render)
    }, this.config, Filament)
  }

  resize () {
    const dpr = window.devicePixelRatio
    const width = this.canvas.width = window.innerWidth * dpr
    const height = this.canvas.height = window.innerHeight * dpr
    this.view!.setViewport([0, 0, width, height])
    const aspect = width / height
    this.camera!.setProjection(Filament.Camera$Projection.ORTHO, -aspect, aspect, -1, 1, 0, 1)
  }

  render () {
    const radians = Date.now() / 1000
    const transform = mat4.fromRotation(mat4.create(), radians, [0, 0, 1])
    const tcm = this.engine!.getTransformManager()
    const inst = tcm.getInstance(this.triangle!)
    tcm.setTransform(inst, transform)
    inst.delete()
    this.renderer!.render(this.swapChain!, this.view!)
    window.requestAnimationFrame(this.render)
  }

  destroy () {
    if (this.engine) {
      Filament.Engine.destroy(this.engine)
    }
  }
}

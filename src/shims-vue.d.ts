/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'gltumble' {
  import type { mat4 } from 'gl-matrix'
  /**
   * gltumble config
   */
  class Options {
    autoTick?: boolean ;
    homeTilt?: number ;
    startSpin?: number ;
    friction?: number ;
    radiansPerPixel?: Array<number>;
    clampTilt?: number ;
  }
  /**
   * gltumble main class
   */
  export default class Trackball {
    constructor(ele:HTMLCanvasElement,option?:Options)
    getMatrix: ()=>mat4 // length 16
  }
}

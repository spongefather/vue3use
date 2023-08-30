/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'gltumble' {
  import type { mat4 } from 'gl-matrix'
  export default class Trackball {
    constructor(ele:HTMLCanvasElement)
    getMatrix: ()=>mat4 // length 16
  }
}

import { glMatrix, vec4, mat3 } from 'gl-matrix'
/**
 * copy from filament.js
 * change some code
 */
export function badInit (assets, onready, config, Filament) {
  // Module["vec4"] = vec4,should be nice
  // make those global
  window.glMatrix = glMatrix
  window.vec4 = vec4
  window.mat3 = mat3
  Filament.View = () => {
    // cant find where is this ... maybe in wasm
  }
  if (onready) {
    Filament.onReadyListeners.push(onready)
  }
  if (Filament.initialized) {
    console.assert(!assets || assets.length === 0, 'Assets can be specified only with the first call to init.')
    return
  }
  Filament.initialized = true

  Filament.assets = {}

  if (typeof glMatrix !== 'undefined') {
    // console.log('get glMatrix success...')
    Filament.loadMathExtensions()
  }

  let remainingTasks = 1 + assets.length
  const taskFinished = () => {
    if (--remainingTasks === 0) {
      for (const callback of Filament.onReadyListeners) {
        callback()
      }
      Filament.isReady = true
    }
  }

  Filament.fetch(assets, null, taskFinished)
  Filament(config).then(m => {
    Filament = Object.assign(Filament, m)
    Filament.loadClassExtensions()
    taskFinished()
  })
}

export const DefaultConfig = {
  locateFile: () => '/filament.wasm',
  noExitRuntime: false
}

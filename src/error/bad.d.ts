import Filament from 'filament'

/**
 * need emscripten document
 */
export interface EmscriptenModuleConfig {
  // can be set
  locateFile?: (fileName: string) => string,
  print?: () => void,
  arguments?: any,
  thisProgram?: any,
  printErr?: any,
  wasmBinary?: any, // downloaded wasm file
  /**
   * default true
   */
  noExitRuntime?: boolean,
  /**
   * default 16777216
   */
  INITIAL_MEMORY?: number,
  preInit?: (()=>void) | ([()=>void]),
  preRun?: [()=>void],
  postRun?: [()=>void],
  monitorRunDependencies?:any,
  onAbort?: (error:Error)=>void,

  // can get
  getInheritedInstanceCount?: any,
  getLiveInheritedInstances?: any,
  flushPendingDeletes?: any,
  setDelayFunction?: any
}

export function badInit(assets: string[],
  onready: (() => void),
  config: EmscriptenModuleConfig, //
  Filament: Filament): void

export const DefaultConfig:EmscriptenModuleConfig

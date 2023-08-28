import Filament, {
  Engine,
  EntityManager,
  VertexAttribute,
  Camera$Projection
} from 'filament'

/**
 * need emscripten document
 */
export interface EmscriptenModuleConfig {
  // can be set
  locateFile?: (fileName: string) => string,
  print?: Function,
  arguments?: any,
  thisProgram?: any,
  printErr?: any,
  wasmBinary?: any, // downloaded wasm file
  noExitRuntime?: boolean,

  // can get
  getInheritedInstanceCount?: any,
  getLiveInheritedInstances?: any,
  flushPendingDeletes?: any,
  setDelayFunction?: any
}

export function badInit(assets: string[],
  onready: (() => void),
  config: EmscriptenModuleConfig,
  Filament: Filament): void

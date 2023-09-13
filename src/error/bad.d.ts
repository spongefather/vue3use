import Filament from 'filament'

/**
 * need emscripten document
 */
export interface EmscriptenModuleConfig {
  // can be set
  ctx: WebGL2RenderingContext,
  ready?: Promise;
  locateFile?: (fileName: string) => string;
  print?: () => void;
  arguments?: any;
  thisProgram?: any;
  printErr?: any;
  wasmBinary?: any; // downloaded wasm file
  /**
   * default true
   */
  noExitRuntime?: boolean;
  asm?: any;
  /**
   * default 16777216
   * 16M ?
   */
  INITIAL_MEMORY?: number;
  preInit?: (() => void) | [() => void];
  preRun?: [() => void];
  noFSInit?: any;
  postRun?: [() => void];
  monitorRunDependencies?: (id:number)=>void;
  onAbort?: (error: Error) => void;
  quit?: any;
  instantiateWasm?: (info: string, receiveInstance: string) => void;
  logReadFiles?: any;
  stdin?: any;
  stdout?: any;
  stderr?: any;
  setStatus?: (st: string) => void;
  run?: any;
  preInit?: any;
  // can get
  inspect?: any; // ????
  getInheritedInstanceCount?: ()=>void;
  getLiveInheritedInstances?: ()=>void;
  flushPendingDeletes?: ()=>void;
  setDelayFunction?: (fn: any) => void;
  HEAP8?: Int8Array;
  HEAP16?: Int16Array;
  HEAP32?: Int32Array;
  HEAPU8?: Uint8Array;
  HEAPU16?: Uint16Array;
  HEAPU32?: Uint32Array;
  HEAPF32?: Float32Array;
  HEAPF64?: Float64Array;
  count_emval_handles?: ()=>void;
  get_first_emval?: ()=>void;
  InternalError?: ()=>void;
  BindingError?: ()=>void;
  UnboundTypeError?: any;
  calledRun?: boolean;
  _free?:(args)=>void;
}

export function badInit(
  assets: string[],
  onready: () => void,
  config: EmscriptenModuleConfig, //
  Filament: Filament
): void;

export function DefaultConfig(): EmscriptenModuleConfig

export function initWorldWind()

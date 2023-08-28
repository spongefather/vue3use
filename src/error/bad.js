/**
 * copy from filament.js
 */
export function badInit(assets, onready, config, Filament) {
  if (onready) {
    Filament.onReadyListeners.push(onready);
  }
  if (Filament.initialized) {
    console.assert(!assets || assets.length == 0, "Assets can be specified only with the first call to init.");
    return;
  };
  Filament.initialized = true;

  Filament.assets = {};

  // ... error
  if (typeof glMatrix !== 'undefined') {
    Filament.loadMathExtensions();
  }

  let remainingTasks = 1 + assets.length;
  const taskFinished = () => {
    if (--remainingTasks == 0) {
      for (const callback of Filament.onReadyListeners) {
        callback();
      }
      Filament.isReady = true;
    }
  };

  Filament.fetch(assets, null, taskFinished);
  Filament(config).then(m => {
    Filament = Object.assign(m, Filament);
    Filament.loadClassExtensions();
    taskFinished();
  });
};

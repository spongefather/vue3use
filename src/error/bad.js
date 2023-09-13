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
    //from wasm
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
  }).catch( e => {
    console.log(e)
    // html show error
  })
}

export const DefaultConfig = () => {
  return {
    locateFile: () => '/filament.wasm',
    noExitRuntime: false,
    monitorRunDependencies: (id) => {
      // console.log(id)
    }
  }

}

/**
 * copy from NASAWorldWind/WebWorldWind
 *
 * examples/Annotations
 */
export function initWorldWind() {
  WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

  // Create the WorldWindow.
  var wwd = new WorldWind.WorldWindow("earth");

  // Create and add imagery and WorldWindow UI layers.
  var layers = [
      // Imagery layers.
      {layer: new WorldWind.BMNGLayer(), enabled: true},
      {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
      // Add atmosphere layer on top of all base layers.
      {layer: new WorldWind.AtmosphereLayer(), enabled: true},
      // WorldWindow UI layers.
      {layer: new WorldWind.CompassLayer(), enabled: true},
      {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
      {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
  ];

  for (var l = 0; l < layers.length; l++) {
      layers[l].layer.enabled = layers[l].enabled;
      wwd.addLayer(layers[l].layer);
  }

  // Set default annotation attributes.
  var annotationAttributes = new WorldWind.AnnotationAttributes(null);
  annotationAttributes.cornerRadius = 14;
  annotationAttributes.backgroundColor = WorldWind.Color.BLUE;
  annotationAttributes.drawLeader = true;
  annotationAttributes.leaderGapWidth = 40;
  annotationAttributes.leaderGapHeight = 30;
  annotationAttributes.opacity = 1;
  annotationAttributes.scale = 1;
  annotationAttributes.width = 200;
  annotationAttributes.height = 100;
  annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
  annotationAttributes.insets = new WorldWind.Insets(10, 10, 10, 10);

  // Set a location for the annotation to point to and create it.
  var location = new WorldWind.Position(40.964231, -103.627767, 1e2);
  var annotation = new WorldWind.Annotation(location, annotationAttributes);
  // Text can be assigned to the annotation after creating it.
  annotation.label = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  // Create and add the annotation layer to the WorldWindow's layer list.
  var annotationsLayer = new WorldWind.RenderableLayer("Annotations");
  annotationsLayer.addRenderable(annotation);
  wwd.addLayer(annotationsLayer);

}

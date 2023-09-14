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
export function initWorldWind(canvasid, range) {
  // version error ?
  console.log(`use WorldWind version ${WorldWind.VERSION}`)
  WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);
  WorldWind.configuration.baseUrl = "/worldwind/"
  // Create the WorldWindow.
  var wwd = new WorldWind.WorldWindow(canvasid);

  wwd.navigator = new WorldWind.LookAtNavigator(wwd);
  wwd.navigator.lookAtLocation =  new WorldWind.Location(43.83, 87.57)
  wwd.navigator.range = range
  // Create and add imagery and WorldWindow UI layers.
  const star = new WorldWind.StarFieldLayer('/worldwind/images/stars.json')
  const atmo = new WorldWind.AtmosphereLayer('/worldwind/images/dnb_land_ocean_ice_2012.png')
  const cl = new WorldWind.CompassLayer()
  const vcl = new WorldWind.ViewControlsLayer(wwd)

  var layers = [
      // Imagery layers. StarFieldLayer
      {layer: star, enabled: true},
      {layer: new WorldWind.BMNGLayer(), enabled: true},
      {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
      // Add atmosphere layer on top of all base layers.
      {layer: atmo, enabled: true},
      // WorldWindow UI layers.
      {layer: cl, enabled: true},
      {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
      {layer: vcl, enabled: true}
  ];

  const date = new Date()
  star.time = date
  atmo.time = date
  atmo.pickEnabled = true
  cl.compass.size = 50 / document.querySelector("#"+ canvasid).clientWidth
  cl.compass. imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 1.1, WorldWind.OFFSET_FRACTION, 1.1)
  vcl.fovNarrowControl.enabled = true
  vcl.fovWideControl.enabled = true

  for (var l = 0; l < layers.length; l++) {
      layers[l].layer.enabled = layers[l].enabled;
      wwd.addLayer(layers[l].layer);
  }

  // TODO hard to use
  var annotationAttributes = new WorldWind.AnnotationAttributes(
    {
      _cornerRadius : 18,
      _insets: new WorldWind.Insets(10, 10, 10, 10),
      _backgroundColor: new WorldWind.Color(0.1,0.2,0.7,0.8),
      _leaderGapWidth: 40,
      _leaderGapHeight: 30,
      _opacity: 1,
      _scale: 1,
      _drawLeader: true,
      _width: 200,
      _height: 100,
      _textAttributes: new WorldWind.TextAttributes({
        _color: WorldWind.Color.WHITE,
        _font: new WorldWind.Font(14),
        _offset: new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.0),
        _scale: 1,
        _depthTest: false,
        _enableOutline: false,
        _outlineWidth: 4,
        _outlineColor: new WorldWind.Color(0, 0, 0, 0.5),
      })
    }
  );

  // Set a location for the annotation to point to and create it.
  var location = new WorldWind.Position(43.83, 87.57, 1e2);
  var annotation = new WorldWind.Annotation(location, annotationAttributes);
  // Text can be assigned to the annotation after creating it.
  annotation.label = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  // Create and add the annotation layer to the WorldWindow's layer list.
  var annotationsLayer = new WorldWind.RenderableLayer("Annotations");
  annotationsLayer.addRenderable(annotation);
  wwd.addLayer(annotationsLayer);

  // time change
  const interval = setInterval(() => {
    date.setMinutes(date.getMinutes() + 1)
    star.time = date
    atmo.time = date
  }, 1000);

  return { engine: wwd , interval}
}

export function destroyWorldWind(www) {
  if(www) {
    clearInterval(www.interval)
  }
}

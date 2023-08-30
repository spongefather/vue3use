# vue 集成 three 和 全景图浏览组件

## three.js

- yarn add three --registry https://registry.npm.taobao.org
- yarn add @types/three

## Babylon.js

> 可以直接添加使用，依赖库划分比较明确

- @babylonjs/core 
    - Babylon's core. 
    - 核心工具包
- @babylonjs/materials 
    - a collection of Babylon-supported advanced materials. 
    - 推荐材质包
- @babylonjs/loaders 
    - All of Babylon's official loaders (OBJ, STL, glTF) 
    - 模型加载器
- @babylonjs/post-processes 
    - Babylon's post processes. 
    - 后期处理器
- @babylonjs/procedural-textures 
    - Officially supported procedural textures 
    - 官方支持的纹理贴图
- @babylonjs/serializers 
    - Scene / mesh serializers. 
    - 场景、网格序列化工具
- @babylonjs/gui 
    - Babylon.js GUI module. 
    - 3d内部GUI模块
- @babylonjs/inspector 
    - The stand-aloneBabylon.js Viewer. 
    - 独立于3d的工具

## Google \<model-viewer\>

> [文档](https://modelviewer.dev/docs/index.html)

## 全景组件 `photo-sphere-viewer`

> 此组件有插件支持，并且可以开发插件维护已有功能。已支持的插件包括打标记，画区域，添加图标，添加地图方向，全景视频播放，切换画质，多全景图移动等等，功能完善

- yarn add @photo-sphere-viewer/core -D 

## 全景库 panolens js

`https://pchen66.github.io/panolens.js/docs/index.html`

### Adapters

> Adapters are small pieces of code responsible to load the panorama texture(s) in the Three.js scene.

The supported adapters are:

- equirectangular: the default adapter, used to load full or partial equirectangular panoramas
- equirectangular tiles: used to load tiled equirectangular panoramas
- equirectangular video: used to load equirectangular videos
- cubemap: used to load cubemaps projections (six textures)
- cubemap tiles: used to load tiled cubemap panoramas
- cubemap video: used to load cubemap video
- little planet: used to display equirectangular panoramas with a little planet effect

#### 问题

> 存在多个 canvas 后，可能会有多个事件监听，造成混淆，在路由切换后，还是存在监听占用情况。

## 地图组件库

### Leaflet

### OpenScales

### map box gl js

### openlayers

### cesium

### mapbox.js

### 百度/谷歌/高德/思极等地图服务前端库

## GIS 服务器


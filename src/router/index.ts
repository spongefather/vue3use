import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import { key } from '../store'
import { useStore } from 'vuex'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sphere',
    name: 'sphere',
    component: () => import(/* webpackChunkName: "sphere" */ '../views/SphereView.vue')
  },
  {
    path: '/babylon',
    name: 'babylon',
    component: () => import(/* webpackChunkName: "bblview" */ '../views/BabylonView.vue')
  },
  {
    path: '/filament',
    name: 'filament',
    component: () => import(/* webpackChunkName: "fmview" */ '../views/FilamentView.vue')
  },
  {
    path: '/aframe',
    name: 'aframe',
    component: () => import(/* webpackChunkName: "afview" */ '../views/AFrameView.vue')
  },
  {
    path: '/mvpage',
    name: 'mvpage',
    component: () => import(/* webpackChunkName: "mvview" */ '../views/ModelViewerPage.vue')
  },
  {
    path: '/maps',
    name: 'maps',
    redirect: '/maps/leaflet',
    component: MapView,
    children: [
      {
        path: '/maps/cesium',
        name: 'cesium',
        component: () => import(/* webpackChunkName: "cesium" */ '../views/maps/CesiumView.vue')
      },
      {
        path: '/maps/leaflet',
        name: 'leaflet',
        component: () => import(/* webpackChunkName: "leaflet" */ '../views/maps/LeafletView.vue')
      },
      {
        path: '/maps/worldwind',
        name: 'worldwind',
        component: () => import(/* webpackChunkName: "wwwview" */ '../views/maps/WorldWindView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(
  (to, from, failure) => {
    // store.state.app.switch = false
    const store = useStore(key)
    // console.log(store.state.app.switch)
    store.dispatch('app/afterLoad')
    // store.state.state.switch = false
    // failure()
  }
)

router.beforeEach(
  (to, from, next) => {
    const store = useStore(key)
    // console.log(store.state.app.switch)
    store.dispatch('app/beforeLoad')
    next()
  }
)

export default router

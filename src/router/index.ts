import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '@/views/MapView.vue'
import { key } from '../store'
import { useStore } from 'vuex'

MapView.displayName = 'mapViewWarpper'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/babylon',
    name: 'babylon',
    component: () => import(/* webpackChunkName: "bblview" */ '../views/BabylonView.vue')
  },
  {
    path: '/maps',
    name: 'maps',
    redirect: '/maps/cesium',
    component: () => MapView,
    children: [
      {
        path: '/maps/cesium',
        name: 'cesium',
        component: () => import(/* webpackChunkName: "cesium" */ '../views/maps/CesiumView.vue')
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

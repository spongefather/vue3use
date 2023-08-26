import { createStore, Store, Module } from 'vuex'
import { InjectionKey } from 'vue'
import { app, AppType } from './module/app'

export interface MapInfo {
  [key:string] : any
}

export interface AppState {
  app : MapInfo
}

export const key: InjectionKey<Store<AppState>> = Symbol('store message')

export const store = createStore({
  getters: {},
  modules: {
    app
  }
})

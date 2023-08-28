import { ActionContext } from 'vuex'

export interface AppStoreType {
  switch: boolean
}

const state: AppStoreType = {
  switch: false
}

const mutations = {
  LOAD_START: (st: AppStoreType) => {
    st.switch = true
  },
  LOAD_END: (st: AppStoreType) => {
    st.switch = false
  }
}

const actions = {
  beforeLoad ({ commit } : ActionContext<AppStoreType, any>) {
    commit('LOAD_START')
  },
  afterLoad ({ commit } : ActionContext<AppStoreType, any>) {
    commit('LOAD_END')
  }
}

export const app = {
  namespaced: true,
  state,
  mutations,
  actions
}

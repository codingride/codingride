'use strict'

const state = {
  loading: false
}

const getters = {
  getLoading: (state) => {
    return state.loading
  }
}

const mutations = {
  setLoading: (state, loading) => {
    state.loading = loading
  }
}

const actions = {
  showLoading: ({commit}, loading) => {
    commit('setLoading', loading)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

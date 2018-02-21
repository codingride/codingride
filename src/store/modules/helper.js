'use strict'

const state = {
  loading: false,
  gallery: false
}

const getters = {
  getLoading: (state) => {
    return state.loading
  },
  getGallery: (state) => {
    return state.gallery
  }
}

const mutations = {
  setLoading: (state, loading) => {
    state.loading = loading
  },
  setGallery: (state, gallery) => {
    state.gallery = gallery
  }
}

const actions = {
  showLoading: ({commit}, loading) => {
    commit('setLoading', loading)
  },
  showGallery: ({commit}, gallery) => {
    commit('setGallery', gallery)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

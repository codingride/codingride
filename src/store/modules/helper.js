'use strict'

const state = {
  loading: false,
  gallery: false,
  comment: false
}

const getters = {
  getLoading: (state) => {
    return state.loading
  },
  getGallery: (state) => {
    return state.gallery
  },
  getComment: (state) => {
    return state.comment
  }
}

const mutations = {
  setLoading: (state, loading) => {
    state.loading = loading
  },
  setGallery: (state, gallery) => {
    state.gallery = gallery
  },
  setComment: (state, comment) => {
    state.comment = comment
  }
}

const actions = {
  showLoading: ({commit}, loading) => {
    commit('setLoading', loading)
  },
  showGallery: ({commit}, gallery) => {
    commit('setGallery', gallery)
  },
  showComment: ({commit}, comment) => {
    commit('setComment', comment)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

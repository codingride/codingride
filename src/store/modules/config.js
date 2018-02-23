'use strict'

import config from '../../config.js'

const state = {
  config: {
    xbUrl: config.xbUrl,
    xbPath: config.xbPath,
    xbUser: config.xbUser,
    xbProject: config.xbProject,
    xBAppID: config.xBAppID,
    xbWeb: config.xbWeb
  }
}

const getters = {
  getConfig: (state) => {
    return state.config
  }
}

export default {
  state,
  getters
}

'use strict'

import helper from './modules/helper'
import config from './modules/config'

import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

let store = new VueX.Store({
  modules: {
    helper,
    config
  }
})

export default store

'use strict'

import Vue from 'vue'

Vue.filter('formatDate', function (value) {
  if (value) {
    let date = new Date()
    date.setTime(value)
    return date.toDateString(value)
  }
})

Vue.filter('twitter', function (value) {
  if (value && typeof value === 'string') {
    return value.replace(/[@]/, '')
  }
})

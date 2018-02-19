'use strict'

import vue from 'vue'

vue.filter('formatDate', function (value) {
  if (value) {
    let date = new Date()
    date.setTime(value)
    return date.toDateString(value)
  }
})

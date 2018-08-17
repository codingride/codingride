'use strict';

const path = require('path');

let tools = {}

tools.typeCheck = (data, type) => {
  if(data && type) {
    if(type === 'array') {
      if(Array.isArray(data)) {
        return data;
      } else {
        return null;
      }
    } else if(typeof data === type) {
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

tools.timeToDate = (timeStamp) => {
  if(timeStamp) {
    let date = new Date();
    return date.toDateString(timeStamp);
  } else {
    return null;
  }
}

tools.cleanArray = (array) => {
  array = tools.typeCheck(array, 'array');
  if(array) {
    array = array.filter(value => {
      return value !== '';
    });
  } else {
    array = null;
  }
  return array;
}

tools.lowerCase = (data) => {
  data = tools.typeCheck(data, 'string');
  if(data) {
    return data.toLowerCase().trim();
  } else {
    return null;
  }
}

tools.securePath = (getPath) => {
  return path.normalize(getPath).replace(/^(\.\.[\/\\])+/, '');
}

module.exports = tools;

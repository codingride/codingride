'use strict';

const https = require('https');
const tools = require('./tools');

let request = {}

request.get = (options, callback) => {
  let result = '';
  let error = null;
  if(options) {
    const getRequest = https.request(options, (getResult) => {
      getResult.setEncoding('utf8');
      getResult.on('data', (data) => {
        result += data;
      });
      getResult.on('end', () => {
        onEnd();
      });
    });
    getRequest.on('error', (getError) => {
      error = getError;
    });
    getRequest.end();
  }
  function onEnd() {
    callback(error, result);
  }
}

request.prepareGetRequest = (params, type) => {
  let query = null;
  switch (type) {
    case 'single-id':
    query = `&type=data&request=${params.xbRequest}&id=${params.xbId}`;
      break;
    case 'multi-ids':
    let ids = tools.typeCheck(params.xbId, 'array');
    if(ids) {
      query = `&type=data&request=${params.xbRequest}&id=${params.xbId.join(',')}`;
    } else {
      query = null;
    }
      break;
    case 'single-record':
    query = `&type=data&request=${params.xbRequest}&record=${params.xbRecord}`;
      break;
    case 'nested-records':
    let records = tools.typeCheck(params.xbRecord, 'array');
    if(records) {
      query = `&type=data&request=${params.xbRequest}&record=${params.xbRecord.join('-')}`;
    } else {
      query = null;
    }
      break;
    case 'get-by':
      query = `&type=data&request=${params.xbRequest}&getby=${params.xbGetby}`;
      break;
    case 'request-offset':
    let offset = tools.typeCheck(params.xbOffset, 'object');
    if(offset) {
      query = `&type=data&request=${params.xbRequest}&getby=${params.xbGetby}&offset=${offset.offset}&max=${offset.max}`;
    } else {
      query = null;
    }
      break;
    case 'single-image':
    let size = '';
    if(params.xbSize) {
      size = `&size=${params.xbSize}`
    }
    query = `&type=media&request=${params.xbMedia}${size}`;
      break;
    default:
    query = null;
      break;
  }
  if(query) {
    return {
      host: params.xbUrl,
      path: `/${params.xbPath}/${params.xbUser}/${params.xbProject}/?appid=${params.xbAppID}${query}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } else {
    return null;
  }
}

request.preparePostRequest = (params, type) => {

}

module.exports = request;
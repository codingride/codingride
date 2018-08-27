'use strict';

const settings = require('../settings').Xbuffer;
const request = require('./request');

let content = {}

content.prepareGetConnection = (type, term) => {
  let getRequest = new Object;
  switch (type) {
    case 'home':
    // Try using max= to not bring all posts
    settings.xbRequest = `${settings.xbPrefix}posts`;
    settings.xbGetby = 'postType:article,postPin:Pin';
    settings.xbMax = 6;
    getRequest = request.prepareGetRequest(settings, 'get-by');
      break;
    
    case 'posts':
    let reqType = 'request-offset';
    if(term.type === 'category') {
      type = 'get-by';
      settings.xbGetby = `postCategory-category_link:${term.term},postStatus:Publish`;
    } else if(term.type === 'tag') {
      type = 'get-by';
      settings.xbGetby = `postTags-tag_link:${term.term},postStatus:Publish`;
    } else {
      type = 'request-offset';
    }
    settings.xbRequest = `${settings.xbPrefix}posts`;
    settings.xbOffset = {
      offset: term.offset,
      max: 6
    }
    getRequest = request.prepareGetRequest(settings, 'request-offset');
      break;

    case 'post':
    settings.xbRequest = `${settings.xbPrefix}posts`;
    settings.xbGetby = `postType:article,postStatus:Publish,postLink:${term}`;
    getRequest = request.prepareGetRequest(settings, 'get-by');
      break;

    case 'page':
    settings.xbRequest = `${settings.xbPrefix}posts`;
    settings.xbGetby = `postType:page,postStatus:Publish,postLink:${term}`;
    getRequest = request.prepareGetRequest(settings, 'get-by');
      break;

    default:
    settings.xbRequest = `${settings.xbPrefix}posts`;
    settings.xbGetby = 'postType:article,postStatus:Publish';
    getRequest = request.prepareGetRequest(settings, 'get-by');
      break;
  }
  
  if(getRequest) {
    return getRequest;
  } else {
    return null;
  }
}

content.home = (callback) => {
  let options = content.prepareGetConnection('home');
  if(options) {
    request.get(options, (homeError, homeData) => {
      let homeParams = []
      if(!homeError && homeData) {
        let homeRes = JSON.parse(homeData);
        homeParams = JSON.parse(homeRes.data);
      }
      callback(homeError, homeParams);
    });
  } else {
    callback(false, null);
  }
}

content.page = (term, callback) => {
  // get comments as well or using ajax
  let options = content.prepareGetConnection('page', term);
  if(options) {
    request.get(options, (pageError, pageData) => {
      let pageParams = new Object;
      if(!pageError && pageData) {
        let pageRes = JSON.parse(pageData);
        pageParams = JSON.parse(pageRes.data)[0];
      }
      callback(pageError, pageParams);
    });
  } else {
    callback(false, null);
  }
}

content.category = (term, callback) => {

}

content.keyword = (term, callback) => {
  
}

content.posts = (type, term, offset, callback) => {
  let posts = {
    type: type,
    term: term,
    offset: offset
  }
  let options = content.prepareGetConnection('posts', posts);
  if(options) {
    request.get(options, (postsError, postsData) => {
      let postsParams = new Object;
      if(!postsError && postsData) {
        let postsRes = JSON.parse(postsData);
        postsParams = JSON.parse(postsRes.data);
      }
      callback(postsError, postsParams);
    });
  } else {
    callback(false, null);
  }
}

content.post = (term, callback) => {
  // get comments as well or using ajax
  let options = content.prepareGetConnection('post', term);
  if(options) {
    request.get(options, (postError, postData) => {
      let postParams = new Object;
      if(!postError && postData) {
        let postRes = JSON.parse(postData);
        postParams = JSON.parse(postRes.data)[0];
      }
      callback(postError, postParams);
    });
  } else {
    callback(false, null);
  }
}

module.exports = content;

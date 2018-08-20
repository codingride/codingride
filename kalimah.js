'use strict';

const path = require('path');
const express = require('express');
const app = express();

const settings = require('./settings');
const tools = require('./core/tools');
const content = require('./core/content');

const he = require('he');

app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

// Get home request
app.get('/', (req, res) => {
  // Getting Settings and global vars first
  // Website should not be rendered without global vars
  settings.prepareConfigParams((globalsError, globalsData) => {
    if(!globalsError && globalsData) {
      content.home((homeError, homeData) => {
        if(!homeError && homeData) {
          res.render('index', {
            globalTitle: globalsData.settings.title,
            globalDescription: globalsData.settings.description,
            globalUrl: globalsData.settings.url,
            mainMenu: globalsData.menus.main_menu,
            thisYear: new Date().getFullYear(),
            posts: homeData,
            xbData: settings.Xbuffer,
            social: true,
            twitter: false
          });
        } else {
          res.render('error', {
            globalTitle: globalsData.settings.title,
            globalDescription: globalsData.settings.description,
            globalUrl: globalsData.settings.url,              
            mainMenu: globalsData.menus.main_menu
          });
        }
      });      
    } else {
      res.send('Problem Openning Website!')
    }
  });
});

// Get page request
// @params post slug
app.get('/page/:term', (req, res) => {
  // Getting Settings and global vars first
  // Website should not be rendered without global vars
  settings.prepareConfigParams((globalsError, globalsData) => {
    if(!globalsError && globalsData) {
      let reqParams = req.params;
      let page = '';
      if(reqParams.term) {
        page = tools.typeCheck(reqParams.term, 'string');
      }
      if(page) {
        content.page(page, (pageError, pageData) => {
          if(!pageError && pageData) {
            res.render('page', {
              globalTitle: globalsData.settings.title,
              globalDescription: globalsData.settings.description,
              globalUrl: globalsData.settings.url,
              postTitle: pageData.title,
              postDescription: pageData.short,
              postSlug: pageData.slug,
              postImage: pageData.image,
              mainMenu: globalsData.menus.main_menu,            
              thisYear: new Date().getFullYear(),
              page: pageData,
              xbAppID: settings.Xbuffer.xbAppID,
              social: true,
              twitter: true
            });
          } else {
            res.render('error', {
              globalTitle: globalsData.settings.title,
              globalDescription: globalsData.settings.description,
              globalUrl: globalsData.settings.url,              
              mainMenu: globalsData.menus.main_menu
            });
          }
        });
      } else {
        res.render('error', {
          globalTitle: globalsData.settings.title,
          globalDescription: globalsData.settings.description,
          globalUrl: globalsData.settings.url
        });
      }
    } else {
      res.send('Problem Openning Website!')
    }
  });
});

// Get posts request
app.get('/posts/:type/:term/:offset?', (req, res) => {
  let acceptedTypes = ['category', 'tag'];
  let reqParams = req.params;
  let type = 'posts';
  if(reqParams.type && acceptedTypes.includes(reqParams.type)) {
    type = reqParams.type;
  }
  let offset = 0;
  if(reqParams.offset && typeof parseInt(reqParams.offset) === 'number') {
    offset = parseInt(reqParams.offset);
  }
  settings.prepareConfigParams((globalsError, globalsData) => {
    if(!globalsError && globalsData) {
      let term = 'all';
      if(reqParams.term) {
        term = tools.typeCheck(reqParams.term, 'string');
      }
      content.posts(type, term, offset, (postsError, postsData) => {
        if(!postsError && postsData) {
          res.render('posts', {
            globalTitle: globalsData.settings.title,
            globalDescription: globalsData.settings.description,
            globalUrl: globalsData.settings.url,
            mainMenu: globalsData.menus.main_menu,
            thisYear: new Date().getFullYear(),
            posts: postsData,
            xbAppID: settings.Xbuffer.xbAppID,
            social: true,
            twitter: false
          });
        } else {
          res.render('error', {
            globalTitle: globalsData.settings.title,
            globalDescription: globalsData.settings.description,
            globalUrl: globalsData.settings.url,              
            mainMenu: globalsData.menus.main_menu
          });
        }
      });
    } else {
      res.send('Problem Openning Website!')
    }
  });
});

// Get post request
// @params post slug
app.get('/post/:term', (req, res) => {
  // Getting Settings and global vars first
  // Website should not be rendered without global vars
  settings.prepareConfigParams((globalsError, globalsData) => {
    if(!globalsError && globalsData) {
      let reqParams = req.params;
      let post = '';
      if(reqParams.term) {
        post = tools.typeCheck(reqParams.term, 'string');
      }
      if(post) {
        content.post(post, (postError, postData) => {
          if(!postError && postData) {
            // Decode post content before Pug render
            if(postData.postContent) {
              postData.postContent = he.decode(postData.postContent);
            }
            res.render('post', {
              globalTitle: globalsData.settings.title,
              globalDescription: globalsData.settings.description,
              globalUrl: globalsData.settings.url,
              postTitle: postData.title,
              postDescription: postData.short,
              postSlug: postData.slug,
              postImage: postData.image,
              mainMenu: globalsData.menus.main_menu,            
              thisYear: new Date().getFullYear(),
              post: postData,
              xbData: settings.Xbuffer,
              social: true,
              twitter: true
            });
          } else {
            res.render('error', {
              globalTitle: globalsData.settings.title,
              globalDescription: globalsData.settings.description,
              globalUrl: globalsData.settings.url,
              mainMenu: globalsData.menus.main_menu,
              thisYear: new Date().getFullYear(),
              xbAppID: settings.Xbuffer.xbAppID,
              social: true,
              twitter: false
            });
          }
        });
      } else {
        res.render('error', {
          globalTitle: globalsData.settings.title,
          globalDescription: globalsData.settings.description,
          globalUrl: globalsData.settings.url,
          mainMenu: globalsData.menus.main_menu,
          thisYear: new Date().getFullYear(),
          xbAppID: settings.Xbuffer.xbAppID,
          social: true,
          twitter: false
        });
      }
    } else {
      res.send('Problem Openning Website!')
    }
  });
});

// Handle error requests
app.use((req, res) => {
  // Getting Settings and global vars first
  // Website should not be rendered without global vars
  settings.prepareConfigParams((globalsError, globalsData) => {
    if(!globalsError && globalsData) {
        res.render('error', {
          globalTitle: globalsData.settings.title,
          globalDescription: globalsData.settings.description,
          globalUrl: globalsData.settings.url,
          mainMenu: globalsData.menus.main_menu,
          thisYear: new Date().getFullYear(),
          xbAppID: settings.Xbuffer.xbAppID,
          social: true,
          twitter: false
      });  
    } else {
      res.send('Problem Openning Website!')
    }
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.send({"xb":"xb"});
});

app.listen(3000);

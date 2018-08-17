'use strict';

let settings = {
  Xbuffer: {
    xbUrl: 'xbuffer.net',
    xbPath: 'client',
    xbUser: 'codingride',
    xbProject: 'codingride_website',
    xbPrefix: 'km_',
    xbAppID: 'a335573e11cd411068501267c3dd89a410a477e94a246aeab4b3f51f8a0285d0:web',
    xbRecaptcha: '6LczQEgUAAAAAAzvdhR0Q37Q2lnVOdR49GW5MzI-',
    xbMaxRecords: 9
  },
  Website: {
    title: 'codingRide',
    description: 'Abdullah Alghamdi, a web developer resides in Jeddah, Saudi Arabia.',
    url: 'https://codingride.com'
  },
  Menus: {
    main_menu : {
      home : '/',
      about : '/page/about',
      coding : '/posts/category/coding',
      blog : '/posts/category/blog'
    },
    footer_menu : {
        home : '/',
        about : 'about',
        contact : 'contact'
    }
  }
}

settings.prepareConfigParams = (callback) => {
  let params = {
    settings: settings.Website,
    menus: settings.Menus
  }
  callback(false, params);
}

module.exports = settings;

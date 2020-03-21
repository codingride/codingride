'use strict';

let settings = {
  Xbuffer: {
    xbUrl: 'api.xbuffer.net',
    xbPath: 'v1/client',
    xbUser: 'codingride',
    xbProject: 'website',
    xbPrefix: 'km_',
    xbAppID: 'bb42a7a45b0f183a8b3e8bca798b756b9ff140231bbe6c59df790fd4a9e95ea8:web',
    xbRecaptcha: '6LczQEgUAAAAAAzvdhR0Q37Q2lnVOdR49GW5MzI-',
    xbMaxRecords: 4
  },
  Website: {
    title: 'codingRide',
    description: 'Abdullah Alghamdi, a web developer resides in Jeddah, Saudi Arabia.',
    url: 'https://codingride.com'
  },
  Menus: {
    main_menu : {
      home : '/',
      about : '/about',
      coding : '/category/coding',
      blog : '/category/blog'
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
    config: settings.Website,
    menus: settings.Menus
  }
  callback(false, params);
}

module.exports = settings;

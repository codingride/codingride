'use strict';

var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    lazy: true
  }
});

var grid = document.querySelector( '.grid' );
if(grid) {
  var masonry = new Masonry( grid , {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    gutter: 25,
    horizontalOrder: true,
    initLayout: false,
    percentPosition: true
  });

  imagesLoaded( grid ).on( 'progress', function() {
    // layout Masonry after each image loads
    masonry.layout();
  });
}
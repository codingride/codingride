'use strict';

function openMenu() {
  var burger = document.getElementById('burger');
  var menu = document.getElementById('navbarMenu');
  burger.classList.toggle('is-active');
  menu.classList.toggle('is-active');
}

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

function lightBox() {
  var light = document.getElementById('post-content')
  var boxes = light.getElementsByTagName('img')
  for (var i = 0; i < boxes.length; i++) {
    var linkBox = document.createElement('a')
    var linkExists = document.getElementById('box_' + i)
    if (!linkExists) {
      var imgLink = boxes[i].getAttribute('src')
      boxes[i].setAttribute('id', 'box_' + i)
      boxes[i].parentElement.insertBefore(linkBox, boxes[i])
      linkBox.appendChild(boxes[i])
      linkBox.addEventListener('click', showLightbox, false)
      this.gallery.push({ id: i, image: imgLink })
    }
  }
}

function showLightbox(event) {
  var imgSrc = event.target.src
  var newSrc = imgSrc.replace(/\b(size=)(small|medium)/gi, 'large')
  this.selected = { id: event.target.id, image: newSrc }
  this.$store.dispatch('showGallery', true)
}

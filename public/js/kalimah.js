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

function lightBox() {
  let light = document.getElementById('post-content')
  let boxes = light.getElementsByTagName('img')
  for (let i = 0; i < boxes.length; i++) {
    let linkBox = document.createElement('a')
    let linkExists = document.getElementById('box_' + i)
    if (!linkExists) {
      let imgLink = boxes[i].getAttribute('src')
      boxes[i].setAttribute('id', 'box_' + i)
      boxes[i].parentElement.insertBefore(linkBox, boxes[i])
      linkBox.appendChild(boxes[i])
      linkBox.addEventListener('click', showLightbox, false)
      this.gallery.push({ id: i, image: imgLink })
    }
  }
}

function showLightbox(event) {
  let imgSrc = event.target.src
  let newSrc = imgSrc.replace(/\b(size=)(small|medium)/gi, 'large')
  this.selected = { id: event.target.id, image: newSrc }
  this.$store.dispatch('showGallery', true)
}

<template>
  <div class="container">
    <div v-if="!gotPost" class="has-text-centered"><i class="fas fa-spinner fa-spin fa-lg fa-fw"></i><span class="sr-only">Loading...</span></div>
    <div v-if="post">
      <figure v-if="post.image" class="image boxRide">
        <router-link class="card-footer-item" :to="{ path: '/posts/show/' + post.slug }"><img class="main-image" :src="'https://xbuffer.net/client/manzilak/coding_ride/?type=media&size=large&request=' + post.image + '&appid=' + appID" /></router-link>
        <div class="is-overlay">
          <span class="title is-size-5-touch is-size-1-widescreen is-pulled-right">{{post.title}}</span>
        </div>
      </figure>
      <div v-else>
        <span class="title is-size-5-touch is-size-1-widescreen">{{post.title}}</span>
      </div>
      <p v-if="post.short" class="shorty">
        <span class="subtitle is-size-7-touch is-size-4-widescreen">{{post.short}}</span>
      </p>
      <div class="section">
        <p v-if="post.owner" class="is-pulled-left has-text-primary">
          {{post.owner.name}}<br>
          <small>{{post.date | formatDate}}</small>
        </p>
        <p class="is-pulled-right">
          <a :href="'https://twitter.com/intent/tweet?text=' + post.title + '&url=https://codingride.com/%23/posts/show/' + slug + '&via=codingride'"><span class="icon has-text-primary"><i class="fab fa-lg fa-twitter"></i></span></a>
          <a target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u=https://codingride.com/%23/posts/show/' + slug " class="fb-xfbml-parse-ignore"><span class="icon has-text-primary"><i class="fab fa-lg fa-facebook"></i></span></a>
          <a :href="'https://plus.google.com/share?url=https://codingride.com/%23/posts/show/' + slug" onclick="javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><span class="icon has-text-primary"><i class="fab fa-lg fa-google-plus-g"></i></span></a>
        </p>
      </div>
      <div id="post-content" v-if="post.content" class="content">
        <p v-html="post.content"></p>
      </div>
      <div v-if="post.keywords.length > 0" class="footy">
        <p>Filed under:</p>
        <div class="tags">
          <router-link v-for="(val, key) in post.keywords" :key="key" :to="{ path: '/posts/tag/' + val }" class="tag is-info is-medium">{{val}}</router-link>
        </div>
      </div>
    </div>
    <cr-gallery :gallery="gallery" :selected="selected"></cr-gallery>
  </div>
</template>
<script>
import axios from 'axios'
import gallery from './Gallery'

export default {
  data () {
    return {
      gotPost: false,
      post: null,
      appID: this.$store.state.config.config.xBAppID,
      slug: this.$route.params.post,
      selected: null,
      gallery: []
    }
  },
  created () {
    this.getPost()
  },
  updated () {
    let twitterCard = {
      card: {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      site: {
        name: 'twitter:site',
        content: '@codingride'
      },
      creator: {
        name: 'twitter:creator',
        content: '@codingride'
      },
      title: {
        name: 'twitter:title',
        content: this.post.title
      },
      tescription: {
        name: 'twitter:description',
        content: this.post.short
      },
      tmage: {
        name: 'twitter:image',
        content: 'https://xbuffer.net/client/manzilak/coding_ride/?type=media&size=large&request=' + this.post.image + '&appid=' + this.appID
      }
    }
    this.metaBuilder(twitterCard, 'twitter')

    let social = {
      url: {
        property: 'og:url',
        content: 'https://codingride.com/%23/posts/show/' + this.$route.params.post
      },
      title: {
        property: 'og:title',
        content: this.post.title
      },
      type: {
        property: 'og:type',
        content: 'blog'
      },
      description: {
        property: 'og:description',
        content: this.post.short
      },
      image: {
        property: 'og:image',
        content: 'https://xbuffer.net/client/manzilak/coding_ride/?type=media&size=large&request=' + this.post.image + '&appid=' + this.appID
      }
    }
    this.metaBuilder(social, 'og')
    if (this.post) {
      this.lightBox()
    }
  },
  methods: {
    getPost: function () {
      axios.get('', {
        params: {
          appid: this.appID,
          type: 'data',
          request: 'cr_posts',
          getby: `slug:${this.slug}`
        }
      }).then(post => {
        if (post.data && post.data.data) {
          let parsedPost = JSON.parse(post.data.data)
          this.post = parsedPost[0]
          this.gotPost = true
        }
      }).catch(error => {
        console.log(error)
      })
    },
    metaBuilder: function (params, type) {
      if (type === 'twitter') {
        for (let meta in params) {
          let addMeta = document.createElement('meta')
          addMeta.setAttribute('name', params[meta].name)
          addMeta.setAttribute('content', params[meta].content)
          document.head.appendChild(addMeta)
        }
      }
      if (type === 'og') {
        for (let meta in params) {
          let addMeta = document.createElement('meta')
          addMeta.setAttribute('property', params[meta].property)
          addMeta.setAttribute('content', params[meta].content)
          document.head.appendChild(addMeta)
        }
      }
    },
    lightBox: function () {
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
          linkBox.addEventListener('click', this.showLightbox, false)
          this.gallery.push({ id: i, image: imgLink })
        }
      }
    },
    showLightbox: function (event) {
      let imgSrc = event.target.src
      let newSrc = imgSrc.replace(/\b(size=)(small|medium)/gi, 'large')
      this.selected = { id: event.target.id, image: newSrc }
      this.$store.dispatch('showGallery', true)
    }
  },
  components: {
    'cr-gallery': gallery
  }
}
</script>
<style scoped>
  .boxRide {
    max-height: 280px;
    overflow: hidden;
  }
  .side {
    text-align: right;
  }
  .title {
    background: rgba(54,190,170,0.65);
    padding: 10px;
    color: white;
    line-height: 1.75;
    margin-top: 20px;
  }
  .content {
    margin: 25px 0;
  }
  .shorty {
    margin: 30px 0 0 0;
    border-left: 5px solid #333366;
    padding: 10px;
  }
  .subtitle {
    color: #333366;
  }
  .section {
    padding: 25px 0 25px 0;
  }
  @media screen and (min-width: 800px) {
    .content {
      padding: 0 180px 0 180px;
    }
    .footy {
      padding: 0 180px 0 180px;
    }
    .boxRide {
      height: 280px;
      overflow: hidden;
      margin: 0 auto;
      position: relative;
    }
    img.main-image {
      left: 50%;
      margin-left: -672px;
      top: 50%;
      margin-top: -350px;
      position:absolute;
    }
  }
</style>

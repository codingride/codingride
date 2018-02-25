<template>
  <div class="container">
    <div class="shorty">
      <span class="subtitle is-size-7-touch is-size-4-widescreen">{{$route.name}} "{{$route.params.tag}}"</span>
    </div>
    <div class="grid">
      <template v-for="(v, k) in allPosts">
        <div class="grid-item" :key="k">
          <div class="card boxRide">
            <div class="card-image">
              <figure class="image">
                <router-link v-if="v.image" class="card-footer-item" :to="{ path: '/posts/show/' + v.slug }"><img :src="'https://xbuffer.net/client/manzilak/coding_ride/?type=media&size=large&request=' + v.image + '&appid=' + appID" /></router-link>
                <router-link v-else class="card-footer-item" :to="{ path: '/posts/show/' + v.slug }"><img :src="'https://xbuffer.net/client/manzilak/coding_ride/?type=media&size=large&request=assets/holder.jpg&appid=' + appID" /></router-link>
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p><router-link :to="{ path: '/posts/show/' + v.slug }" class="title is-size-4-touch is-size-3-widescreen">{{v.title}}</router-link></p>
                <small>{{v.date | formatDate}}</small><small class="is-pulled-right"></small>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="columns">
      <div class="column">
        <div v-if="!gotPosts" class="has-text-centered"><i class="fas fa-spinner fa-spin fa-lg fa-fw"></i><span class="sr-only">Loading...</span></div>
        <nav v-if="gotPosts" class="level">
          <a @click="loadPosts" class="level-item has-text-primary">
            <span class="icon"><i class="fas fa-lg fa-redo-alt"></i></span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Masonry from 'masonry-layout'

export default {
  data () {
    return {
      gotPosts: false,
      appID: this.$store.state.config.config.xBAppID,
      allPosts: [],
      count: [],
      offset: 0,
      max: 6
    }
  },
  created () {
    this.getAllPosts()
  },
  updated () {
    return new Masonry('.grid', {
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      gutter: 25
    })
  },
  methods: {
    getAllPosts: function (offset) {
      this.offset = offset || this.offset
      let params = {
        appid: this.appID,
        type: 'data',
        request: 'cr_posts',
        offset: this.offset,
        max: this.max
      }
      if (this.$route.params.tag) {
        params.getby = 'keywords:' + this.$route.params.tag
      }
      if (this.$route.params.category) {
        params.getby = 'parent:' + this.$route.params.category
      }
      axios.get('', {
        params: params
      }).then(posts => {
        if (posts.data && posts.data.data) {
          let data = JSON.parse(posts.data.data)
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              this.allPosts.push(data[i])
            }
          }
          this.gotPosts = true
        }
      }).catch(error => {
        console.log(error.response)
      })
    },
    loadPosts: function () {
      this.gotPosts = false
      let newOffset = this.offset + 6
      this.getAllPosts(newOffset)
    }
  }
}
</script>
<style scoped>
  .title {
    background: rgba(54,190,170,0.65);
    padding: 10px;
    color: white;
    line-height: 2.2;
    margin-top: 20px;
  }
  .shorty {
    margin: 0 0 30px 0;
    border-left: 5px solid #333366;
    padding: 10px;
  }
  .subtitle {
    color: #333366;
  }
  @media screen and (min-width: 800px) {
    .grid-item {
      width: 32%;
    }
  }
  .grid-item {
    float: left;
    margin-bottom: 30px;
  }
  figure img {
    height: 240px;
  }
</style>

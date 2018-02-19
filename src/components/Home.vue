<template>
  <section class="section">
    <div class="container">
      <div v-if="!gotPosts" class="has-text-centered"><i class="fas fa-spinner fa-spin fa-lg fa-fw"></i><span class="sr-only">Loading...</span></div>
      <div v-if="gotPosts" class="swiper-container boxRide">
        <div class="swiper-wrapper">
          <template v-for="(value, key) in posts">
            <div class="swiper-slide" :key="key">
              <figure class="image">
                <img v-if="value.image" :src="'https://xbuffer.net/client/manzilak/coding_ride/?type=media&request=' + value.image + '&appid=' + appID" />
              </figure>
              <div class="is-overlay slide-overlay hero">
                <div class="hero-body">
                  <div v-if="value.title" class="columns">
                    <div class="column is-5 is-offset-6">
                      <router-link :to="{ path: '/posts/show/' + value.slug }"><span v-if="value.title" class="title is-size-5-touch is-size-1-widescreen">{{value.title}}</span></router-link>
                    </div>
                  </div>
                  <div v-if="value.short" class="columns">
                    <div class="column is-4 is-offset-7 sub-column">
                      <span v-if="value.title" class="subtitle is-size-7-touch is-size-3-widescreen">{{value.short}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import axios from 'axios'

export default {
  data () {
    return {
      gotPosts: false,
      posts: [],
      appID: this.$store.state.config.config.xBAppID
    }
  },
  updated () {
    this.getHomeSlides()
  },
  created () {
    this.getHomePosts()
  },
  methods: {
    getHomePosts: function () {
      axios.get('', {
        params: {
          appid: this.appID,
          type: 'data',
          request: 'cr_posts',
          getby: 'type:article,pin:true'
        }
      }).then(posts => {
        if (posts.data && posts.data.data) {
          this.posts = JSON.parse(posts.data.data)
          this.gotPosts = true
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getHomeSlides: function () {
      return new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          lazy: true
        }
      })
    }
  }
}
</script>
<style scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background: transparent;
  }
  .title {
    background: rgba(54,190,170,0.65);
    padding: 10px;
    color: white;
    line-height: 1.75;
  }
  .sub-column {
    border-left: 5px solid #333366;
  }
  .subtitle {
    background-color: whitesmoke;
    padding: 10px;
    color: #333366;
    line-height: 2;
  }
</style>

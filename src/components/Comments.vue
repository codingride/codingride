<template>
  <div>
    <p class="subtitle listHead"><strong>Let's Hear From You</strong> <a class="has-text-primary" @click="addComment"><i class="fa fa-plus-circle fa-lg is-pulled-right" aria-hidden="true"></i></a></p>
    <ul>
      <template v-if="allComments" v-for="(comment, key) in allComments">
        <li :key="key">
          <div class="columns">
            <div class="column is-3"><strong>{{comment.owner}}</strong><br><a class="has-text-primary" :href="'https://twitter.com/' + comment.twitter | twitter" target="_blank"><small v-if="comment.twitter">{{comment.twitter}}</small></a></div>
            <div class="column">{{comment.content}}</div>
          </div>
        </li>
      </template>
      <template v-if="allComments && allComments.length < 1">
        <p class="has-text-centered">Be the first to comment.<br>Click <a @click="addComment">here</a>!</p>
      </template>
    </ul>
    <div v-if="!gotComments" class="space has-text-centered"><i class="fas fa-spinner fa-spin fa-lg fa-fw"></i><span class="sr-only">Loading...</span></div>
    <nav v-if="gotComments"  class="level space">
      <a @click="loadComments" class="level-item has-text-primary">
        <span class="icon"><i class="fas fa-lg fa-redo-alt"></i></span>
      </a>
    </nav>
    <cr-comment :id="id"></cr-comment>
  </div>
</template>
<style scoped>
  .listHead {
    margin-top: 35px;
    padding: 15px;
    background-color: #ededed;
    border-bottom: #dddddd 5px solid;
  }
  .fa, .fas {
    margin-top: 5px;
  }
  ul li {
    padding: 10px;
  }
  ul li:nth-child(even) {
    background-color: #f0f0f0;
  }
  .space {
    margin-top: 35px;
  }
</style>
<script>
import axios from 'axios'
import comment from '@/components/Comment'

export default {
  data () {
    return {
      appID: this.$store.state.config.config.xBAppID,
      gotComments: false,
      allComments: [],
      count: [],
      offset: 0,
      max: 15,
      avatar: null
    }
  },
  props: [
    'id'
  ],
  methods: {
    getComments: function (offset) {
      this.offset = offset || this.offset
      axios({
        method: 'get',
        params: {
          appid: this.appID,
          type: 'data',
          request: 'cr_comments',
          getby: `post_id:${this.id},status:approved`,
          offset: this.offset,
          max: this.max
        }
      }).then(axiosResult => {
        if (axiosResult.data && axiosResult.data.success) {
          let data = JSON.parse(axiosResult.data.data)
          if (data.length > 0) {
            this.allComments = data
          }
        }
        this.gotComments = true
      }).catch(axiosError => {
        this.gotComments = true
        console.log(axiosError)
      })
    },
    addComment: function () {
      this.$store.dispatch('showComment', true)
    },
    loadComments: function () {
      this.gotComments = false
      let newOffset = this.offset + 15
      this.getComments(newOffset)
    }
  },
  mounted () {
    this.getComments()
  },
  components: {
    'cr-comment': comment
  }
}
</script>

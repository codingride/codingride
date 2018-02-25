<template>
  <div class="modal" :class="{ 'is-active': getComment }">
    <div class="modal-background" @click="hideComment"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Comment</p>
          <button class="delete" aria-label="close" @click="hideComment"></button>
        </header>
        <section class="modal-card-body">
          <div v-if="showError" class="notification is-danger">
            <button class="delete" @click="warning = false"></button>
            {{warning}}
          </div>
          <div v-if="showSuccess" class="notification is-success">
            <button class="delete" @click="success = false"></button>
            {{success}}
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="text" placeholder="Your Name" v-model="commentForm.owner" v-validate="'required'" name="get_owner" :class="{'input': true, 'is-danger': errors.has('get_owner') }" @keyup="validate">
              <span class="help is-danger" v-show="errors.has('get_owner')">{{ errors.first('get_owner') }}</span>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="email" placeholder="Your Email" v-model="commentForm.email" v-validate="'required|email'" name="get_email" :class="{'input': true, 'is-danger': errors.has('get_email') }" @keyup="validate">
              <span class="help is-danger" v-show="errors.has('get_email')">{{ errors.first('get_email') }}</span>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="text" v-model="commentForm.website" placeholder="Your Website">
              <span class="icon is-small is-left">
                <i class="fas fa-link"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="text" v-model="commentForm.twitter" placeholder="Your Twitter Account">
              <span class="icon is-small is-left">
                <i class="fab fa-twitter"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <textarea class="textarea" placeholder="Your comment goes here. Be nice! :)" v-model="commentForm.content" v-validate="'required|min:10'" name="get_content" :class="{'input': true, 'is-danger': errors.has('get_content') }" @keyup="validate"></textarea>
              <span class="help is-danger" v-show="errors.has('get_content')">{{ errors.first('get_content') }}</span>
            </p>
          </div>
          <div id="recaptcha"></div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click.prevent="addComment" :disabled="!getReady">Save changes</button>
          <button class="button" @click.prevent="hideComment">Cancel</button>
        </footer>
      </div>
  </div>
</template>
<style scoped>
  .modal-card-head {
    border-bottom: 5px solid #dddddd;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .modal-card-foot {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top: 3px solid #eeeeee;
  }
</style>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      appID: this.$store.state.config.config.xBAppID,
      commentForm: {
        email: sessionStorage.getItem('cr-email'),
        twitter: sessionStorage.getItem('cr-twitter'),
        website: sessionStorage.getItem('cr-website'),
        owner: sessionStorage.getItem('cr-owner'),
        status: 'pending'
      },
      dictionary: {
        en: {
          attributes: {
            get_owner: 'name',
            get_email: 'email address',
            get_content: 'comment'
          }
        }
      },
      showError: false,
      showSuccess: false,
      warning: null,
      success: null,
      getReady: false,
      captchaId: 0,
      captchaRes: null
    }
  },
  props: [
    'id'
  ],
  created () {
    this.$validator.localize(this.dictionary)
  },
  methods: {
    hideComment: function () {
      this.showError = false
      this.showSuccess = false
      this.success = null
      this.warning = null
      this.$store.dispatch('showComment', false)
    },
    addComment: function () {
      if (this.getReady) {
        sessionStorage.setItem('cr-email', this.commentForm.email)
        sessionStorage.setItem('cr-twitter', this.commentForm.twitter)
        sessionStorage.setItem('cr-website', this.commentForm.website)
        sessionStorage.setItem('cr-owner', this.commentForm.owner)
        let time = new Date()
        let params = {
          post_id: this.id,
          parent: '',
          email: this.commentForm.email,
          twitter: this.commentForm.twitter,
          website: this.commentForm.website,
          owner: this.commentForm.owner,
          content: this.commentForm.content,
          date: time.getTime(),
          status: this.commentForm.status
        }
        axios({
          method: 'post',
          data: {
            appid: this.appID,
            type: 'data',
            request: 'cr_comments',
            data: JSON.stringify(params)
          },
          headers: {
            'x-xbuffer-recaptcha': this.captchaRes
          }
        }).then(axiosResponse => {
          console.log(axiosResponse)
          this.showSuccess = true
          this.success = 'Thank you for sending your comment!'
          this.commentForm.content = null
          window.grecaptcha.reset(this.captchaId)
        }).catch(axiosError => {
          console.log(axiosError.response)
          this.showError = true
          this.warning = 'Something went wrong! Please try again later'
          window.grecaptcha.reset(this.captchaId)
        })
      }
    },
    validate: function () {
      this.$validator.validateAll().then((result) => {
        if (result && this.captchaRes) {
          this.getReady = true
          return
        }
        this.getReady = false
      })
    },
    captcha: function () {
      let captcha = document.getElementById('recaptcha')
      if (window.grecaptcha) {
        this.captchaId = window.grecaptcha.render(captcha, {
          'sitekey': this.getConfig.xbRecaptcha,
          'callback': this.getCaptcha,
          'data-size': 'compact'
        })
      }
    },
    getCaptcha: function () {
      let getCaptcha = window.grecaptcha.getResponse(this.captchaId)
      if (getCaptcha) {
        this.captchaRes = getCaptcha
        this.validate()
      }
    }
  },
  mounted () {
    this.captcha()
  },
  computed: {
    ...mapGetters([
      'getComment',
      'getConfig'
    ])
  }
}
</script>

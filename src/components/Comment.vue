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
            {{showError}}
          </div>
          <div v-if="showSuccess" class="notification is-success">
            <button class="delete" @click="success = false"></button>
            {{showSuccess}}
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="text" placeholder="Your Name" v-model="commentForm.owner" v-validate="'required'" name="get_owner" :class="{'input': true, 'is-danger': errors.has('get_owner') }">
              <span class="help is-danger" v-show="errors.has('get_owner')">{{ errors.first('get_owner') }}</span>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="email" placeholder="Your Email" v-model="commentForm.email" v-validate="'required|email'" name="get_email" :class="{'input': true, 'is-danger': errors.has('get_email') }">
              <span class="help is-danger" v-show="errors.has('get_email')">{{ errors.first('get_email') }}</span>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
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
              <textarea class="textarea" placeholder="Your comment goes here. Be nice! :)" v-model="commentForm.content" v-validate="'required'" name="get_content" :class="{'input': true, 'is-danger': errors.has('get_content') }"></textarea>
              <span class="help is-danger" v-show="errors.has('get_content')">{{ errors.first('get_content') }}</span>
            </p>
          </div>
          <div id="re" class="field has-text-aligned-center">
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="addComment">Save changes</button>
          <button class="button" @click="hideComment">Cancel</button>
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

export default {
  data () {
    return {
      commentForm: {
        post_id: null,
        parent: null,
        email: null,
        twitter: null,
        date: null,
        website: null,
        owner: null,
        content: null,
        status: null
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
      showError: null,
      showSuccess: false,
      warning: false,
      success: false
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
      this.$store.dispatch('showComment', false)
    },
    addComment: function () {
      let getCaptcha = document.getElementById('g-recaptcha-response')
      console.log(getCaptcha.value)
    },
    reCaptcha: function () {
      let re = document.getElementById('re')
      let rec = document.createElement('script')
      rec.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
      re.appendChild(rec)
      let site = document.createElement('div')
      site.setAttribute('class', 'g-recaptcha')
      site.setAttribute('data-sitekey', this.getConfig.xbRecaptcha)
      re.appendChild(site)
    }
  },
  mounted () {
    this.reCaptcha()
  },
  computed: {
    ...mapGetters([
      'getComment',
      'getConfig'
    ])
  }
}
</script>

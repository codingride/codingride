<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <figure class="image boxRide">
            <img class="main-image" :src="'https://xbuffer.net/client/manzilak/coding_ride/?type=media&size=large&request=assets/profile.jpg&appid=' + appID" />
            <div class="is-overlay">
              <span class="subtitle is-size-5-touch is-size-3-widescreen is-pulled-right">abddullah alghamdi</span>
            </div>
          </figure>
        </div>
        <div class="column" style="padding: 25px">
          <div class="columns is-mobile">
            <div class="column leftSide has-text-right is-4">
              <strong>name:</strong>
            </div>
            <div class="column">
              abdullah alghamdi
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column leftSide has-text-right is-4">
              <strong>born:</strong>
            </div>
            <div class="column">
              july, 1975
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column leftSide has-text-right is-4">
              <strong>resides:</strong>
            </div>
            <div class="column">
              jeddah, saudi arabia
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column leftSide has-text-right is-4">
              <strong>works:</strong>
            </div>
            <div class="column">
              <a href="https://manzilak.com" target="_blank">manzilak</a>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column leftSide has-text-right is-4">
              <strong>skills:</strong>
            </div>
            <div class="column">
              JavaScript, NodeJS, Express, MongoSB, VueJS, Angular5, Bulma, Pug, PHP, MySQL, iOS, Swift, RealmDB, Firebase, WebRTC
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column leftSide has-text-right is-4">
              <strong>quotes:</strong>
            </div>
            <div class="column">
              <p>“Ah, but a man's reach should exceed his grasp, Or what's a heaven for?”<br><strong>Robert Browning</strong></p>
              <p>“Do it yourself! Nobody knows your shit more than you.”<br><strong>Abdullah Alghamdi</strong></p>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column leftSide has-text-right is-4">
              <strong>social:</strong>
            </div>
            <div class="column">
              <div>twitter: <a href="https://twitter.com/codingride" target="_blank">@codingride</a></div>
              <div>github: <a href="https://github.com/codingride" target="_blank">codingride</a></div>
              <div>linkedin: <a href="https://www.linkedin.com/in/asalghamdi/" target="_blank">asalghamdi</a></div>
              <div>poetry: <a href="https://hellopoetry.com/ayyash/" target="_blank">ayyash</a></div>
              <div>facebook: <a href="https://www.facebook.com/ayyash/" target="_blank">ayyash</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      appID: this.$store.state.config.config.xBAppID
    }
  }
}
</script>

<style scoped>
  .leftSide {
    background-color: lightgray;
  }
  .subtitle {
    background: rgba(54,190,170,0.65);
    padding: 10px;
    color: white;
    line-height: 1.75;
    bottom: 0;
    position: absolute;
  }
</style>

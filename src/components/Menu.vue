<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="@/assets/codingRide.png" :alt="title">
        </router-link>
        <span id="burger" class="navbar-burger burger" data-target="navbarMenu" @click="openMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-start">
          <template v-for="(value, key) in menu">
            <router-link class="navbar-item" active-class="is-active" :to="{ path: '/' + key }" :key="key">{{value}}</router-link>
          </template>
        </div>
        <div class="navbar-end">
          <a class="navbar-item" href="https://twitter.com/codingride"><i class="fab fa-twitter"></i></a>
          <a class="navbar-item" href="https://github.com/codingride"><i class="fab fa-github"></i></a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import menu from '../services/menu'

export default {
  data () {
    return {
      title: 'codingRide',
      menu: menu
    }
  },
  methods: {
    openMenu: function () {
      document.getElementById('burger').classList.toggle('is-active')
      document.getElementById('navbarMenu').classList.toggle('is-active')
    }
  }
}
</script>

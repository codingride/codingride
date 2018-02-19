<template>
  <div id="app">
    <cr-menu></cr-menu>
    <router-view></router-view>
    <cr-footer></cr-footer>
  </div>
</template>
<script>
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
export default {
  components: {
    'cr-menu': Menu,
    'cr-footer': Footer
  }
}
</script>

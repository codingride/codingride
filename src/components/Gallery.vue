<template>
  <div class="modal" :class="{ 'is-active': show }">
  </div>
</template>
<script>
import Swiper from 'swiper'

export default {
  props: [
    'gallery',
    'show'
  ]  
}
</script>
<style scoped>

</style>

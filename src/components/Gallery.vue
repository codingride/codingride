<template>
  <div class="modal" :class="{ 'is-active': getGallery }">
    <div class="modal-background" @click="hideGallery"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <figure class="image">
            <img v-if="selected" :id="'img_' + selected.id" :src="selected.image">
          </figure>
        </section>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      showGallery: this.gallery,
      getSelected: this.selected
    }
  },
  props: [
    'gallery',
    'selected'
  ],
  methods: {
    hideGallery: function () {
      this.$store.dispatch('showGallery', false)
    }
  },
  computed: {
    ...mapGetters([
      'getGallery'
    ])
  }
}
</script>
<style scoped>
@media screen and (min-width: 800px) {
  .modal-content, .modal-card {
      margin: 0 auto;
      max-height: calc(100vh - 40px);
      width: 769px;
  }
}
</style>

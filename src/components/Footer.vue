<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          &copy; <strong>codingRide</strong> {{thisYear}}<br><span class="is-size-7">Powered by <a class="has-text-primary" href="https://xbort.net"><strong>Xbort</strong></a></span>
        </p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      thisYear: new Date().getFullYear()
    }
  }
}
</script>
<style scoped>
a {
  color: purple;
}
</style>

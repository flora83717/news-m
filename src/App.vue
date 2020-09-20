<template>
  <div id="app">
    <h1>頭條新聞</h1>
    <test></test>
    <router-view/>
  </div>
</template>
<script>
import test from "./views/test.vue"
export default {
  name:'App',
  components:{
    test
  }
}
</script>
<style lang="scss">

</style>

<template>
  <img alt="Reddit logo" style="height: 225px;" src="./assets/logo.png">
  <h1>KMP Reddit Scraper</h1>
  <p>Ryan Driscoll & Jacob B. West - CSC 461</p>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {KMP} from "../scripts/KMP.js"

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  setup() {
    let txt = "ABABDABACDABABCABAB"
    let pat = "ABABCABAB"
    KMP(pat, txt);

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

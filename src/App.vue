<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <hk-monitor></hk-monitor>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HKMonitor from './components/HKMonitor/HKMonitor.vue'
// import {WebVideo} from "./components/HKMonitor/webVideo";

export default {
  name: 'App',
  components: {
    'hk-monitor': HKMonitor
  },
  data() {
    return{
      webVideo: null
    }
  },
  mounted() {

  }
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

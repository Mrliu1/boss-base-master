<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/outtercommons/components/Loading'
import '@/assets/css/native-toast.css'
import {bus} from './main.js'
export default {
  name: 'App',
  data () {
    return {
      isLoading: false,
      timer: 0
    }
  },
  components: {
    Loading
  },
  mounted () {
    // 公用的http服务
    bus.$on('loading', (state) => {
      clearTimeout(this.timer)
      this.isLoading = state
      this.timer = setTimeout(() => {
        this.isLoading = false
      }, 5000)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  background: #f5f5f5;
  color: #2c3e50;
  width: 100%;
  height:100%;
}
</style>

<style lang="less" scope>
  @import "./index.less";
</style>

<template>
  <div class="sampleflow">
        <router-view></router-view>
  </div>
</template>

<script>
// 监控进度查询
export default {
  name: 'receive',
  computed: {
    // cachePage () { // 上面导航栏要与路由挂钩，demo还没实现，等待后续开发
    // return this.$store.state.app.cachePage
    // }
  }
}
</script>

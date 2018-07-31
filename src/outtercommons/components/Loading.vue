<template>
  <div class="loading">
    <img class="img" src='../images/icarbon.gif'/>
  </div>
</template>

<script>
export default {
  name: 'loading',
  computed: { // 计算属性
    // loading () {
    // return this.$store.state.common.loading
    // }
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.loading{
  width: 100%;
  top: 33%;
  position: absolute;
  z-index: 100;
}
.img{
      display: block;
    overflow: hidden;
    width: 150px;
    height: 150px;
    position: absolute;
    left: calc((100% - 150px)/2);
    background: #ccc;
}
</style>

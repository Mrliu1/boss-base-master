<style lang="less">
</style>

<template>
   <el-menu
      :route="routers"
      :router="true"
      :default-active="routePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="false"
      background-color="#777"
      text-color="#fff"
      :default-openeds="openeds"
      :collapse-transition="true"
      active-text-color="#ffd04b"
      :active-name="$route.title" :theme="menuTheme">
      <el-submenu v-for="(item,index) in menuList"  :key="index"  :index="item.path.toString()">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item-group v-if="item.children.length > 0"  v-for="(child, _index) in item.children" :key="_index">
            <el-menu-item v-if="!child.children||(child.children&&child.children.length<= 1)" :index="item.path.toString()+'/'+child.path.toString()" >{{child.title}}</el-menu-item>
          <el-submenu v-if="child.children&&child.children.length > 1" :index="child.path.toString()">
            <template slot="title">{{child.title}}</template>
            <el-menu-item v-for="(childr, _indexr) in child.children" :key="_indexr" :index="item.path.toString()+'/'+child.path.toString()+'/'+childr.path.toString()" >{{childr.title}}</el-menu-item>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
import Router from '@/router/index.js'
export default {
  name: 'sidebarMenu',
  props: {
    menuList: Array,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: 'dark'
    }
  },
  data () {
    return {
      routers: Router,
      routePath: this.$route.path
      // openeds: this.openedSubmenuArr // 默认打开全部目录的数组
    }
  },
  created () {
  },
  computed: {
    openeds () {
      return this.$store.state.app.openedSubmenuArr
    }
  },
  watch: {
    $route (to) {
      this.mountedDeal(to)
    }
  },
  mounted () {
    let self = this
    let noChildTabJson = JSON.parse(localStorage.noChildTabJson)
    let nochildKeyArr = Object.keys(noChildTabJson)
    let isNoChild = false
    nochildKeyArr.map((item, index) => {
      if (this.$route.path.indexOf(item) !== -1) {
        isNoChild = true
        self.routePath = item
        self.handleSelect(this.$route.path)
      }
    })
    // 左边菜栏显示到最显示到路由最低层，即没有分页面共享的情况
    if (isNoChild === false) {
      self.handleSelect(this.$route.path)
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('change', key)
      console.log(key, keyPath, 'change')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    mountedDeal (to) {
      let self = this
      let noChildTabJson = JSON.parse(localStorage.noChildTabJson)
      let nochildKeyArr = Object.keys(noChildTabJson)
      let isNoChild = false
      nochildKeyArr.map((item, index) => {
        if (this.$route.path.indexOf(item) !== -1) {
          isNoChild = true
          self.routePath = item
          self.handleSelect(this.$route.path)
        }
      })
      // 左边菜栏显示到最显示到路由最低层，即没有分页面共享的情况
      if (isNoChild === false) {
        self.routePath = to.path
        self.handleSelect(this.$route.path)
      }
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

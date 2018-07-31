<style lang="less">
    @import "./main.less";
</style>
<template>
  <div class="main-app">
    <div class="main" v-if="isNoIframe">
      <div class="app-header">
        <div class="app-header-content">
          <div class="nav-left">
            <img src="../assets/images/logo.jpg" >
            <span>碳云业务运营系统</span>
          </div>
          <div class="nav-right">
            <i class="el-icon-setting"></i>
            <el-dropdown>
              <span class="el-dropdown-link x-font">
                当前用户：张全蛋<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="sidebar-menu">
        <sidebarMenu
        @change="changeHandle"
        :theme="menuTheme"
        :open-names="openedSubmenuArr"
        :menu-list="menuList">
        </sidebarMenu>
      </div>
      <div class="main-header">
        <div class="main-header-flex" @click="handleClick($event)">
          <el-tag
            :key="tag"
            v-for="tag in cachePage"
            closable
            :disable-transitions="false"
            :type="tag==dictNameObj[$route.path]?'danger':''"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
      </div>
      <div class="main-view">
        <div class="single-page">
          <!-- <keep-alive :include="cachePage"> -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="main" v-if="!isNoIframe">
      <div class="main-all">
        <div class="single-page">
          <!-- <keep-alive :include="cachePage"> -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SidebarMenu from '@/outtercommons/views/mainComponent/sidebarMenu/sidebarMenu'
import util from '@/outtercommons/libs/util'
import Router from '@/router/index.js'
export default {
  components: {
    SidebarMenu
  },
  data () {
    // :before-push="beforePush"
    return {
      menuTheme: 'Welcome to Your Vue.js App',
      isNoIframe: true, // 不是内嵌的就显示导航栏，是就隐藏 true:显示，false隐藏 默认true
      isCurrent: false
    }
  },
  computed: {
    menuList () {
      return this.$store.state.app.menuList
    },
    pageTagsList () {
      return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    },
    currentPath () {
      return this.$store.state.app.currentPath
    },
    cachePage () { // 上面导航栏要与路由挂钩，demo还没实现，等待后续开发
      return this.$store.state.app.cachePage
    },
    openedSubmenuArr () {
      return this.$store.state.app.openedSubmenuArr
    },
    dictNameObj () {
      return this.$store.state.app.dictNameObj
    },
    currentPageName () {
      return this.$store.state.app.currentPageName
    }
  },
  created () {
  },
  mounted () {
    // this.init()
    // console.log('cachePage', this.cachePage, this.dictNameObj, this.openedSubmenuArr, this.menuList)
  },
  methods: {
    changeHandle (key) {
      let tagObj = {}
      tagObj = { // 一个一直存在的首页不可删除的首页，主要是做介绍公司的
        title: this.dictNameObj[key],
        path: key,
        name: this.dictNameObj[key]
      }
      this.$store.commit('increateTag', tagObj) // 增加一个缓存页面
      // this.$store.commit('pageOpenedList', tagObj)
      this.$store.commit('setCurrentPath', tagObj)
      this.$store.commit('setCurrentPageName', this.dictNameObj[key])
    },
    handleClose (tag) {
      this.cachePage.splice(this.cachePage.indexOf(tag), 1)
      this.$store.commit('removeTag', tag)
      this.$store.commit('closePage', tag)
      if (tag === this.dictNameObj[this.$route.path]) {
        this.$router.go(-1)
      }
    },
    checkTag (name) {
      let openpageHashTag = Array.from(this.pageTagsList).some(item => {
        if (item.name === name) {
          return true
        }
      })
      if (!openpageHashTag) {
        // 解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, name, this.$route.prams || {}, this.$route.query || {})
      }
    },
    handleClick (event) {
      let target = event.target
      let routerName = target.innerText.replace(/\s+/g, '')
      let dictNameObj = JSON.parse(localStorage.dictNameObj)
      let pathKey = Object.keys(dictNameObj)
      let pathValue = Object.values(dictNameObj)
      let currentPath = ''
      pathValue.forEach((val, index) => {
        if (val === routerName) {
          currentPath = pathKey[index] // 重写path
          Router.push({ path: currentPath })
        }
      })
    }
  },
  watch: {
    $route (to) {
      console.log('to', to)
      // name我路由设置的是英文，标签名的信息设置在title上，故这里通过字典项进行转换
      let name = this.dictNameObj[to.path]
      this.$store.commit('setCurrentPageName', name)
      let pathArr = util.setCurrentPath(this, name)
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.checkTag(name)
      localStorage.currentPageName = name
    }
  }
}
</script>

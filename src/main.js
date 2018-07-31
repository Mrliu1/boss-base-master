// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
// import { Button, Message } from 'element-ui'
import { fomateDict } from '@/outtercommons/libs/toolUtil'
import store from '@/outtercommons/store'
// import {appRouter} from '@/router/router'

import 'element-ui/lib/theme-chalk/index.css' // 默认主题
export const bus = new Vue()

// 在调用 Vue.use 前，给 Message 添加 install 方法
ElementUI.Message.install = function (Vue, options) {
  Vue.prototype.$message = ElementUI.Message
}
Vue.config.productionTip = false
Vue.use(ElementUI)
// 修复为原样就将Button,和Message前面的ElementUI去掉就好
// Vue.use(ElementUI.Button)
// Vue.use(ElementUI.Message)
// Object.defineProperty(Vue.prototype, 'loading', {
// value: function (booleans = false) {
//   this.$emit('loading', booleans)
// }
// })
// 页面字典格式化
Vue.prototype.fomateDict = fomateDict
// 斑马线
Vue.prototype.tableRowClassName = function ({row, rowIndex}) {
  // if (rowIndex % 4 === 0) {
  // return ''
  // } else if (rowIndex % 4 === 1) {
  // return 'warning-row'
  // } else if (rowIndex % 4 === 2) {
  // return ''
  // } else {
  // return 'success-row'
  // }
  if (rowIndex % 2 === 0) {
    return ''
  } else {
    return 'success-row'
  }
}
// 处理导出url的拼接
Vue.prototype.getUrl = function (url, params) {
  let keyArr = Object.keys(params)
  url = url + '?'
  for (let item of keyArr) {
    if (params[item]) {
      url += `${item}=${params[item]}&`
    }
  }
  return url
}
// 保留小数校验
Vue.prototype.changeNumber = function (val, number) {
  if (Number(val).toString() !== 'NaN') {
    let index = val.indexOf('.')
    if (index !== -1) {
      let end = index + number + 1
      let before = val.slice(0, index + 1)
      let afterVal = val.slice(index + 1).replace(/[^\d]/g, '')
      val = before + afterVal + ''
      val = val.slice(0, end)
    }
  } else {
    let length = val.length
    if (length === 0) {
      val = ''
    } else {
      val = val.slice(0, length - 1)
    }
    // 处理失焦时清除非数字
    val = val.replace(/[^\d]/g, '')
  }
  val = val.replace('-', '')
  return val
}
Vue.prototype.loading = function (booleans = false) {
  bus.$emit('loading', booleans)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  isLoading: false,
  components: { App },
  template: '<App/>',
  data: {
    currentPageName: '',
    tagsList: []
  },
  mounted () {
    // 显示打开的页面列表
    // this.$store.commit('setOpenedList')
    this.$store.commit('initCachePage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenuList')
    this.$store.commit('initAllMenu')
  },
  created () {
    // 其他的路由先不做
    // this.tagsList = []
    // this.getList(appRouter)
    // this.$store.commit('setTagsList', this.tagsList)
  },
  methods: {
    // getList (data) {
    // console.log(data)
    // if (data) {
    //   data.map(item => {
    //     if (item.children.length <= 1) {
    //       this.tagsList.push(item.children[0])
    //     } else {
    //       this.getList(item.children)
    //     }
    //   })
    // }
    // }
  }
  // render: h => h(App)
})

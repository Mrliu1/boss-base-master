import {appRouter} from '@/router/router'
// import Vue from 'vue'
import Util from '../../libs/util'

const app = {
  state: {
    cachePage: [], // 持续缓存的路由
    openedSubmenuArr: [], // 组件菜单默认打开数组，boss项目需要全部打开
    menuTheme: 'dark', // 主题 可以在state里配置也可直接使用less的引入主题变量
    themeColor: '',
    dictNameObj: {}, // 路由名字和地址对应的字典项
    pageOpenedList: [{ // 一个一直存在的首页不可删除的首页，主要是做介绍公司的
      title: '首页',
      path: '/hello',
      name: 'home_index'
    }],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ], // 面包数组默认的即上面的tag 位置
    menuList: [], // 侧边栏的路由数组
    routers: [ // 可以扩展其他的路由比如作为Main组件的子页面展示但是不在左侧菜单显示的路由
      ...appRouter
    ],
    // tagsList: [...otherRouter.children],这个是不在侧边栏展示但是在main下面，可以让其弹出个面包栏
    messageCount: 0,
    dontCache: [] // 不想缓存的页面
  },
  mutations: {
    // 这个是不在侧边栏展示但是在main下面，可以让其弹出个面包栏
    // setTagsList (state, list) {
    // 	state.tagsList.push(...list)
    // }
    updateMenuList (state) {
      // let accesCode = parseInt(Cookies.get('access')) // 校验通过已登录
      // let accesCode = '123456'
      let menuList = []
      // 以后思考下要不要在这里做一下权限判断
      appRouter.forEach((item, index) => {
        if (item.children.length === 1) {
          menuList.push(item)
        } else {
          let len = menuList.push(item)
          let childrenArr = []
          // 过滤，根据每个人员的权限取显示该显示的子路由
          childrenArr = item.children.filter(child => child)
          if (childrenArr === undefined || childrenArr.length === 0) {
            menuList.splice(len - 1, 1)
          } else {
            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
            handledItem.children = childrenArr
            menuList.splice(len - 1, 1, handledItem)
          }
        }
      })
      // console.log(state.menuList)
      state.menuList = menuList
    },
    changeMenuTheme (state, theme) {
      state.menuTheme = theme
    },
    changeMainTheme (state, mainTheme) {
      state.themeColor = mainTheme
    },
    // 默认展开所有
    initAllMenu (state) {
      let menuList = []
      // state.openedSubmenuArr = arr
      if (state.menuList) {
        menuList = state.menuList
      } else {
        // 以后思考下要不要在这里做一下权限判断
        appRouter.forEach((item, index) => {
          if (item.children.length === 1) {
            menuList.push(item)
          } else {
            let len = menuList.push(item)
            let childrenArr = []
            // 过滤，根据每个人员的权限取显示该显示的子路由
            childrenArr = item.children.filter(child => child)
            if (childrenArr === undefined || childrenArr.length === 0) {
              menuList.splice(len - 1, 1)
            } else {
              let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
              handledItem.children = childrenArr
              menuList.splice(len - 1, 1, handledItem)
            }
          }
        })
      }
      let changeArr = []
      let noChildTabJson = {} // 同一个页面路由编号标题和侧边栏不变的数组
      // let changeArr = menuList.map(val => val.path)
      let dictNameObj = {} // tag显示的总名字的字典项
      let middleKey = ''
      function getOpens (menuList) {
        // body...
        menuList.forEach((val, index) => {
          let dictNameKey = ''
          // if (val.children && val.children.length > 1) {
          if (val.children) {
            if (val.path.indexOf('/') !== -1) {
              middleKey = val.path + ''
            } else {
              if (middleKey.indexOf('/' + val.path) === -1 && index !== 0) {
                // 解决多层嵌套是没有那个值，index值为-1，会把路径截去一个字符
                if (middleKey.indexOf('/' + menuList[index - 1].path) !== -1) {
                  middleKey = middleKey.slice(0, middleKey.indexOf('/' + menuList[index - 1].path)) + '/' + val.path
                } else {
                  middleKey = middleKey + '/' + val.path
                }
              } else {
                middleKey += '/' + val.path
              }
            }
            changeArr.push(val.path)
            getOpens(val.children)
            if (val.noChildTab === true) {
              noChildTabJson[middleKey] = val.title
              dictNameObj[middleKey] = val.title
            }
            // else {
            // getOpens(val.children)
            // }
          } else {
            dictNameKey = middleKey + '/' + val.path
            dictNameObj[dictNameKey] = val.title
          }
        })
      }
      getOpens(menuList)
      state.dictNameObj = dictNameObj
      localStorage.setItem('noChildTabJson', JSON.stringify(noChildTabJson))
      localStorage.setItem('dictNameObj', JSON.stringify(state.dictNameObj))
      state.openedSubmenuArr = changeArr
    },
    // 展开的侧边栏处理默认全打开我这边这个数组可以不处理在侧边栏组件进行处理就好
    addOpenSubmenu (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name)
      }
    },
    // 这里可能改为对象包含name的,去除一页去掉上部tag页面
    closePage (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
      localStorage.setItem('cachePage', JSON.stringify(state.cachePage))
    },
    initCachePage (state) {
      // 利用localStorage永久保存页面缓存信息，起到下次进来显示的目的
      if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage)
      }
    },
    // 删除一个tag
    removeTag (state, name) {
      Array.from(state.pageOpenedList).map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
      localStorage.setItem('pageOpenedList', JSON.stringify(state.pageOpenedList))
    },
    // tag已经存在的页面
    pageOpenedList (state, get) {
      let openedPage = state.pageOpenedList[get.index]
      state.pageOpenedList.splice(get.index, 1, openedPage)
      localStorage.setItem('pageOpenedList', JSON.stringify(state.pageOpenedList))
    },
    clearAllTags (state) {
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
      localStorage.setItem('cachePage', JSON.stringify(state.cachePage))
      localStorage.setItem('pageOpenedList', JSON.stringify(state.pageOpenedList))
    },
    clearOtherTags (state, vm) {
      let currentName = vm.$route.name
      let currentIndex = 0
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName
      })
      state.cachePage = newCachepage
      localStorage.setItem('cachePage', JSON.stringify(state.cachePage))
      localStorage.setItem('pageOpenedList', JSON.stringify(state.pageOpenedList))
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name
    },
    increateTag (state, tagObj) {
      if (!Util.oneOf(tagObj.name, state.dontCache) && state.cachePage.indexOf(tagObj.name) === -1) {
        state.cachePage.push(tagObj.name)
        // localStorage.cachePage = JSON.stringify(state.cachePage)
        localStorage.setItem('cachePage', JSON.stringify(state.cachePage))
      }
      state.pageOpenedList.push(tagObj)
      state.pageOpenedList = Array.from(new Set(state.pageOpenedList))
      localStorage.setItem('pageOpenedList', JSON.stringify(state.pageOpenedList))
    }
  }
}

export default app

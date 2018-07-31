import IcarbonxHello from '@/outtercommons/components/icarbonxHello'
import Main from '@/views/Main'

import {monitorRouter} from './monitorRouter'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  bossName: 'login',
  meta: {
    name: '登录',
    title: 'Login - 登录'
  },
  component: () => import('@/views/login.vue')
}
export const helloWorld = [
  {
    path: '/home',
    bossName: 'home',
    component: Main,
    children: [
      {
        path: 'hello',
        name: '首页',
        title: '首页',
        bossName: 'IcarbonxHello',
        component: IcarbonxHello
      }
    ]
  }
]
export const appRouter = [
  ...monitorRouter
]
export const appRouterString = JSON.stringify(appRouter)
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  ...appRouter
]

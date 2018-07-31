import Main from '@/views/Main'
export const monitorRouter = [
  {
    path: '/basemonitor',
    icon: 'el-icon-menu',
    bossName: 'monitor',
    name: '监控',
    title: '监控',
    component: Main,
    children: [
      {
        path: 'monitorQuery',
        icon: 'el-icon-edit-outline',
        bossName: 'monitorQuery',
        name: '监控进度查询',
        title: '监控进度查询',
        component: resolve => require(['@/views/monitor/monitorQuery/index.vue'], resolve),
        children: [
          {
            path: 'monitorTestordersFlow',
            icon: 'el-icon-edit-outline',
            bossName: 'monitorTestordersFlow',
            name: '检测订单进度监控',
            title: '检测订单进度监控',
            component: resolve => require(['@/views/monitor/monitorQuery/monitorTestordersFlow.vue'], resolve)
          },
          {
            path: 'monitorViewSampleFlowNodes',
            icon: 'el-icon-edit-outline',
            bossName: 'monitorViewSampleFlowNodes',
            name: '样本流程监控',
            title: '样本流程监控',
            component: resolve => require(['@/views/monitor/monitorQuery/monitorViewSampleFlowNodes.vue'], resolve)
          }
        ]
      }
    ]
  }
]

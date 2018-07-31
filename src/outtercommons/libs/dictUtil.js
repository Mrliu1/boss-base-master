// import {dictToSelectArray} from './toolUtil.js'
// 微基因样本状态字典
export const micDictState = {
  '1': '绑定成功',
  '2': '收到样本',
  '3': 'DNA提取成功',
  '4': '上机检测初次失败',
  '5': '上机检测',
  '6': '报告生成',
  '7': '上机检测失败',
  '-1': 'DNA提取失败'
}
// 微基因样本状态数组
export const micStateDataList = [
  {key: '1', value: '绑定成功'},
  {key: '2', value: '收到样本'},
  {key: '3', value: 'DNA提取成功'},
  {key: '4', value: '上机检测初次失败'},
  {key: '5', value: '上机检测'},
  {key: '6', value: '报告生成'},
  {key: '7', value: '上机检测失败'},
  {key: '-1', value: 'DNA提取失败'}
]
// 快递公司中文状态字典
export const expressCompanyJson = {
  'shunfeng': '顺丰',
  'yuantong': '圆通',
  'shentong': '申通',
  'zhongtong': '中通',
  'huitongkuaidi': '汇通',
  'yunda': '韵达',
  'zhaijisong': '宅急送',
  'debangwuliu': '德邦',
  'baiaoquan': '百奥泉'
}

// 包裹状态《样本库登记页面》
export const checkInStateJson = {
  'CheckIn': '已登记',
  'UnCheckIn': '待登记',
  'Destroyed': '已作废'
}

// 实验项目进度查询 状态列表
export const bosslabStateDictList = {
  'Pending': '待处理',
  'Started': '实验进行中',
  'Finished': '试验完成',
  'failed': '实验失败',
  'Cancel': '取消'
}
export const bosslabStateList = [
  {
    key: 'Pending',
    value: '待处理'
  },
  {
    key: 'Started',
    value: '实验进行中'
  },
  {
    key: 'Finished',
    value: '试验完成'
  },
  {
    key: 'failed',
    value: '实验失败'
  },
  {
    key: 'Cancel',
    value: '取消'
  }
]
// 阴阳质控 质控类型
export const qcTypeList = [
  {
    key: 'PTC',
    value: '阳性质控'
  },
  {
    key: 'NTC',
    value: '阴性质控'
  }
]
export const qcTypeDict = {
  'PTC': '阳性质控',
  'NTC': '阴性质控'
}
// 样本状态字典 质控的
export const sampleStateDict = {
  SENDING_BACK: '回寄中',
  NOT_ALLOW_STOCK_IN: '禁止入库',
  CREATED: '可入库',
  WAIT_FOR_STOCK_IN: '待入库',
  BEING_STOCK_IN: '入库中',
  STOCK_IN: '已入库',
  WAIT_FOR_STOCK_OUT: '待出库',
  STOCK_OUT: '已出库',
  DESTROYED: '已销毁',
  DESTROY_APPROVAL_PENDING: '销毁待审批',
  DESTROY_STOCK_OUT_PENDING: '销毁待出库',
  WAIT_FOR_DESTROYED: '待销毁',
  SENDING_OUT: '已外送'
}
// 样本状态字典 质控的
export const sampleStateArr = [
  {key: 'SENDING_BACK', value: '回寄中'},
  {key: 'NOT_ALLOW_STOCK_IN', value: '禁止入库'},
  {key: 'CREATED', value: '可入库'},
  {key: 'WAIT_FOR_STOCK_IN', value: '待入库'},
  {key: 'BEING_STOCK_IN', value: '入库中'},
  {key: 'STOCK_IN', value: '已入库'},
  {key: 'WAIT_FOR_STOCK_OUT', value: '待出库'},
  {key: 'STOCK_OUT', value: '已出库'},
  {key: 'DESTROYED', value: '已销毁'},
  {key: 'DESTROY_APPROVAL_PENDING', value: '销毁待审批'},
  {key: 'DESTROY_STOCK_OUT_PENDING', value: '销毁待出库'},
  {key: 'WAIT_FOR_DESTROYED', value: '待销毁'},
  {key: 'SENDING_OUT', value: '已外送'}
]
// 质控方案的状态
export const qcProgressStateDict = {
  Active: '启用',
  Disabled: '禁用'
}
// 质控交付周期类型
export const qcRoundTypeDict = {
  WORKING_DAY: '工作日',
  NATURAL_DAY: '自然日'
}
// 质控交付周期类型
export const qcRoundTypeArrData = [
  {key: 'WORKING_DAY', value: '工作日'},
  {key: 'NATURAL_DAY', value: '自然日'}
]
// 质控结果是否验证数据
export const signData = [
  {key: true, value: '是'},
  {key: false, value: '否'}
]
// 质控结果是否验证数据
export const signDataDict = {
  true: '是',
  false: '否'
}
// 质控结果是否验证数据提取状态
export const isolationData = [
  {key: 'Success', value: '成功'},
  {key: 'Fail', value: '失败'}
]
// 质控结果是否验证数据提取状态
export const isolationDataDict = {
  'Success': '成功',
  'Fail': '失败'
}

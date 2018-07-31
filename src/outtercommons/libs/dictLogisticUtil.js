// 订单来源
export const sourceTypeDict = {
  'SampleOutsource': '样本外寄',
  'MailProduct': '检测产品',
  'SamplingPostBack': '现场采样回寄',
  'PostBackSamples': '盒子回寄',
  'StockOutGoods': '实物商品出库'
}
// 物流状态
export const stateDict = {
  'WaitForPickup': '待揽件',
  'PickUp': '已揽件',
  'OnTheWay': '在途中',
  'Exception': '疑难',
  'HandledException': '已处理异常',
  'Delivery': '已签收',
  'Unknown': '未知'
}

// 物流公司
export const expressCompanyDict = {
  'shunfeng': '顺丰',
  'yuantong': '圆通',
  'shentong': '申通',
  'zhongtong': '中通',
  'huitongkuaidi': '汇通',
  'yunda': '韵达',
  'zhaijisong': '宅急送',
  'debangwuliu': '德邦',
  'baiaoquan': '百奥泉',
  'chengshiyingji': '城市映急',
  'fedex': 'Fedex'
}

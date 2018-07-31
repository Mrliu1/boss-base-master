import http from '../http.js'
/**
 * [description]  监控信息展示接口 get请求--start
 * @param  {[type]} params [description]所属模块： 预警监控 (monitor)
 * @return {[type]}       [description]
 */
export const getMonitorflowMsgList = (datas = {}) => {
  let params = Object.assign({}, {
    pageSize: '20',
    pageNum: '1',
    bizId: '', // 业务ID（检测订单ID/样本编码）
    personId: '', // PID
    state: '', // 状态
    currentNodeState: '',
    currentNodeName: '', // 当前流程名称, 按具体流程划分
    flowType: '' // 流程类型,EXAM_ORDER_TRACE:检测订单监控;SAMPLE_TRACE:样本监控
  }, datas)
  let URL = `/monitor/flow/instances`
  let type = 'get'
  let returnData = http.request(params, type, URL)
  return returnData
}
/**
 * [description]  获取流程节点列表接口 get请求--start
 * @param  {[type]} params [description]所属模块： 预警监控 (monitor)
 * @return {[type]}       [description]
 */
export const getMonitorflowNodes = (datas = {}) => {
  let params = Object.assign({}, {
    pageSize: '20',
    pageNum: '1',
    flowInstanceId: '' // 流程实例ID
  }, datas)
  let URL = `/monitor/flow/instances/${params.flowInstanceId}`
  let type = 'get'
  let returnData = http.request({}, type, URL)
  return returnData
}

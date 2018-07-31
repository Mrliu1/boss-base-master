<style lang="less" >
  @import "./childCommon.less";
</style>
<template>
  <div class="parcel-collector">
    <div class="parcel-header">
      <div class="tab">
        <el-input class="tab-input" v-model="bizId" placeholder="样本ID"/>
      </div>
      <div class="tab">
        <el-input class="tab-input" v-model="personId" placeholder="PID"/>
      </div>
      <!-- <div class="tab">
        <el-input class="tab-input" v-model="examId" placeholder="检测订单"/>
      </div> -->
      <div class="tab">
        <el-select v-model="state" clearable placeholder="状态">
          <el-option
            v-for="item in flowStateData"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="tab">
        <el-select v-model="currentNodeName" clearable placeholder="当前节点">
          <el-option
            v-for="item in nodeData"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="tab operating">
        <el-button class="icon" type="primary" @click="getList(tableDataPagination.pageSize, 1)">
          <i class="el-icon-search"></i>
          <span>查询</span>
        </el-button>
      </div>
      <div class="tab operating">
        <el-button class="icon" type="primary" @click="clearList">
          <i class="el-icon-refresh"></i>
          <span>重置</span>
        </el-button>
      </div>
      <div class="tab operating">
        <el-button class="icon" type="primary" @click="isShowExport">
        <i class="el-icon-download"></i>
          <span>导出</span>
        </el-button>
      </div>
    </div>
    <div class="parcel-main">
      <el-table
        :header-row-class-name="tableheaderClassName"
        :data="tableData"
        :row-class-name="tableRowClassName"
        highlight-current-row
        @row-click="handleCurrentChangeChild"
        :height="changeHeight"
        border
        style="width: 100%">
        <el-table-column
          show-overflow-tooltip
          type="index"
          fixed="left"
          label="次序">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          fixed
          prop="bizId"
          label="检测样本ID"
          width="140">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          fixed
          width="130"
          prop="personId"
          label="PID">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          fixed
           width="80"
          label="状态">
          <template slot-scope="scope">
            <span :class="flowStateDicDataColor[scope.row.state]">{{scope.row.stateName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="currentNodeNameFm"
          label="当前节点名称">
          <template slot-scope="scope">
            <span :class="nodeDictDataColor[scope.row.currentNodeName]">{{scope.row.currentNodeNameFm}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="startTimeFm"
          label="开始时间"
          width="165">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="finishTimeFm"
          label="完成时间"
          width="165">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          fixed="right"
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click.stop="handleDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.tableDataPagination.pageNum"
      :page-sizes="[30, 100, 200, 300, 400]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.tableDataPagination.totalSize?this.tableDataPagination.totalSize:0">
    </el-pagination>
    </div>
    <div class="childDetail"  v-show="centerDialogVisible">
      <el-dialog :title="detailTitle" :visible.sync="centerDialogVisible"  width="80%" center>
        <div class="dialog-main">
          <ul>
            <TableTemplate :multipleSelection="tableBaseData" :tableHeight="tableHeight" :headerData="headerData" ></TableTemplate>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import nativeToast from 'native-toast'
import TableTemplate from '@/outtercommons/components/tableTemplate.vue'
import {formDate} from '@/outtercommons/libs/toolUtil.js'
import {getMonitorflowMsgList, getMonitorflowNodes} from '@/api/monitor/monitorHomeApi.js'
// 样本流程监控
export default {
  name: 'monitorViewSampleFlowNodes',
  data () {
    return {
      centerDialogVisible: false,
      centerDialogVisibleDown: false,
      downTipsMsg: '',
      tableHeight: 350,
      currentRow: null,
      headerData: [], // 传递的列的数据
      tableBaseData: [], // 表格具体数据
      tableDataPagination: {}, // 分页信息
      tableData: [],
      bizId: '', // 业务ID（检测订单ID/样本编码）
      personId: '', // PID
      state: '', // 状态
      flowInstanceId: '', // 流程实例Id
      currentNodeName: '', // 当前流程名称, 按具体流程划分
      detailTitle: '', // 详情的命名
      flowType: '', // 流程类型,EXAM_ORDER_TRACE:检测订单监控;SAMPLE_TRACE:样本监控
      flowStateData: [], // 状态数组
      flowStateDicData: {}, // 状态字典项对象
      currentFlowNodeData: [], // 当前节点
      currentFlowNodeDictData: {}, // 当前节点字典项对象
      nodeData: [], // 当前节点名称数据
      nodeDictData: {}, // 当前节点名称字典数据
      expireStateData: [],
      expireDictData: {},
      nodeDictDataColor: {}, // 颜色字典项
      flowStateDicDataColor: {}, // 状态颜色字典项对象
      expireDictDataColor: {}
    }
  },
  components: {
    TableTemplate
  },
  computed: {
    changeHeight () {
      let appDom = document.getElementById('app')
      // return appDom.clientHeight - 180 // 新版boss
      return appDom.clientHeight - 130 // 旧版boss
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    projectId: function (newQuestion, oldQuestion) {
      this.stageData = this.stageDataJson[newQuestion]
      // let params = {'projectId': newQuestion}
      // getStageIndex(params).then(res => {
      // this.stageData = res.data
      // let stageDictData =[]
      // this.stageData.forEach(item => {
      //   stageDictData[item.id]=item.name
      // })
      // this.stageDictData =stageDictData
      // })
    }
  },
  created () {
    // 先获取过滤条件先选项目，项目和阶段是级联关系
    this.loading(true)
    this.getInitList()
  },
  mounted () {
    // let appDom = document.getElementById('app')
    let middleHeight = document.body.clientHeight - 240
    let tableWidth = document.body.clientWidth
    this.tableHeight = middleHeight > 350 ? 350 : middleHeight
    this.headerData = [
      {key: 'currentNodeNameFm', value: '节点名称', template: false, width: tableWidth < 1200 ? 90 : null},
      {key: 'stateName', value: '节点状态', template: true, width: null},
      {key: 'startTimeFm', value: '开始时间', template: false, width: 165},
      {key: 'finishTimeFm', value: '完成时间', template: false, width: 165},
      {key: 'expectTimeFm', value: '预计完成时间', template: false, width: 165},
      {key: 'expireStateName', value: '是否超时', template: true, width: null}
    ]
  },
  methods: {
    tableheaderClassName ({row, rowIndex}) {
      console.log(row, rowIndex)
      return 'table-head-th'
    },
    // cellStyle ({row, rowIndex}) {
    // console.log(row, rowIndex)
    // return {color: #18E}
    // },
    handleDetail (obj) {
      this.detailTitle = `检测样本${obj.bizId}详情`
      let params = {
        flowInstanceId: obj.id
      }
      this.centerDialogVisible = true
      getMonitorflowNodes(params).then(res => {
        if (res === false) {
          return
        }
        let dataArr = Array.from(res.data)
        dataArr.map(value => {
          value['expectTimeFm'] = formDate(value.expectTime)
          value['finishTimeFm'] = formDate(value.finishTime)
          value['startTimeFm'] = formDate(value.startTime)
          value['stateName'] = this.flowStateDicData[value.state]
          value['expireStateName'] = this.expireDictData[value.expireState]
          value['currentNodeNameFm'] = this.nodeDictData[value.name]
          value['stateNameColor'] = this.flowStateDicDataColor[value.state]
          value['expireStateNameColor'] = this.expireDictDataColor[value.expireState]
        })
        this.tableBaseData = dataArr
        let len = this.tableBaseData.length
        let middleHeight = 200 + len * 10
        this.tableHeight = middleHeight > 350 ? 350 : middleHeight
        // if (dataArr && dataArr !== undefined) {
        // let len = dataArr.length
        // console.log(len)
        // this.tableHeight = len >= 10 ? 350 : ''
        // }
      })
    },
    goBack () {
      this.centerDialogVisible = false
    },
    getInitList () {
      // 流程状态
      let flowStateData = [
        {
          key: 'PROCESSING',
          value: '进行中',
          color: '#FFB90F'
        },
        {
          key: 'FINISHED',
          value: '已完成',
          color: '#84d945'
        }
      ]
      let flowStateDicData = {
        'PROCESSING': '进行中',
        'FINISHED': '已完成'
      }
      // let flowStateDicDataColor = {
      // 'PROCESSING': 'yelloFontcolor',
      // 'FINISHED': 'newGreen'
      // }
      let flowStateDicDataColor = {
        'PROCESSING': 'newBlack',
        'FINISHED': 'newBlack'
      }
      // 当前节点
      let currentFlowNodeData = [
        {
          key: 'PROCESSING',
          value: '进行中'
        },
        {
          key: 'FINISHED',
          value: '已完成'
        }
      ]
      let currentFlowNodeDictData = {
        'PROCESSING': '进行中',
        'FINISHED': '已完成'
      }
      // let nodeData = [
      // {key: 'bound', value: '样本绑定', color: '#000'},
      // {key: 'postback', value: '样本回寄', color: '#FFB90F'},
      // {key: 'stockin', value: '样本入库', color: '#C67171'},
      // {key: 'inexperiment', value: '实验检测', color: '#B2DFEE'},
      // {key: 'analysis', value: '数据分析', color: '#79CDCD'},
      // {key: 'bdpSynced', value: '同步至BDP', color: '#84d945'}
      // ]
      let nodeData = [
        {key: 'bound', value: '样本绑定', color: '#000'},
        {key: 'postback', value: '样本回寄', color: '#000'},
        {key: 'stockin', value: '样本入库', color: '#000'},
        {key: 'inexperiment', value: '实验检测', color: '#000'},
        {key: 'analysis', value: '数据分析', color: '#000'},
        {key: 'bdpSynced', value: '同步至BDP', color: '#000'}
      ]
      let nodeDictData = {
        'bound': '样本绑定',
        'postback': '样本回寄',
        'stockin': '样本入库',
        'inexperiment': '实验检测',
        'analysis': '数据分析',
        'bdpSynced': '同步至BDP'
      }
      // 状态字典颜色
      // let nodeDictDataColor = {
      // 'bound': 'baseFontColor',
      // 'postback': 'yelloFontcolor',
      // 'stockin': 'deepYelloFontcolor',
      // 'inexperiment': 'littleBlue',
      // 'analysis': 'acidBlue',
      // 'bdpSynced': 'newGreen'
      // }
      let nodeDictDataColor = {
        'bound': 'newBlack',
        'postback': 'newBlack',
        'stockin': 'newBlack',
        'inexperiment': 'newBlack',
        'analysis': 'newBlack',
        'bdpSynced': 'newBlack'
      }
      // 是否过期状态
      let expireStateData = [
        {
          key: 'EXPIRED',
          value: '已超时',
          color: '#de5145'
        },
        {
          key: 'NORMAL',
          value: '正常',
          color: '#84d945'
        }
      ]
      // let expireDictDataColor = {
      // 'EXPIRED': 'newRed',
      // 'NORMAL': 'newGreen'
      // }
      let expireDictDataColor = {
        'EXPIRED': 'newBlack',
        'NORMAL': 'newBlack'
      }
      let expireDictData = {
        'EXPIRED': '已超时',
        'NORMAL': '正常'
      }
      // 颜色字典项
      this.nodeDictDataColor = nodeDictDataColor // 颜色字典项
      this.flowStateDicDataColor = flowStateDicDataColor // 状态颜色字典项对象
      this.expireDictDataColor = expireDictDataColor
      // 其他字典项
      this.expireStateData = expireStateData
      this.expireDictData = expireDictData // 是否超时的字典
      this.nodeData = nodeData
      this.nodeDictData = nodeDictData
      this.currentFlowNodeData = currentFlowNodeData
      this.currentFlowNodeDictData = currentFlowNodeDictData
      this.flowStateData = flowStateData
      this.flowStateDicData = flowStateDicData
      this.getList() // 初始化的列表
    },
    getList (obj = 30, objC = 1) {
      let param = {
        pageSize: obj,
        pageNum: objC,
        bizId: this.bizId, // 业务ID（检测订单ID/样本编码）
        personId: this.personId, // PID
        state: this.state, // 检测订单
        currentNodeName: this.currentNodeName, // 当前流程名称, 按具体流程划分
        flowType: 'SAMPLE_TRACE' // 流程类型,EXAM_ORDER_TRACE:检测订单监控;SAMPLE_TRACE:样本监控
      }
      this.loading(true)
      setTimeout(() => {
        this.loading(false)
      }, 3000)
      getMonitorflowMsgList(param).then((res) => {
        this.loading(false)
        if (res === false) {
          return
        }
        let dataJson = res.data // 包含分页信息
        this.tableDataPagination = {
          'totalSize': dataJson.totalSize,
          'pageNum': objC,
          'pageSize': param.pageSize,
          'nextPage': dataJson.nextPage,
          'prePage': dataJson.prePage,
          'totalPage': dataJson.totalPage,
          'fn': this.getList
        }
        let dataArr = res.data.dataList
        dataArr.map(value => {
          value['finishTimeFm'] = formDate(value.finishTime)
          value['startTimeFm'] = formDate(value.startTime)
          value['expectTimeFm'] = formDate(value.expectTime)
          value['expireStateName'] = formDate[value.expireState]
          value['stateName'] = this.flowStateDicData[value.state]
          value['currentNodeNameFm'] = this.nodeDictData[value.currentNodeName]
        })
        this.tableData = dataArr
      })
    },
    clearList () {
      this.bizId = '' // 业务ID（检测订单ID/样本编码）
      this.personId = '' // PID
      this.state = '' // 状态
      this.flowInstanceId = '' // 流程实例Id
      this.currentNodeName = '' // 当前流程名称, 按具体流程划分
    },
    handleCurrentChangeChild (val) {
      // 选择某行获取某行信息并且颜色变化
      this.currentRow = val // 这行没甚意义
      this.handleDetail(val)
    },
    handleSizeChange (val, obj = 1) {
      console.log(`每页 ${val} 条`)
      this.getList(val, obj)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.getList(this.tableDataPagination.pageSize, val)
    },
    // 导出显示模态框
    isShowExport () {
      if (this.tableDataPagination.totalPage >= 3000) {
        this.downTipsMsg = '导出数量已超过3000条，是否只导出前3000条？若要导出更多，可分开操作，或联系开发人员！'
        this.centerDialogVisibleDown = true
      } else {
        this.exportData()
      }
    },
    // 导出数据
    exportData () {
      let params = {
        bizId: this.bizId, // 业务ID（检测订单ID/样本编码）
        personId: this.personId, // PID
        state: this.state, // 检测订单
        currentNodeName: this.currentNodeName, // 当前流程名称, 按具体流程划分
        flowType: 'SAMPLE_TRACE' // 流程类型,
      }
      let url = `/monitor/flow/instances/excel`
      let changeUrl = this.getUrl(url, params)
      this.centerDialogVisibleDown = false
      // window.location.href = changeUrl
      let exportDom = document.createElement('a')
      exportDom.setAttribute('href', changeUrl)
      exportDom.setAttribute('download', 'sampleDownload.xlsx')
      exportDom.click()
    }
  }
}
</script>

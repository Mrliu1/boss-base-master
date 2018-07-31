<style lang="less" scope>
@import "./leftDataObejct.less";
</style>
<template>
<div class="left-right-model">
  <el-dialog :title="leftDataObejctFinish.mainTitle?leftDataObejctFinish.mainTitle : rightDataObejctFinish.mainTitle" :visible.sync="childVisibleFinish"  :width="rightDataObejctFinish.title? '80%': '40%'" height="60%" @close="close" center>
    <div class="left-right-body">
      <div class="dialog-main">
        <div class="dialog-left" v-if="leftDataObejctFinish.title" :style="{'width': rightDataObejctFinish.title? '35': '100%'}">
          <h2>{{leftDataObejctFinish.title}}</h2>
          <ul>
            <li v-for="(item, index) in leftDataObejctFinish.dataArr" :key="index" :class="(!newData[item.key] && isSubmitFlag)? 'warn-class' : ''">
              <div v-if="item.type=='select'" class="li-div">
                <span class="must-icon">{{item.name}}</span>
                <div class="tab-unique model-tab">
                  <el-select  v-model="newData[item.key]" filterable value-key="items.key" clearable @change="changeSingle" >
                  <!-- <el-select v-model="test" clearable filterable @change="changeSingle" @focus="changeSingleFocus(item.key)"> -->
                    <el-option
                      v-for="items in item.selectArr"
                      :key="items.key"
                      :value-key="item.key"
                      :label="items.value"
                      :value="items.key">
                    </el-option>
                  </el-select>
                  <span class="warn" v-show="!newData[item.key] && isSubmitFlag">请选择{{item.name}}</span>
                </div>
              </div>
              <div v-else-if="item.type=='input'"  class="li-div">
                <span class="must-icon">{{item.name}}</span><div class="model-tab"><el-input class="tab-input" v-model="newData[item.key]" maxlength="32" @change="item.invalidFn(item.key, newData[item.key])" :disabled="item.disabled?item.disabled:false"/>
                 <span class="warn" v-show="!newData[item.key] && isSubmitFlag">请输入{{item.name}}</span>
                </div>
              </div>
              <div v-else-if="item.type=='textarea'"  class="li-div">
                <span>{{item.name}}</span>
                <div class="model-tab tab-unique ">
                  <el-input
                    type="textarea"
                    autosize
                    maxlength="20"
                    :placeholder="`${item.name}(选填)`"
                    :value="item.value"
                    @blur.prevent="item.invalidFn"
                    v-model="newData[item.key]">
                  </el-input>
                </div>
              </div>
              <div v-else-if="item.type=='arr'"  class="li-div">
                <span>{{item.name}}</span><div class="model-tab"><el-button v-for="(val, vindex) in item.fnArr" :key="'val'+vindex" @click="val.fn">{{val.value}}</el-button></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="dialog-right" v-if="rightDataObejctFinish.title">
          <h2>{{rightDataObejctFinish.title}}</h2>
          <ul>
            <li v-for="(item, index) in rightDataObejctFinish.dataArr" :key="index">
              <div v-if="item.type=='select'">
                <div class="tab">
                  <el-select v-model="newData[item.key]" clearable filterable :placeholder="item.name" value-key="items.key">
                    <el-option
                      v-for="items in item.selectArr"
                      :key="items.key"
                      :label="items.value"
                      :value="items.key">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div v-else-if="item.type=='input'">
              <el-input class="tab-input" v-model="newData[item.key]" :value="item.value" :placeholder="item.name" @blur.prevent="item.invalidFn"/>
              </div>
              <div v-else-if="item.type=='textarea'">
              <el-input
                type="textarea"
                autosize
                :placeholder="item.name"
                :value="item.value"
                @blur.prevent="item.invalidFn"
                v-model="newData[item.key]">
              </el-input>
              </div>
              <div v-else-if="item.type=='arr'" class="fn-div">
                <el-button :class="item.iconClass" @click="item.fnObj">{{item.name}}</el-button>
              </div>
            </li>
          </ul>
          <TableTemplate :multipleSelection="rightDataObejctFinish.table?rightDataObejctFinish.table.tableBaseData : ''" :tableHeight="rightDataObejctFinish.table?rightDataObejctFinish.table.tableHeight : ''" :headerData="rightDataObejctFinish.table?rightDataObejctFinish.table.headerData : ''" ></TableTemplate>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer left-right-body-foot">
      <el-button type="primary" @click="submit">提 交</el-button>
      <el-button  @click="close">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import TableTemplate from '@/components/tableTemplate.vue'
// 该组件模块的使用方法
// 1、HTML这样， 通过centerDialogVisible属性设为true显示，false隐藏
// <LeftRightModel :leftDataObejct="leftDataObejct" :rightDataObejct="rightDataObejct" :centerDialogVisible="centerDialogVisible" @leftRightModel="transSub"></LeftRightModel>
// 2、js中数据处理，最终父组件传递给子组件传递数据是leftDataObejct，rightDataObejct， // 这两个参数分为左模块和右模块参数，可以两个都传也可只传一个还有子组件反馈给父组件使用@leftRightModel方法 具体如下
// props传递的参数的处理
// let fn1 = function(){
//    console.log(1)
//  }
//  let fn2 = function(){
//    console.log(2)
//  }
//  let invalidFn = function(){
//    console.log('input里面的校验规则')
//  }
//  let arr1 = [
//    {key:'keyCode',value:'银杏质控'}
//  ]
//  let arr2 = [
//    {key:'keyCode',value:'下载PDF',fn:fn1},
//    {key:'keyCode1',value:'下载HML',fn:fn2},
//  ]
//   let headerData = [
//    {key: 'id', value: '节点名称', template: false, width: 90},
//    {key: 'name', value: '节点状态', template: true, width: null},
//    {key: 'typeName', value: '开始时间', template: false, width: 165},
//    {key: 'externalName', value: '完成时间', template: false, width: 165},
//    {key: 'parentName', value: '预计完成时间', template: false, width: 165}
//  ]
//  let len = originData.length
//  let middleHeight = 200 + len * 10
//  let tableHeight = middleHeight > 350 ? 350 : middleHeight
//  this.leftDataObejct = {
//    mainTitle: '新增质控方案',
//    title: '配置质控方案',
//    dataArr: [
//    {key:'keyCode1',name:'质控类型',type:'select','selectArr':arr1},
//    {key:'keyCode2',name:'检测内容',type:'input','invalidFn':invalidFn},
//    {key:'keyCode3',name:'质控类型',type:'arr','fnArr':arr2},
//    ]
//  }
//  this.rightDataObejct = {
//    mainTitle: '新增质控方案',
//    title: '配置实验步骤',
//    dataArr: [
//    {key:'keyCode4',name:'质控类型',type:'select','selectArr':arr1},
//    {key:'keyCode5',name:'检测内容',type:'input', 'invalidFn':invalidFn},
//    {key:'keyCode6',name:'质控类型',type:'arr','fnObj':fn1,'iconClass':'el-icon-circle-plus'},
//    ],
//    table: {
//      'tableBaseData': originData,
//      'headerData': headerData,
//      'tableHeight': tableHeight
//    }
// let leftArr = this.leftDataObejct.dataArr
//  let rightArr = this.rightDataObejct.dataArr
//  let allArr = [...leftArr, ...rightArr]
//  // 构建初始化数据
//  let tmpNewData = {}
//  allArr.forEach((item, index) => {
//    if (item.type === 'select' || item.type === 'input' || item.type === 'textarea') {
//      tmpNewData[item.key] = item.value
//      // this.newData[item.key] = item.value
//    }
//  })
//  this.newData = tmpNewData
//  }
//  // 回馈的方法
//   transSub (transArr) {
//    console.log(transArr, 'aiiiii')
//    this.centerDialogVisible = transArr[0]
//    this.transSubmitData = transArr[1]
//  },

export default {
  name: 'leftRightModel',
  components: {
    TableTemplate
  },
  props: {
    leftDataObejct: {
      type: Object,
      required: false
    },
    rightDataObejct: {
      type: Object,
      required: false
    },
    centerDialogVisible: {
      // type: boolean,
      required: false
    },
    transChild: { // 传递过来的初始化数据
      type: Object,
      required: false
    }
  },
  data () {
    return {
      isSubmitFlag: false,
      childVisibleFinish: false,
      newData: {},
      test: 'keyCode',
      currentSelect: ''
    }
  },
  created () {
    // this.newData['keyCode5'] = '1000'
  },
  computed: {
    childVisible () {
      return this.centerDialogVisible
    },
    leftDataObejctFinish () {
      return this.leftDataObejct || {}
    },
    rightDataObejctFinish () {
      return this.rightDataObejct || {}
    },
    initData () {
      return this.transChild || {}
    }
  },
  watch: {
    childVisible: function (newVal, oldVal) {
      this.childVisibleFinish = newVal
    },
    initData: function (newVal, oldVal) {
      this.newData = this.transChild
    }
  },
  methods: {
    submit () {
      this.isSubmitFlag = true
      this.$emit('leftRightModel', [false, this.newData])
      // if(!this.leftDataObejct.isCheck){
      // this.childVisibleFinish = false
      // }
    },
    close () {
      this.isSubmitFlag = false
      this.childVisibleFinish = false
      this.$emit('leftRightModel', [false, []])
    },
    changeSingle (obj) {
      this.newData[this.currentSelect] = obj
    },
    changeSingleFocus (keyName) {
      this.currentSelect = keyName
    }
  }
}
</script>

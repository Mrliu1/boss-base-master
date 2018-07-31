<style lang="less" scope>
 @import "../views/main.less";
.table-head-th{
  background: #f8f8f8;
  color: #000;
  th{
  background: #f8f8f8;
  }
}
</style>

<template>
  <div>
    <el-table
      :header-row-class-name="tableheaderClassNameOne"
      :data="multipleSelection"
      border
      :row-class-name="tableRowClassName"
      :height="changeHeight"
      style="width: 100%">
      <el-table-column
      show-overflow-tooltip
        v-if="isTypeIndex"
        type="index"
        fixed="left"
        label="次序">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        v-for="(val, indexLeft) in fixedLeftObject"
        :key ="'indexLeft'+indexLeft"
        :min-width="val.width==null?120:val.width"
        :prop="val.key"
        fixed="left"
        :label="val.value">
        {{val}}
       <!--  <template slot-scope="scope" v-if="scope.row.template!=false">
            <span class="newRed">{{scope.row.val.key}}4112额</span>
        </template> -->
      </el-table-column>
      <!-- <el-table-column
      show-overflow-tooltip
        v-for="(value, index) in baseDataObject"
        :key ="index"
        :prop="value.key"
        :width="value.key=='receivedTimeFm'?'155':''"
        :label="value.value">
      </el-table-column> -->
      <el-table-column
      show-overflow-tooltip
        v-for="(value, index) in baseDataObject"
        :key ="'index'+index"
        :prop="value.key"
        :min-width="value.width==null?120:value.width"
        :label="value.value">
        <template slot-scope="scope">
          <el-form :model="value" status-icon :rules="rules" ref="ruleForm">
            <span v-if="value.template ==true && value.input == false" :class="scope.row[`${value.key}Color`]">{{scope.row[value.key]}}</span>
            <el-input v-else-if="value.template == true  && value.input == true" :value="scope.row[value.key]" @change="changeInputValue($event, scope.row.step, value.key)"  :id="value.key+'index'+scope.row.step"  size="mini"/>
            <!-- <el-form-item prop="numberMy"  v-else-if="value.template == true  && value.input == true">
              <el-input  v-model.number="scope.row[value.key]" @change="changeInputValue($event, index, value.key)"  :id="value.key+'index'+index"  size="mini"/>
            </el-form-item> -->
            <span v-else :class="scope.row[`${value.key}Color`]">{{scope.row[value.key]}}</span>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        fixed="right"
        align="center"
        label="操作"  v-if="editSelection?editSelection.length>0:false">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click.stop="handleSingle(scope,item)" v-for="(item,indexEdit) in editSelection" :key="'indexEdit'+indexEdit">{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.paginationData.pageNum"
      :page-sizes="[10, 100, 200, 300, 400]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      v-if="isShow"
      :total="this.paginationData.totalSize?this.paginationData.totalSize:0">
    </el-pagination>
  </div>
</template>

<script>
// 待完善组件有template重写页面
export default {
  name: 'tableBaseTemplate',
  props: {
    multipleSelection: {
      type: Array,
      required: true
    },
    editSelection: { // 里面参数至少包含ename，和中文的title 缺少数据返回格式，具体的操作
      type: Array,
      required: false
    },
    headerData: { // 头部列的JSON数组
      type: Array,
      required: true
    },
    paginationData: { // 分页信息 ，包含处理函数
      type: Object,
      required: false
    },
    tableHeight: {
      type: Number,
      required: false
    }
  },
  data () {
    // let self = this
    return {
      baseDataObject: [],
      isShow: true,
      isTypeIndex: false,
      fixedLeftObject: [],
      rules: {
        'numberMy': [
          { required: true, message: '请输入数据量或输入的不是数字', trigger: 'change' }
          // { validator: function (rules, value, callback) {console.log(rules, value, callback) }, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
  },
  computed: {
    changeHeight () {
      let appDom = document.getElementById('app')
      if (this.tableHeight) {
        return this.tableHeight
      } else {
        return appDom.clientHeight - 270
      }
    }
  },
  created () {
    // this.tableDataPagination = {
    // 'totalSize': dataJson.totalSize,
    // 'pageNum': dataJson.pageNum,
    // 'pageSize': dataJson.pageSize,
    // 'nextPage': dataJson.nextPage,
    // 'prePage': dataJson.prePage,
    // 'totalPage': dataJson.totalPage,
    // 'fn': this.initGetListData
    // }
    if (!this.paginationData) {
      this.isShow = false
    } else {
      if (this.paginationData.totalSize > 10) {
        this.isShow = false
      }
    }
  },
  mounted () {
    let baseDataObject = this.headerData
    let fixedLeftObject = []
    console.log(baseDataObject)
    if (baseDataObject.length > 7) {
      if (this.headerData[0].type === 'index') {
        fixedLeftObject = this.headerData.slice(1, 3)
      // baseDataObject.splice(0, 2)
      } else {
        fixedLeftObject = this.headerData.slice(0, 3)
      }
      baseDataObject.splice(0, 2)
    } else {
      if (this.headerData[0].type === 'index') {
        this.isTypeIndex = true
        baseDataObject.splice(0, 1)
      }
    }
    this.baseDataObject = baseDataObject
    this.fixedLeftObject = fixedLeftObject
  },
  methods: {
    changeInputValue (ev, index, key) {
      ev = ev.replace(/\D/g, '')
      setTimeout(function () {
        document.querySelector(`#${key}index${index}`).value = ev
        if (this.baseDataObject) {
          this.$set(this.baseDataObject[3], key, ev)
        }
      }, 200)
    },
    myNumber (rules, value, callback) {
      // if (value === '') {
      // callback(new Error('请再次输入密码'));
      // } else if (value !== this.ruleForm2.pass) {
      // callback(new Error('两次输入密码不一致!'));
      // } else {
      // callback();
      // }
      // val = val.replace(/\D/g,'')
      console.log(rules, value, callback)
      callback()
    },
    tableheaderClassNameOne ({row, rowIndex}) {
      console.log(row, rowIndex)
      return 'table-head-th'
    },
    // 处理操作里的功能
    handleSingle (val, obj) {
      obj.fn(val.row)
      // 在异常组件里要进行去重处理，应当迁移到fn里去
      // this.multipleSelection.map((item, index) => {
      // if (item.parcelId === val.row.parcelId) {
      //   this.multipleSelection.splice(index, 1)
      // }
      // })
      console.log(val)
    },
    onSubmit () {
    },
    onSubmitStep () {
      console.log(this.multipleSelection)
    },
    handleSizeChange (val, obj = 1) {
      console.log(`每页 ${val} 条`)
      this.paginationData.fn(val, obj)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.paginationData.fn(this.paginationData.pageSize, val)
    }
  }
}
</script>

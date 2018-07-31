<style lang="less" scope>
.table-head-th{
  background: #f8f8f8;
  color: #000;
  th{
  background: #f8f8f8;
  }
  .isDisabled{
     pointer-events: none;
    cursor: default;
    opacity: 0.6;
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
        v-for="(val, indexLeft) in fixedLeftObject"
        :key ="'indexLeft'+indexLeft"
        :prop="val.key"
        :min-width="val.width==null?120:val.width"
        fixed="left"
        :label="val.value">
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
        :min-width="value.key=='receivedTimeFm'?'155':value.width==null?120:value.width"
        :label="value.value">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        fixed="right"
        align="center"
        :min-width="editSelection[0].width==null?120:editSelection[0].width"
        label="操作"  v-if="editSelection?editSelection.length>0:false">
        <template slot-scope="scope">
          <el-button
          v-if="item.key != 'modify'"
            size="mini"
            @click.stop="handleSingle(scope,item)" v-for="(item,indexEdit) in editSelection" :key="'indexEdit'+indexEdit">{{item.name?item.name:item.value}}</el-button>
          <el-button
          v-if="item.key == 'modify'"
            size="mini"
            @click.stop="handleSingle(scope,item)" v-for="(item,indexEdit) in editSelection" :key="'indexEdit'+indexEdit" :disabled="(item.key === 'modify' && scope.row.btnDisabled==null? false:scope.row.btnDisabled)">{{item.name?item.name:item.value}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.paginationData.pageNum"
      :page-sizes="[30, 100, 200, 300, 400]"
      :page-size="this.paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      v-if="isShow"
      :total="this.paginationData.totalSize?this.paginationData.totalSize:0">
    </el-pagination>
  </div>
</template>

<script>
// 待完善组件
export default {
  name: 'tableBase',
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
    return {
      baseDataObject: [],
      isShow: true,
      fixedLeftObject: [],
      btnDisabled: 'isDisabled'
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
      fixedLeftObject = this.headerData.slice(0, 3)
      baseDataObject.splice(0, 3)
    }
    this.baseDataObject = baseDataObject
    this.fixedLeftObject = fixedLeftObject
    console.log(baseDataObject, fixedLeftObject)
  },
  methods: {
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

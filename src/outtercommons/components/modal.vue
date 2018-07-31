<template>
  <div class="modal" v-show='modal.modalVisible'>
    <div class="modal_mask"></div>
      <div class="modal_warp">
        <div class="main_modal" style="width: 80%;">
          <div class="modal_content">
            <a v-if='modal.isShowClose' class="modal_close"  @click="close" ><i class="icon icon_ios_close_empty"></i></a>
            <div class="modal_header">
              <slot name="header"><p v-bind:style="{color: modal.titleColor}" class="modal_header_inner">{{modal.title}}</p>
              </slot>
            </div>
            <div class="modal_body">
              <slot name="name">
              <p class="modal_body_p" v-if="modal.message.length>0">{{modal.message}}</p>
              <p class="modal_body_p" v-html='modal.isHTML' v-if="modal.isHTML"></p>
                <ul>
                <li v-for="item in modal.dataArr" :key="item.index"><span>{{item.key}}</span><p>{{item.value}}</p></li>
                </ul>
              </slot>
            </div>
            <div class="modal_footer" v-if='modal.isShowFoot'>
              <slot name="footer">
                <div v-if="modal.isSingle" class="footer_btn">
                  <button type="button" @click="confirm(modal.transFn)" :class="[modal.isTrue==false ? 'modal_btn btn_left_right' : 'modal_btn  modal_btn_active btn_left_right']"><span>{{modal.confirmButtonText}}</span></button>
                </div>
                <div  v-if="!modal.isSingle"  class="footer_btn">
                <button type="button" @click="close" :class="[modal.isTrue==false ? 'modal_btn btn_left' : 'modal_btn  modal_btn_active btn_left']"><span>{{modal.cancelButtonText}}</span></button>
                <button @click="confirm(modal.transFn)" type="button" :class="[modal.isTrue==true ? 'modal_btn modal_btn_line btn_right' : 'modal_btn modal_btn_line modal_btn_active btn_right']"><span>{{modal.confirmButtonText}}</span></button>
                </div>
              </slot>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
/*   组件调用传参，有值传值，没值就不需要传，支持改变按钮的文字，内容，标题等 其他组件调用这个modal组件方法如下
 testModal () {
      console.log('test')
      console.log('setModalVisible')
      let param = {
        modalVisible: true,
        isTrue: false,
        isSingle: false,
        title: '模态框',
        // cancelButtonClass: '',
        // cancelButtonText: '',
        // confirmButtonClass: '',
        // confirmButtonText: '',
        message: '今夜打瓦尔特web额外额外热热额温热额我让人头我去二无二老虎',
        transFn: () => {
          console.log('modal not sfg  like U')
        }
      }
      this.$store.commit('setModalVisible', param)
    }
 */
  /**
 * modal 模态接口参数
  * @param {string} modal.isHTML 显示内容为HTML
 * @param {string} modal.isShowClose 是否显示标题栏关闭按钮
 * @param {string} modal.isShowFoot 是否显示底部按钮
 * @param {string} modal.titleColor 标题栏字体颜色
 * @param {boolean} modal.isSingle 是否显示单个按钮默认显示双按钮
 * @param {string} modal.cancelButtonClass 取消按钮样式
 * @param {string} modal.cancelButtonText 取消按钮文字
 * @param {string} modal.confirmButtonClass 确定按钮样式
 * @param {string} modal.confirmButtonText 确定按钮标文字
 * @param {string} modal.message 传递的提示文字
 * @param {function} modal.transFn 传递的处理函数
 */
  props: ['propsModal'], // 显性声明props
  name: 'modal',
  data () {
    return {
      initmodal: {
        isHTML: '',
        isShowClose: false,
        isShowFoot: true,
        titleColor: '#242834',
        isTrue: false,
        isSingle: true,
        modalVisible: false,
        title: '模态框',
        cancelButtonClass: '',
        cancelButtonText: '取消',
        confirmButtonClass: '',
        confirmButtonText: '确定',
        message: '今夜打老虎',
        transFn: () => {
          console.log('modal like U')
        }
      }
    }
  },
  methods: {
    close: function () {
      this.$store.commit('setModalVisible', {})
    },
    confirm: function (fn) {
      fn()
      this.$store.commit('setModalVisible', {})
    }
  },
  computed: { // 计算属性
    modal () {
      return Object.assign({}, this.initmodal, this.$store.state.common.modal)
    }
  }
}
</script>
<!--Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.modal{
 font-size: 0;
}
.modal_mask{
  position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
}
.modal_warp{
  position: fixed;
    overflow: auto;
    top: 25%;
    bottom: 0;
    left:10%;
    width: 100%;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}
.modal_content{
  position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 10px;
    background-clip: padding-box;
}
.modal_header{
      border-bottom: 1px solid #e9eaec;
    padding: 3px 16px;
    line-height: 1;
}
.modal_header p {
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 16px 0;
}
.modal_close{
  font-size: 12px;
    position: absolute;
    right: 16px;
    top: 8px;
    overflow: hidden;
    cursor: pointer;
}
.icon {
    display: inline-block;
    font-family: Ionicons;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.modal_close .icon_ios_close_empty {
    font-size: 31px;
    color: #999;
    transition: color .2s ease;
    position: relative;
    top: 1px;
}
.icon_ios_close_empty:before {
    content: "✘";
}
.modal_body{
  font-size: 14px;
  line-height: 1.5;
  padding: 8px;
}
.modal_body p{
  width: 100%;
}
.modal_body_p{
  display: flex;
  align-items:center;
  font-size: 14px;
  line-height: 1.5;
  min-height: 50px;
  max-height: 300px;
  justify-content:center;
  overflow: auto;
}
.modal_footer {
    display: flex;
    border-top: 1px solid #e9eaec;
    height: 45px;
    text-align: center;
}
.modal_btn{
  display: inline-flex;
  justify-content:center;
  align-items:center;
  height:100%;
  color:#333333;
  background:#fff;
  border:0;
  flex:1;
}
.modal_btn:active, .modal_btn_active{
background: #CCB17E;
color:#fff;
}
.btn_right{
  border-bottom-right-radius:10px;
}
.btn_left{
  border-bottom-left-radius:10px;
}
.btn_left_right{
  background: #CCB17E;
  color:#fff;
  border-bottom-right-radius:10px;
  border-bottom-left-radius:10px;
  font-size: 15px;
}
.btn_left_right:active,.btn_left_right:hover{
  background:#c53929;
  font-size: 16px;
}
.footer_btn{
width: 100%;
display: flex;
}
.modal_body ul li{
  display: flex;
  height: 26px;
  margin: 5px 10px;
}
.modal_body ul li span{
  display: inline-flex;
  width: 88px;
  justify-content:flex-start;
  align-items:center;
}
.modal_body ul li p{
  display: inline-flex;
  flex:1;
  justify-content:flex-start;
  align-items:center;
}
</style>

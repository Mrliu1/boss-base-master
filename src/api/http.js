// import nativeToast from 'native-toast'
import axios from 'axios'
import { setCookie } from '@/outtercommons/libs/toolUtil'
import { Message } from 'element-ui'
let http = {}
// 欠加密数据的处理以后看需求
// SESSION=951a9ae9-8df0-475e-bc4a-45047b3637e5; boss_token=435fdb7e88d94a219fe2b71e64c0b2c6; boss_user=liuxiao
// document.cookie = 'SESSION' + '=b66c504e-6923-49c5-91a3-8fdd343ca4fa;'
// document.cookie = 'boss_token' + '=382e496b718643dca79e11af44d2c756;'
// document.cookie = 'boss_user' + '=liuxiao;'
// let expireDays = 1000 * 60 * 60
setCookie('SESSION', '92eb629a-80cf-409b-9610-4a43492b401e')
setCookie('boss_token', '9fcf4088c10d4f918e2033de56382452')
setCookie('boss_user', 'zhangya')

// 自己要加错误提示请传三个参数 self 为Boolean类型为 true， 默认是不自己错误处理，默认为false
// 暴露出去的入口为http.request(param, type, url, self = false)， 前三个是必参分别代表，请求入参， 请求类型，
// 请求地址，最后一个为可选参数代表错误处理方式，默认false，自己不出来，true自己自定义处理

http.request = (param, type, url, self = false) => {
  if (type === 'get') {
    return http.fetch(param, url, self)
  } else if (type === 'put') {
    return http.put(param, url, self)
  } else if (type === 'blob') {
    return http.blobDown(param, url)
  } else {
    return http.postAsync(param, url, self)
  }
}

http.postAsync = (param, url, self) => {
  let params = JSON.stringify(param) // 将入参序列化
  console.log(params, url)
  return axios.post(
    url,
    // auth,
    params,
    {
      timeout: 10000,
      withCredentials: true,
      headers: {
        'x-Request-with': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  ).then((json) => {
    // this.loading(false)
    let data = json.data
    if (self === false) {
      if (data && data.errorCode === 0) {
        return data
      } else {
        // nativeToast({
        // message: data.errMsg
        // })
        Message({
          message: data.errMsg,
          type: 'warning',
          center: true
        })
        return false
      }
    } else {
      return json
    }
  }).catch((res) => {
    // nativeToast({
    // message: '网络异常'
    // })
    Message({
      message: '网络异常',
      type: 'warning',
      center: true
    })
    return false
  })
}
http.blobDown = (param, url) => {
  return axios({
    method: 'get',
    url,
    data: param,
    responseType: 'blob'
  }).then(response => {
    return response
  }).catch((error) => {
    Message({
      message: '网络异常',
      type: 'warning',
      center: true
    })
    console.log(error)
    return false
  })
}
http.put = (param, url, self) => {
  // let params = JSON.stringify(param) // 将入参序列化
  console.log(param, url)
  return axios.put(
    url,
    // auth,
    param,
    {
      timeout: 10000,
      withCredentials: true,
      headers: {
        'x-Request-with': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  ).then((json) => {
    // this.loading(false)
    // console.log(json, 'put')
    let data = json.data
    if (self === false) {
      if (data && data.errorCode === 0) {
        return data
      } else {
        // nativeToast({
        // message: data.errMsg
        // })
        Message({
          message: data.errMsg,
          type: 'warning',
          center: true
        })
        return false
      }
    } else {
      return json
    }
  }).catch((res) => {
    // nativeToast({
    // message: '网络异常'
    // })
    Message({
      message: '网络异常',
      type: 'warning',
      center: true
    })
    return false
  })
}
http.fetch = (param, url, self) => {
  console.log(param, url)
  return axios.get(
    url,
    {
      params: param
    },
    {
      timeout: 10000,
      withCredentials: true,
      headers: {
        'x-Request-with': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  ).then((json) => {
    // this.loading(false)
    // console.log(data)
    let data = json.data
    if (self === false) {
      if (data && data.errorCode === 0) {
        return data
      } else {
        // nativeToast({
        // message: data.errMsg
        // })
        Message({
          message: data.errMsg,
          type: 'warning',
          center: true
        })
        return false
      }
    } else {
      return data
    }
  }).catch((res) => {
    Message({
      message: '网络异常',
      type: 'warning',
      center: true
    })
    return false
  })
}
export default http

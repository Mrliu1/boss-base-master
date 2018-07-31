// 获取cookie
export function getCookie (name) {
  let arr
  let reg = new RegExp('(^|)') + name + '=([^;]*)(;|$)'
  arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}
// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cName, value, expiredays = null) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + `${value};` + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除cookie
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval !== null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
// 时间戳格式化
export function formDate (inputTime) {
  // isNaN(inputTime) ||
  if (inputTime === '' || inputTime === null || inputTime === undefined) {
    return ''
  }
  var date = new Date(inputTime)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
// 时间断格式化
export function formDateRange (inputTime) {
  var nTime = inputTime / 1000
  var day = Math.floor(nTime / 86400)
  var hour = Math.floor(nTime % 86400 / 3600)
  var minute = Math.floor(nTime % 86400 % 3600 / 60)
  var second = Math.floor(nTime % 86400 % 3600 % 60 / 60)
  return day + '天' + hour + '小时' + minute + '分钟' + second + '秒'
}
export function trim (s) {
  return s.replace(/[\s ]+/g, '')
}
export function fomateDict (key, dictData) {
  if (dictData[key] === undefined || key === undefined || key === '') {
    return key
  } else {
    return dictData[key]
  }
}

export function dictToSelectArray (dict) {
  let dictArray = []
  if (dict === null || dict.length === 0) {
    return dictArray
  }
  for (let key of Object.keys(dict)) {
    let dictItem = {}
    dictItem['key'] = key
    dictItem['value'] = dict[key]
    dictArray.push(dictItem)
  }
  return dictArray
}

// 代理中台接口地址
module.exports = {
  proxyList: {
    '/monitor/': {
      // target: 'http://172.18.131.2:8080',
      // 本地
      // 测试
      target: 'http://10.0.5.37:8090/monitor/',
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "/monitor/": ''
      }
    },
    '/weixin': {
      target:'https://qyapi.weixin.qq.com/',
      changeOrigin:true,
      pathRewrite:{}
    }
  }
}

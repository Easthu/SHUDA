// 封装微信sdk的能力函数
import wxFun from 'jweixin-1.6.0'
// 发起获取微信APPID相关的请求
function getWeChatGetSignature() {
  return new Promise((resolve) => {
    //判断机型
    let signLink = null
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) {
      // 记录进入app时的url
      signLink =
        localStorage.getItem('wxUseUrl') || decodeURIComponent(wxFun.signurl())
    } else if (/(android)/i.test(ua)) {
      signLink = location.href
    } else {
      signLink = location.href
    }
    // weChatGetSignature({
    //   url: signLink
    // }).then((res) => {
    //   if (res.status == 'OK') {
    //     resolve(res)
    //   } else {
    //     resolve(false)
    //   }
    // })
  })
}

//  获取微信分享的能力
/**
 * shareData:{
 * title, // 分享标题
 * desc, // 分享描述
 * link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * imgUrl // 分享图标
 * }
 * */
function fetchWeChatShare(shareData = {}) {
  getWeChatGetSignature().then((res) => {
    if (res.status == 'OK') {
      wxFun.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateAppMessageShareData',
          'onMenuShareAppMessage',
          'updateTimelineShareData'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      // 微信分享相关
      wxFun.ready(function () {
        let ShareTimelineData = shareData
        wxFun.updateAppMessageShareData(ShareTimelineData)
        wxFun.onMenuShareAppMessage(ShareTimelineData)
        wxFun.updateTimelineShareData(ShareTimelineData)
      })
    }
  })
}

// 获取微信定位的能力
function fetchWeChatLocation() {
  return new Promise(async (resolve, reject) => {
    getWeChatGetSignature().then((res) => {
      if (res.status == 'OK') {
        wxFun.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见附录1
          jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wxFun.ready(function () {
          wxFun.getLocation({
            type: 'gcj02',
            isHighAccuracy: true,
            success(data) {
              let datas = {
                latitude: data.latitude,
                longitude: data.longitude
              }
              resolve(datas)
            },
            fail() {
              resolve(false)
            }
          })
        })
      }
    })
  })
}

// 判断是否在微信环境 - mini-wx= 微信小程序  wx=微信  no-wx=不在微信环境下
function JudgeEnvironment() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return new Promise(resolve => {
      wxFun.miniProgram.getEnv(function (res) {
        let str = JSON.stringify(res)
        if (str.indexOf('true') != -1) {
          resolve('mini-wx')
        } else {
          resolve('wx')
        }
      })
    })
  } else {
    return new Promise(resolve => {
      resolve("no-wx")
    })
  }
}

// 判断是否在微信环境 - mini-wx= 微信小程序  wx=微信  no-wx=不在微信环境下
function isWx() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return new Promise(resolve => {
      wxFun.miniProgram.getEnv(function (res) {
        let str = JSON.stringify(res)
        if (str.indexOf('true') != -1) {
          resolve('mini-wx')
        } else {
          resolve('wx')
        }
      })
    })
  } else {
    return new Promise(resolve => {
      resolve("no-wx")
    })
  }
}
export {
  isWx,
  getWeChatGetSignature,//发起获取微信APPID相关的请求
  JudgeEnvironment,//判断是否在微信环境
  fetchWeChatShare,//获取微信分享的能力
  fetchWeChatLocation,//获取微信定位的能力
}
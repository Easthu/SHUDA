import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import {
  JudgeEnvironment,
} from "@/utils/weChatFunction.js";
import {
  getUrlKey,
} from "@/utils/toolsValidate.js";
export const useWeiXinStore = defineStore(
  'WeiXin',
  {
    state: () => ({
      // 判断是否在微信浏览器环境下
      isWeiXin: navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1,
    }),
    actions: {
      //在微信环境下微信授权登录,获取openid用于下单支付使用
      async weChatGetOpenid() {
        let openId = localStorage.getItem('localOpenid')
        if (openId) {
          localStorage.setItem('localOpenid', openId)
          return openId //返回缓存openId
        }
        else if (getUrlKey("openid")) {
          openId = getUrlKey("openid")
          localStorage.setItem('localOpenid', openId)
          return openId // 返回链接上openId
        }
        else {
          let env = await JudgeEnvironment()
          // 浏览器环境下获取 公众号openId
          if (env == 'wx' || env == 'mini-wx') {
            //微信登录前 储存当前链接参数防止丢失
            //路由history模式
            if (window.location.search) {
              localStorage.setItem('windowSeacrch', window.location.search)
            }
            //路由hash模式
            else if (window.location.hash) {
              localStorage.setItem('windowSeacrch', window.location.hash)
            }
            let url = window.location.href;
            let baseApiUrl = import.meta.env.VITE_APP_BASE_API;
            let wxLocatinUrl = baseApiUrl + "weChat/authorize/base?redirectUrl=" + baseApiUrl +
              "weChat/userInfo&state=" + url
            window.location.replace(wxLocatinUrl)
            return '' // 跳转微信获取openId
          }
          else {
            return ''
          }
        }
      }
    }
  }
)
export function useWeiXinOutsideStore() {
  return useWeiXinStore(piniaStore)
}

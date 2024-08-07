import { defineStore } from 'pinia'
import { piniaStore } from '@/store'

export const useUserStore = defineStore(
  'User',
  {
    state: () => ({
      // 页面标题
      pageTitle: "",
      // 判断是否在微信浏览器环境下
      isWeiXin: navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1,
      // 当前访问的路由页面path，刷新微信定位专用
      currentRoutePath: null,
    }),
    actions: {
      // 获取当前访问的路由页面path，刷新微信定位专用
      fetchCurrentRoutePath(currentRoutePath) {
        this.currentRoutePath = currentRoutePath
      },
      // 获取当前页面标题
      fetchPageTitle(pageTitle) {
        // 变更状态
        this.pageTitle = pageTitle
      },
    },
    persist: {
      key: 'publicUserSatate',
      storage: sessionStorage,
    }
  }
)
// export function useUserOutsideStore() {
//     return useUserStore(piniaStore)
// }
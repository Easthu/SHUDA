/*
 * @Author: Est
 * @Date: 2023-03-28 18:57:27
 * @LastEditors: Est
 * @LastEditTime: 2023-04-27 17:53:05
 * @FilePath: \public-zone美食专区\src\router\index.js
 * @Description:
 */
// index.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import { useUserStore } from 'store/modules/user'


const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history: createWebHistory(`/${getMobileTypeConfigList().urlNamePrefix}/`),
  routes: '/',
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 当前访问的路由页面path，刷新微信定位专用
  useUserStore().fetchCurrentRoutePath(to.name)
  // 当前页面的标题
  if (to.meta.title) {
    document.title = to.meta.title;
    useUserStore().fetchPageTitle(to.meta.title)
  }
  next();
});
router.afterEach(() => { //这里不接收next

})


export default router
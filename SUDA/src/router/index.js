import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from 'store/modules/user'
import { getUrlKey } from '@/utils/toolsValidate.js';
import { isWx } from '@/utils/weChatFunction';
import { requestApi } from 'api/home';
import { showToast } from 'vant';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    // 懒加载路由
    component: () => import('@/views/index/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/make',
        name: 'make',
        component: () => import('@/views/make/index.vue'),
        meta: {
          title: '预约',
        },
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/index.vue'),
        meta: {
          title: '订单',
        },
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine/mine.vue'),
        meta: {
          title: '个人中心',
        },
      },

    ],
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/recommend/index.vue'),
    meta: {
      title: '推荐',
      // keepAlive: true
    },
  },
  {
    path: '/recommendDetail',
    name: 'recommendDetail',
    component: () => import('@/views/recommend/recommendDetail.vue'),
    meta: {
      title: '推荐详情',
    },
  },
  {
    path: '/makeDetail',
    name: 'makeDetail',
    component: () => import('@/views/make/makeDetail.vue'),
    meta: {
      title: '预约详情',
    },
  },
  {
    path: '/detailedServices',
    name: 'detailedServices',
    component: () => import('@/views/make/detailedServices.vue'),
    meta: {
      title: '详情服务',
    },
  },
  {
    path: '/orderConfirm',
    name: 'orderConfirm',
    component: () => import('@/views/order/orderConfirm.vue'),
    meta: {
      title: '确认详情',
    },
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('@/views/order/orderDetail.vue'),
    meta: {
      title: '确认详情',
    },
  },
  {
    path: '/makeTextualResearch',
    name: 'makeTextualResearch',
    component: () => import('@/views/mine/makeTextualResearch.vue'),
    meta: {
      title: '预约考证',
    },
  },
  {
    path: '/userAgreement',
    name: 'userAgreement',
    component: () => import('@/views/mine/userAgreement.vue'),
    meta: {
      title: '用户协议',
    },
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: () => import('@/views/mine/aboutUs.vue'),
    meta: {
      title: '关于我们',
    },
  },
  {
    path: '/agents',
    name: 'agents',
    component: () => import('@/views/agentsAndParttime/agents.vue'),
    meta: {
      title: '代理',
    },
  },
  {
    path: '/agents',
    name: 'agents',
    component: () => import('@/views/agentsAndParttime/agents.vue'),
    meta: {
      title: '代理',
    },
  },
  {
    path: '/partTime',
    name: 'partTime',
    component: () => import('@/views/agentsAndParttime/partTime.vue'),
    meta: {
      title: '兼职',
    },
  },
  {
    path: '/partTimeNumber',
    name: 'partTimeNumber',
    component: () => import('@/views/agentsAndParttime/partTimeNumber.vue'),
    meta: {
      title: '兼职数量',
    },
  },
  {
    path: '/canPayouts',
    name: 'canPayouts',
    component: () => import('@/views/agentsAndParttime/canPayouts.vue'),
    meta: {
      title: '佣金可提现',
    },
  },
  {
    path: '/partTimeOrderList',
    name: 'partTimeOrderList',
    component: () => import('@/views/agentsAndParttime/partTimeOrderList.vue'),
    meta: {
      title: '兼职订单',
    },
  },
  {
    path: '/payoutsRecords',
    name: 'payoutsRecords',
    component: () => import('@/views/agentsAndParttime/payoutsRecords.vue'),
    meta: {
      title: '提现记录',
    },
  },
  {
    path: '/partOrderList',
    name: 'partOrderList',
    component: () => import('@/views/agentsAndParttime/partOrderList.vue'),
    meta: {
      title: '订单记录',
    },
  },
  {
    path: '/personalBusinessLicense',
    name: 'personalBusinessLicense',
    component: () => import('@/views/make/personalBusinessLicense.vue'),
    meta: {
      title: '营业执照',
    },
  },
  {
    path: '/payOuts',
    name: 'payOuts',
    component: () => import('@/views/agentsAndParttime/payOuts.vue'),
    meta: {
      title: '银行卡信息',
    },
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () => import('@/views/qrcode/index.vue'),
    meta: {
      title: '扫码开始服务',
    },
  },
  {
    path: '/qrcodeAgents',
    name: 'qrcodeAgents',
    component: () => import('@/views/qrcode/agents.vue'),
    meta: {
      title: '扫码绑定',
    },
  }




]
const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history: createWebHistory('/momoda/'),
  routes,
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 当前访问的路由页面path，刷新微信定位专用
  useUserStore().fetchCurrentRoutePath(to.name)
  // 当前页面的标题
  // if (to.meta.title) {
  //   document.title = to.meta.title;
  //   useUserStore().fetchPageTitle(to.meta.title)
  // }、
  if (to.path !== '/login') {
    const userInfo = sessionStorage.getItem('userInfo');
    const code = getUrlKey('code');
    isWx().then((isWeChat) => {
      if (isWeChat == 'wx') {
        if (!code && !userInfo) {
          let redirectUri = window.location.origin + window.location.pathname;
          const wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5f6f6ed39d9a7f&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
          window.location.href = wxUrl;
        } else if (code && !userInfo) {
          requestApi({
            op: 'login',
            co: code,
          }).then((res) => {
            console.log('login', res);
            if (res.code == 0) {
              sessionStorage.setItem('userInfo', JSON.stringify(res.data));
              next();
            } else if (res.code == 3) {
              sessionStorage.setItem('encryptioncode', res.encryptioncode);
              router.replace('/login');
            }
          });
        } else {
          next();
        }
      } else {
        if (import.meta.env.VITE_NODE_ENV != 'dev') {
          showToast('请在微信环境打开');
        }
      }
    });
  }
  next();
});
router.afterEach(() => { //这里不接收next

})


export default router
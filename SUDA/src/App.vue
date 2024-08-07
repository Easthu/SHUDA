<script setup>
import { getUrlKey } from "@/utils/toolsValidate.js";
import { needAuthLogin, needWeixinLogin } from "@/utils/globalConfiguration.js";
import { useWeiXinStore } from "store/modules/weixin.js";

const router = useRouter();

//需要 微信登录 获取openId 并设置到缓存中
if (needWeixinLogin()) {
  useWeiXinStore().weChatGetOpenid();
  //解决获取openid后只会回传一个参数的问题
  if (localStorage.getItem("windowSeacrch")) {
    let href =
      window.location.origin +
      window.location.pathname +
      localStorage.getItem("windowSeacrch");
    localStorage.removeItem("windowSeacrch");
    window.location.href = href;
  }
}
// 缓存第一次进入的页面url路径链接firstEnterUrl 以及 wxUseUrl
localStorage.setItem("wxUseUrl", location.href);
// window.history.replaceState({}, '', `${location.pathname}?${params}`);

//获取 链接
let channelPhoneToken = getUrlKey("channelPhoneToken"); //进入北京移动获取手机号并获取登录token
let token = getUrlKey("token"); //参数token就是app环境下的参数token

// 设置默认值
isToFoodZoneLogin.value = true;

</script>

<template>
  <!-- vue3.0配置 -->
  <router-view v-slot="{ Component }" >
    <keep-alive>
      <component
        :is="Component"
        v-if="$route.meta.keepAlive"
        :key="$route.name"
      />
    </keep-alive>
    <component
      :is="Component"
      v-if="!$route.meta.keepAlive"
      :key="$route.name"
    />
  </router-view>
</template>

<style>
@import "./style.css";

html,
body,
#app {
  font-family: ".PingFang SC, .PingFang SC-Regular";
  background: #f5f5f5;
  -webkit-overflow-scrolling: touch;
}

/* 去掉滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>

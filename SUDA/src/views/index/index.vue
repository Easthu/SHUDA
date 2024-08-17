<template>
	<router-view class="main" />
	<van-tabbar v-model="active" @change="handelActiveChange">
		<van-tabbar-item icon="wap-home-o" name="home">首页</van-tabbar-item>
		<van-tabbar-item icon="underway-o" name="make">预约</van-tabbar-item>
		<van-tabbar-item icon="other-pay" name="order">订单</van-tabbar-item>
		<van-tabbar-item icon="manager-o" name="mine">我的</van-tabbar-item>
	</van-tabbar>
</template>

<script setup>
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
console.log('router :>> ', router);
console.log('route :>> ', route);

const active = ref('home');
const handelActiveChange = (name) => {
	console.log('name :>> ', name);
	active.value = name;
	switch (name) {
		case 'home':
			router.push({
				name,
			});
			break;
		case 'make':
			router.push({
				name,
			});
			break;
		case 'order':
			router.push({
				name,
			});
			break;
		case 'mine':
			router.push({
				name,
			});
	}
};
onMounted(() => {
	active.value = route.name;
});
</script>

<style lang="less" scoped>
.main {
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
}
</style>

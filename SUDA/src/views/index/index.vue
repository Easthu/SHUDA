<template>
	<router-view class="main" />
	<van-tabbar
		v-model="active"
		@change="handelActiveChange"
		active-color="#93F582"
		inactive-color="#000000"
		z-index="999"
	>
		<van-tabbar-item icon="wap-home-o" name="home">
			<span class="tab-text">首页</span>
			<template #icon="props">
				<img :src="!props.active ? homeIcon : homeIconActive" class="tab-icon" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item icon="underway-o" name="make">
			<span class="tab-text">预约</span>
			<template #icon="props">
				<img :src="!props.active ? makeIcon : makeIconActive" class="tab-icon" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item icon="other-pay" name="order">
			<span class="tab-text">消息</span>
			<template #icon="props">
				<img :src="!props.active ? messageIcon : messageIconActive" class="tab-icon" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item icon="manager-o" name="mine">
			<span class="tab-text">我的</span>
			<template #icon="props">
				<img :src="!props.active ? mineIcon : mineIconActive" class="tab-icon" />
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script setup>
import homeIcon from '@/assets/images/icons/home.png';
import homeIconActive from '@/assets/images/icons/home-a.png';
import makeIcon from '@/assets/images/icons/make.png';
import makeIconActive from '@/assets/images/icons/make-a.png';
import messageIcon from '@/assets/images/icons/message.png';
import messageIconActive from '@/assets/images/icons/message-a.png';
import mineIcon from '@/assets/images/icons/mine.png';
import mineIconActive from '@/assets/images/icons/mine-a.png';

const router = useRouter();
const route = useRoute();
const active = ref('home');
const handelActiveChange = (name) => {
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
	padding-bottom: calc(130px + constant(safe-area-inset-bottom));
	padding-bottom: calc(130px + env(safe-area-inset-bottom));
	.tab-text {
		font-weight: 400;
		font-size: 24px;
	}
	.tab-icon {
		width: 81px;
		height: 45px;
	}
}
.van-tabbar,
.van-tabbar-item--active {
	background: #f7f7f7;
}
</style>

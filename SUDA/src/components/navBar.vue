<template>
	<van-nav-bar :title="props.title">
		<template #left v-if="props.showLeftBack || props.showLeftText">
			<van-icon
				name="arrow-left"
				size="18"
				color="#000"
				v-if="props.showLeftBack"
				@click="hanldeBack"
			/>
			<span v-if="props.showLeftText">{{ props.showLeftText }}</span>
		</template>

		<template #right v-if="props.showRight">
			{{ cityName }}
			<van-icon name="location-o" color="#000" />
		</template>
	</van-nav-bar>
</template>

<script setup>
const router = useRouter();
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	showRight: {
		type: Boolean,
		default: false,
	},
	showLeftBack: {
		type: Boolean,
		default: false,
	},
	showLeftText: {
		type: String,
		default: '',
	},
});
const hanldeBack = () => {
	router.back();
};
const cityName = ref(localStorage.getItem('cityName') || '重庆');
</script>

<style lang="less" scoped></style>

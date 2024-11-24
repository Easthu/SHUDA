<template>
	<div class="detailed-services">
		<NavBar showLeftBack />
		<div class="services-introduce">
			<div class="service-title">服务详情</div>
			<p v-html="introduce"></p>
			<p class="price">{{ price }}元/次</p>
		</div>
	</div>
</template>

<script setup>
const route = useRoute();
const price = ref(0);
const introduce = ref('');
onMounted(() => {
	price.value = route.query.price;
	introduce.value = route.query.introduce;
});
</script>

<style lang="less" scoped>
.detailed-services {
	min-height: 100vh;
	background-color: #f5f5f5;
	width: 100vw;
	.services-introduce {
		background-color: #fff;
		padding: 20px;
		margin-bottom: 20px;
		width: 710px;
		margin: 20px auto;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		.service-title {
			font-size: 32px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		p {
			font-size: 24px;
			color: #666;
			line-height: 1.5;
			overflow-wrap: break-word;
			white-space: pre-wrap;
		}
		.price {
			font-weight: 400;
			font-size: 26px;
			color: #93f582;
			margin: 30px 0 40px 0;
		}
	}
}
</style>

<template>
	<div class="recommend-layout">
		<NavBar :showRight="true" showLeftBack />

		<div
			class="recommend-item"
			v-for="(item, index) in recommendList"
			:key="index"
			@click="handleLinkDetail"
		>
			<img src="https://picsum.photos/200" alt="" class="recommend-img" />
			<div class="recommend-info">
				<div class="recommend-name">推荐名字</div>
				<div class="recommend-time">营业时间：00:00 - 24:00</div>
				<div class="recommend-adress">重庆市江北区万汇中心1栋20楼</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
const recommendList = ref([1, 2, 3, 4, 5]);
const handleLinkDetail = () => {
	router.push('/recommendDetail');
};
</script>

<style lang="less" scoped>
.recommend-layout {
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	padding: 20px;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	padding-top: 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	.recommend-item {
		display: flex;
		width: 710px;
		height: 240px;
		padding: 18px;
		box-sizing: border-box;
		border: 2px solid #ccc;
		border-radius: 10px;
		margin: 16px auto;
		.recommend-img {
			width: 200px;
			height: 200px;
			border-radius: 10px;
		}
		.recommend-info {
			display: flex;
			flex-direction: column;
			margin-left: 20px;
			.recommend-name {
				font-size: 30px;
				font-weight: 600;
				margin-bottom: 20px;
			}
			.recommend-time {
				font-size: 24px;
				margin-bottom: 20px;
			}
			.recommend-adress {
				font-size: 24px;
			}
		}
	}
}
</style>

<template>
	<div class="part-time-number">
		<NavBar showLeftBack />
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
				<div v-for="item in listData" :key="item" class="list-item">
					<div class="list-img">
						<img src="https://picsum.photos/180" alt="" class="goods-img" />
						<div class="state">休息中</div>
					</div>
					<div class="list-info">
						<div class="goods-name">子非鱼 <span> 27</span></div>
						<div class="list-price">陪诊就医</div>
					</div>
					<div class="list-right">
						<p>评分：50</p>
						<p>服务次数：2</p>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script setup>
const listData = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
	// 异步更新数据
	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	setTimeout(() => {
		if (refreshing.value) {
			listData.value = [];
			refreshing.value = false;
		}

		for (let i = 0; i < 10; i++) {
			listData.value.push(listData.value.length + 1);
		}

		// 加载状态结束
		loading.value = false;

		// 数据全部加载完成
		if (listData.value.length >= 20) {
			finished.value = true;
		}
	}, 1000);
};

const onRefresh = () => {
	// 清空列表数据
	listData.value = [];
	finished.value = false;

	// 重新加载数据
	// 将 loading 设置为 true，表示处于加载状态
	loading.value = true;
	onLoad();
};
</script>

<style lang="less" scoped>
.part-time-number {
	width: 100vw;
	min-height: 100vh;
	padding: 0 20px;
	box-sizing: border-box;
	background-color: #fff;

	.list-item {
		width: 710px;
		height: 210px;
		margin: 12px 0;
		border-radius: 10px;
		padding: 20px;
		border: 2px solid #ccc;
		box-sizing: border-box;
		display: flex;
		.list-img {
			height: 150px;
			width: 150px;
			border-radius: 50%;
			margin-right: 60px;
			position: relative;
			.goods-img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			.state {
				position: absolute;
				bottom: -6px;
				left: 0;
				width: 100%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				color: #fff;
				font-size: 28px;
				z-index: 2;
			}
		}

		.list-info {
			display: flex;
			flex-direction: column;
			height: 180px;
			flex: 1;
			.goods-name {
				font-size: 28px;
				font-weight: 600;
				margin-bottom: 30px;
			}
			.list-price {
				font-size: 24px;
				color: #999;
			}
		}
		.list-right {
			width: 180px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-radius: 20px;
			font-size: 24px;
			p {
				text-align: left;
			}
		}
	}
}
</style>

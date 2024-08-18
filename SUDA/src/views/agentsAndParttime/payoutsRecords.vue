<template>
	<div class="payouts-records">
		<NavBar showLeftBack />
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
				<div v-for="item in listData" :key="item" class="list-item">
					<div class="list-info">
						<div class="list-time">申请时间：2024-08-08 14:00:00</div>
						<div class="list-price">
							提现金额 <span style="color: #ff0000">66.00</span>
						</div>
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
.payouts-records {
	width: 100vw;
	min-height: 100vh;
	padding: 0 20px;
	box-sizing: border-box;
	background-color: #fff;
	.list-item {
		width: 710px;
		margin: 12px 0;
		padding: 20px;
		border-bottom: 2px solid #ccc;
		box-sizing: border-box;
		display: flex;

		.list-info {
			display: flex;
			flex-direction: column;
			height: 80px;
			flex: 1;
			.list-time {
				font-size: 24px;
				margin-bottom: 30px;
			}
			.list-price {
				font-size: 28px;
				color: #999;
			}
		}
	}
}
</style>

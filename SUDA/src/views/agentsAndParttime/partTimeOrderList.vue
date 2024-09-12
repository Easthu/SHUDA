<template>
	<div class="part-time-order-list">
		<img
			src="@/assets/images/icons/back.png"
			alt=""
			class="back-icon"
			@click="$router.go(-1)"
		/>
		<div class="total-count">120笔</div>
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
				<div v-for="item in listData" :key="item" class="list-item">
					<div class="list-img">
						<img src="@/assets/images/icons/part-time.png" alt="" class="goods-img" />
					</div>
					<div class="list-info">
						<div class="goods-name">重庆西南医院</div>
						<div class="list-price">实付:￥360.00</div>
					</div>
					<div class="list-right">
						<p>陪诊就医</p>
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
.part-time-order-list {
	width: 100vw;
	min-height: 100vh;
	padding: 53px 37px;
	box-sizing: border-box;
	background: #f2f3f7;
	.total-count {
		font-weight: 400;
		font-size: 42px;
		color: #010000;
		margin-bottom: 43px;
	}
	.back-icon {
		width: 53px;
		height: 53px;
		margin-bottom: 60px;
	}
	.list-item {
		width: 677px;
		height: 147px;
		background: #fefeff;
		border-radius: 15px;
		padding: 8px 16px;
		margin-bottom: 14px;
		box-sizing: border-box;
		display: flex;
		.list-img {
			height: 131px;
			width: 131px;
			border-radius: 50%;
			margin-right: 27px;
			position: relative;
			.goods-img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.list-info {
			display: flex;
			flex-direction: column;
			height: 180px;
			flex: 1;
			.goods-name {
				font-weight: 400;
				font-size: 30px;
				color: #010000;
				margin-top: 18px;
			}
			.list-price {
				font-weight: 300;
				font-size: 30px;
				color: #010000;
				margin-top: 31px;
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
				margin-top: 30px;
				font-weight: 300;
				font-size: 24px;
				color: #010000;
				height: 24px;
			}
			.frequency {
				margin-top: 17px;
			}
		}
	}
}
</style>

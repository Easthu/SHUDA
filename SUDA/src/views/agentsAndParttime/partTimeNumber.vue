<template>
	<div class="part-time-number">
		<img
			src="@/assets/images/icons/back.png"
			alt=""
			class="back-icon"
			@click="$router.go(-1)"
		/>
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
				<div v-for="item in listData" :key="item" class="list-item">
					<div class="list-img">
						<img src="@/assets/images/icons/part-time.png" alt="" class="goods-img" />
						<div class="state1" v-if="item == 1">休息中</div>
						<div class="state2" v-else-if="item == 2">服务中</div>
						<div class="state3" v-else>可服务</div>
					</div>
					<div class="list-info">
						<div class="goods-name">
							子非鱼
							<img src="@/assets/images/icons/make-man.png" alt="" />
							<span>27岁</span>
						</div>
						<div class="list-price">陪诊就医</div>
					</div>
					<div class="list-right">
						<p>评分：50</p>
						<p class="frequency">服务次数：2</p>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script setup>
const router = useRouter();

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
	padding: 53px 37px;
	box-sizing: border-box;
	background: #f2f3f7;
	.back-icon {
		width: 53px;
		height: 53px;
		margin-bottom: 29px;
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
			.state1 {
				position: absolute;
				bottom: -6px;
				left: 24px;
				width: 82px;
				height: 34px;
				background: #ffffff;
				border-radius: 17px;
				border: 2px solid #ffee37;
				line-height: 40px;
				text-align: center;
				font-weight: 400;
				font-size: 19px;
				color: #061710;
				z-index: 2;
			}
			.state2 {
				position: absolute;
				bottom: -6px;
				left: 24px;
				width: 82px;
				height: 34px;
				background: #ffee37;
				border-radius: 17px;
				line-height: 40px;
				text-align: center;
				font-weight: 400;
				font-size: 19px;
				color: #061710;
				z-index: 2;
			}
			.state3 {
				position: absolute;
				bottom: -6px;
				left: 24px;
				width: 82px;
				height: 34px;
				background: #38ffce;
				border-radius: 17px;
				line-height: 40px;
				text-align: center;
				font-weight: 400;
				font-size: 19px;
				color: #061710;
				z-index: 2;
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
				margin-top: 29px;
				img {
					width: 26px;
					height: 26px;
					margin-right: 6px;
				}
			}
			.list-price {
				font-weight: 300;
				font-size: 24px;
				color: #010000;
				margin-top: 12px;
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

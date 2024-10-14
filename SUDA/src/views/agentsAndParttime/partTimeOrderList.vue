<template>
	<div class="list-item-st">
		<div class="list-img">
			<img :src="partTimeInfo.picture" alt="" class="goods-img" />
			<div class="state1" v-if="partTimeInfo.online == 0">不可服务</div>
			<!-- <div class="state2" v-else-if="partTimeInfo == 2">服务中</div> -->
			<div class="state3" v-if="partTimeInfo.online == 1">可服务</div>
		</div>
		<div class="list-info">
			<div class="goods-name">
				{{ partTimeInfo.name }}
				<img src="@/assets/images/icons/make-man.png" alt="" v-if="partTimeInfo.sex == 1" />
				<img
					src="@/assets/images/icons/make-women.png"
					alt=""
					v-if="partTimeInfo.sex == 2"
				/>
				<span>{{ partTimeInfo.age }}岁</span>
			</div>
			<div class="list-price">{{ partTimeInfo.nature == 2 ? '本地向导' : '陪诊就医' }}</div>
		</div>
		<div class="list-right">
			<p>评分：{{ partTimeInfo.score }}</p>
			<p class="frequency">服务次数：{{ partTimeInfo.odersum }}</p>
		</div>
	</div>
	<div class="part-time-order-list">
		<!-- <img
			src="@/assets/images/icons/back.png"
			alt=""
			class="back-icon"
			@click="$router.go(-1)"
		/> -->
		<!-- <div class="total-count">120笔</div> -->
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
				<div v-for="item in listData" :key="item" class="list-item">
					<!-- <div class="list-img">
						<img :src="item.staffheadurl" alt="" class="goods-img" />
					</div> -->
					<div class="list-info">
						<div class="list-price">{{ item.type == 1 ? '陪诊就医' : '本地向导' }}</div>
					</div>
					<div class="list-right">
						<p class="time">订单时间{{ item.createtime }}</p>
						<p>实付:{{ item.price }}</p>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script setup>
const route = useRoute();
import { requestApi } from 'api/home';

const listData = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const currentPage = ref(1);

const onLoad = () => {
	fecthhOrderList();
};

const partTimeInfo = ref(JSON.parse(route.query.partTimeInfo));

const onRefresh = () => {
	// 清空列表数据
	listData.value = [];
	finished.value = false;

	// 重新加载数据
	// 将 loading 设置为 true，表示处于加载状态
	loading.value = true;
	currentPage.value = 1;
	onLoad();
};

// 获取订单列表
const fecthhOrderList = async () => {
	const parmas = {
		op: 'lookorder',
		currentPage: currentPage.value,
		staffid: partTimeInfo.value.id,
	};
	const res = await requestApi(parmas);
	listData.value = res.data;
	loading.value = false;
	console.log('res.data :>> ', res.data);
	// if (res.data.length == 0) {
	finished.value = true;
	// }
	console.log('1 :>> ', 1);
	currentPage.value++;
};
</script>

<style lang="less" scoped>
.list-item-st {
	width: 677px;
	height: 147px;
	background: #fefeff;
	border-radius: 15px;
	padding: 8px 16px;
	margin: 14px auto;
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
.part-time-order-list {
	width: 677px;
	// padding: 53px 37px;
	box-sizing: border-box;
	background: #f2f3f7;
	margin: auto;
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
		padding: 32px;
		margin-bottom: 14px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
			width: 100%;
			font-weight: 500;
			font-size: 30px;
			color: #010000;
			justify-content: space-between;
			align-items: center;
			// margin-top: 31px;
		}
		.list-right {
			display: flex;
			width: 100%;
			font-weight: 400;
			font-size: 30px;
			color: #010000;
			justify-content: space-between;
			align-items: center;
			.time {
				font-size: 24px;
				color: #bababa;
			}
		}
	}
}
</style>

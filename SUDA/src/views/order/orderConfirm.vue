<template>
	<div class="order-confirm" v-if="orderConfirm">
		<img :src="back" alt="" class="back-icon" @click="router.back()" />
		<div class="make-info">
			<img :src="orderConfirm.picture" alt="" />
			<div class="name-score">
				<div class="name">
					{{ orderConfirm.name }}
					<span
						><img src="@/assets/images/icons/make-star.png" alt="" />{{
							orderConfirm.score
						}}</span
					>
				</div>
				<div class="done">已完成{{ orderConfirm.odersum }}单</div>
			</div>
			<div class="order-state">待支付</div>
		</div>
		<div class="services-list" v-if="orderConfirm.nature == 1">
			<div
				class="specification-item"
				v-for="(item, index) in orderConfirm.confirmList"
				:key="index"
			>
				<img :src="item.url" alt="" class="specification-img" />
				<div class="specification-info">
					<div class="spe-name">{{ item.name }}</div>
					<div class="spe-suggestion">
						<img
							src="@/assets/images/icons/make-detail-time.png"
							alt=""
						/>开放时间：全天
					</div>
					<div class="spe-time">
						<img src="@/assets/images/icons/make-detail-diamond.png" alt="" />已售：1000
					</div>
				</div>
				<div class="item-right">
					<div class="spe-price">￥{{ item.price }}</div>
				</div>
			</div>
		</div>
		<div class="services-list-2" v-if="orderConfirm.nature == 2">
			<div
				class="specification-item"
				v-for="(item, index) in orderConfirm.confirmList"
				:key="index"
			>
				<div class="specification-info">
					<div class="spe-name">{{ item.name }}</div>
					<div class="spe-price">￥{{ item.price }}</div>
				</div>
				<div class="item-right">
					{{ item.introduce }}
				</div>
			</div>
		</div>
		<div class="prcie-detail">
			<!-- <div class="price-title">费用明细</div> -->
			<div class="detail-item">
				<span class="left">费用明细</span>
				<span>￥{{ totlePrice }}</span>
			</div>
			<div class="detail-item">
				<span class="left">备注</span>
				<van-field
					v-model="remark"
					rows="2"
					autosize
					type="textarea"
					maxlength="50"
					placeholder="请输入备注"
					show-word-limit
					style="background: #fff; padding: 0"
				/>
			</div>
		</div>
		<div class="bottom-btn">
			<span>合计</span>
			<span class="price">￥{{ totlePrice }}</span>
			<div class="confirm" @click="handleOrderConfirm">立即支付</div>
		</div>
	</div>
</template>

<script setup>
import back from '@/assets/images/icons/back.png';
import { requestApi } from 'api/home';

const router = useRouter();
const remark = ref('');

const orderConfirm = ref(null);
const userInfo = ref(null);
const totlePrice = ref(0);

const handleOrderConfirm = async () => {
	const res = await requestApi({
		op: 'order',
		nameid: userInfo.value.id,
		staffid: orderConfirm.value.staffid,
		type: orderConfirm.value.nature,
		oederitem: orderConfirm.value.confirmList.map((item) => item.id).join(','),
		other: remark.value ? remark.value : ' ',
		hsid: orderConfirm.value.hsid ? orderConfirm.value.hsid : 0,
	});
	router.push('/order');
	console.log('res :>> ', res);
};

onMounted(() => {
	try {
		orderConfirm.value = JSON.parse(sessionStorage.getItem('orderConfirm'));
		userInfo.value = JSON.parse(localStorage.getItem('userInfo'));
		console.log('orderConfirm.value :>> ', orderConfirm.value);
		totlePrice.value = orderConfirm.value.confirmList.reduce((pre, cur) => {
			console.log('pre :>> ', pre);
			console.log('cur.price :>> ', cur.price);

			return pre + Number(cur.price);
		}, 0);
	} catch (err) {
		console.log('err :>> ', err);
		router.go(-1);
	}
});
</script>

<style lang="less" scoped>
.order-confirm {
	min-height: 100vh;
	width: 100vw;
	background: #f2f3f7;
	padding: 0 18px;
	box-sizing: border-box;
	padding-bottom: 130px;
	padding-bottom: calc(130px + constant(safe-area-inset-bottom));
	padding-bottom: calc(130px + env(safe-area-inset-bottom));
	.back-icon {
		position: relative;
		width: 53px;
		height: 53px;
		top: 19px;
		left: 33px;
	}
	.make-info {
		display: flex;
		align-items: center;
		width: 714px;
		height: 145px;
		background: #ffffff;
		margin-bottom: 14px;
		margin-top: 45px;
		padding: 10px;
		box-sizing: border-box;
		img {
			width: 128px;
			height: 128px;
			margin-right: 28px;
		}
		.name-score {
			padding: 10px 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 80px;
			box-sizing: border-box;
			.name {
				font-weight: bold;
				font-size: 38px;
				color: #000000;
				display: flex;
				margin-bottom: 14px;
				span {
					font-size: 24px;
					color: #999;
					margin-left: 30px;
					display: flex;
					align-items: center;
					img {
						width: 26px;
						height: 25px;
					}
				}
			}
			.done {
				font-weight: 500;
				font-size: 20px;
				color: #a6a3a3;
			}
		}
		.order-state {
			font-weight: 400;
			font-size: 28px;
			color: #061710;
			margin-right: 35px;
			margin-left: auto;
		}
	}
	.services-list {
		.specification-item {
			display: flex;
			align-items: center;
			padding: 10px;
			font-size: 28px;
			box-sizing: border-box;
			margin: 0 auto 10px;
			width: 715px;
			height: 212px;
			background: #ffffff;
			box-sizing: border-box;

			.specification-img {
				width: 200px;
				height: 200px;
				margin-right: 30px;
			}
			.specification-info {
				flex: 1;
				height: 200px;
				.spe-name {
					font-weight: 500;
					font-size: 32px;
					color: #010000;
					margin-bottom: 30px;
					margin-top: 20px;
				}
				.spe-suggestion,
				.spe-time {
					font-weight: 500;
					font-size: 22px;
					color: #010000;
					display: flex;
					align-items: center;
					margin-bottom: 30px;
					img {
						width: 28px;
						height: 27px;
						margin-right: 10px;
					}
				}
			}
			.item-right {
				display: flex;
				margin-right: 30px;
				height: 212px;
				padding-top: 25px;
				box-sizing: border-box;
				height: 100%;
				.spe-price {
					font-weight: 500;
					font-size: 28px;
					color: #000000;
					margin: 20px 0;
				}
			}
		}
	}
	.services-list-2 {
		background: #fff;
		padding: 43px 27px;
		width: 716px;
		box-sizing: border-box;
		.specification-item {
			margin-bottom: 40px;
		}
		.specification-info {
			display: flex;
			font-weight: 400;
			font-size: 26px;
			color: #010000;
			align-items: center;
			justify-content: space-between;
		}
		.item-right {
			font-weight: 300;
			font-size: 22px;
			color: #a6a3a3;
			line-height: 36px;
			margin-top: 20px;
		}
	}
	.prcie-detail {
		padding: 20px 0;
		.price-title {
			font-size: 26px;
			font-weight: 600;
			padding-bottom: 10px;
		}
		.detail-item {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			margin-top: 30px;
			span {
				font-weight: 400;
				font-size: 26px;
				color: #565656;
			}
			.left {
				font-weight: 400;
				font-size: 26px;
				color: #010000;
			}

			.van-cell {
				width: 80%;
				background: #f5f5f5;
				border-radius: 10px;
			}
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
		border-top: 2px solid #f5f5f5;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		span {
			font-weight: 400;
			font-size: 26px;
			color: #010000;
			margin-right: 16px;
		}
		.price {
			font-weight: bold;
			font-size: 26px;
			color: #06690a;
		}
		.confirm {
			margin-left: auto;
			width: 176px;
			height: 70px;
			background: #93f582;
			border-radius: 29px;
			font-weight: bold;
			font-size: 28px;
			color: #061710;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>

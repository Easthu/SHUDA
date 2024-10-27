<template>
	<div class="agents-layout">
		<!-- <img :src="agentsBg" alt="" class="home-bg-fix" /> -->
		<div class="agents-info">
			<van-image round class="agents-avatar" :src="userInfo.url" />
			<div class="agents-name-place">
				<div class="agents-name">{{ userInfo.name }}</div>
			</div>
			<div class="qrcode" @click="handleOpenQrcode">
				<img src="@/assets/images/icons/qrcode-icons.png" alt="" />
				展示二维码
			</div>
		</div>

		<div class="payouts-detail">
			<div class="can-payouts-records">
				<div class="can-payouts" @click="handleLinkCanPayouts">
					<p>佣金可提现(元) <img src="@/assets/images/icons/arrow.png" alt="" /></p>
					<p class="money">{{ userInfo.money1 }}</p>
				</div>
				<div class="payouts-records" @click="handleLinkPayoutsRecords">提现记录</div>
			</div>
			<div class="payouts-type">
				<div>
					<p>积累佣金(元)</p>
					<p class="money">{{ userInfo.money4 }}</p>
				</div>
				<div>
					<p>提现中(元)</p>
					<p class="money">{{ userInfo.money2 }}</p>
				</div>
				<div>
					<p>已经提现(元)</p>
					<p class="money">{{ userInfo.money3 }}</p>
				</div>
			</div>
			<div class="payouts-btn" @click="handleLinkPayOuts">立即提现</div>
		</div>
		<div class="order-number">
			<div @click="handleCustomerService">
				<img src="@/assets/images/icons/my-customer.png" alt="" />
				<div class="name-number">
					<p>联系客服</p>
				</div>
			</div>
			<div @click="handleLinkPartTimeNumber">
				<img src="@/assets/images/icons/part-time-number.png" alt="" />
				<div class="name-number">
					<p>兼职人数</p>
					<p class="number">{{ userInfo.ordersum }}人</p>
				</div>
			</div>
		</div>
		<van-popup v-model:show="qrcodeOpen">
			<vue-qr :text="qrcode" class="vueQrStyle"></vue-qr>
		</van-popup>
	</div>
</template>

<script setup>
import agentsBg from '@/assets/images/home/agents-bg.png';
import { requestApi } from 'api/home';
import { showToast } from 'vant';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
const router = useRouter();

// 登录信息
const userInfo = ref(null);
userInfo.value = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;
if (userInfo) {
	requestApi({
		op: 'proxy',
		vxid: userInfo.value.id,
	}).then((res) => {
		console.log('res :>> ', res);
		userInfo.value = res.data;
	});
}

const handleLinkPayOuts = () => {
	console.log('跳转提现');
	router.push('/payOuts');
};
const handleLinkPayoutsRecords = () => {
	console.log('跳转提现记录');
	router.push('/payoutsRecords');
};

// 联系客服
const handleCustomerService = () => {
	window.location.href = 'https://work.weixin.qq.com/kfid/kfc14772150a656b3a6';
};

const handleLinkPartTimeNumber = () => {
	console.log('跳转兼职人数');
	router.push('/partTimeNumber');
};

const qrcodeOpen = ref(false);
const qrcode = ref('');
const handleOpenQrcode = (item) => {
	qrcodeOpen.value = true;
	qrcode.value =
		import.meta.env.VITE_NODE_APP_BASE +
		'/momoda/qrcodeAgents?bdvxid=' +
		JSON.parse(localStorage.getItem('userInfo')).id;
};
</script>

<style lang="less" scoped>
.agents-layout {
	padding: 24px;
	min-width: 100vw;
	min-height: 100vh;
	background-color: #f2f3f7;
	box-sizing: border-box;
	// position: relative;
	padding-top: 94px;
	background: #f2f3f7 url('@/assets/images/home/agents-bg.png') no-repeat;
	background-size: 100%;
	.home-bg-fix {
		position: absolute;
		z-index: 0;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
	}
	.agents-info {
		display: flex;
		height: 158px;
		// position: relative;
		padding-left: 55px;
		.agents-avatar {
			width: 158px;
			height: 158px;
			margin-right: 20px;
		}
		.agents-name-place {
			padding-top: 60px;
			display: flex;
			flex-direction: column;
			height: 158px;
			.agents-name {
				font-weight: 300;
				font-size: 34px;
				color: #010000;
			}
			.agents-place {
				font-weight: 300;
				font-size: 24px;
				color: #010000;
				margin-top: 12px;
			}
		}
		.qrcode {
			width: 197px;
			height: 52px;
			background: #ffc886;
			border-radius: 26px;
			margin-left: auto;
			font-weight: 300;
			font-size: 24px;
			color: #010000;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 60px;
			img {
				width: 29px;
				height: 29px;
				margin-right: 6px;
			}
		}
	}
	.payouts-detail {
		// position: relative;
		border-radius: 8px;
		padding: 43px 21px;
		margin: 42px auto 0;
		background: #fff;
		width: 679px;
		height: 422px;
		box-sizing: border-box;
		.can-payouts-records {
			display: flex;
			justify-content: space-between;
			.can-payouts {
				display: flex;
				flex-direction: column;
				p {
					font-weight: 300;
					font-size: 24px;
					color: #010000;
					display: flex;
					align-items: center;
					img {
						margin-left: 19px;
						width: 16px;
						height: 22px;
					}
				}
				.money {
					font-weight: 600;
					font-size: 40px;
					color: #010000;
					margin-top: 9px;
				}
			}
			.payouts-records {
				font-weight: 300;
				font-size: 24px;
				color: #bababa;
			}
		}
		.payouts-type {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 24px 0;
			div {
				display: flex;
				flex-direction: column;
				p {
					font-weight: 300;
					font-size: 24px;
					color: #010000;
				}
				.money {
					font-weight: 600;
					font-size: 40px;
					color: #010000;
					margin-top: 9px;
				}
			}
		}
		.payouts-btn {
			width: 338px;
			height: 88px;
			background: #fee405;
			border-radius: 44px;
			font-weight: 400;
			font-size: 36px;
			color: #010000;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 60px auto 0;
		}
	}
	.order-number {
		display: flex;
		justify-content: space-around;
		align-items: center;
		// position: relative;
		width: 677px;
		height: 116px;
		background: #fefeff;
		border-radius: 15px;
		margin-top: 42px;
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50%;
			margin-left: 50px;
			img {
				width: 76px;
				height: 73px;
			}
			.name-number {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-left: 24px;
				p {
					font-weight: 300;
					font-size: 24px;
					color: #010000;
					margin-top: 10px;
				}
				.number {
					font-weight: 400;
					font-size: 24px;
					color: #010000;
					margin-top: 14px;
				}
			}
		}
	}
}
</style>

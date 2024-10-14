<template>
	<div class="part-time-layout">
		<!-- <img :src="agentsBg" alt="" class="home-bg-fix" /> -->
		<div class="agents-info">
			<van-image round class="agents-avatar" :src="userInfo.url" />
			<div class="agents-name-place">
				<div class="agents-name">用户姓名：{{ userInfo.name }}</div>
				<!-- <div class="agents-place">朝天门来福士</div> -->
			</div>
			<div class="switch">
				<van-switch
					active-color="#02B98C"
					inactive-color="#dcdee0"
					:model-value="checked"
					@update:model-value="onUpdateValue"
					style="margin-bottom: 10px"
				/>
				{{ checked ? '关闭' : '开启' }}接单
			</div>
		</div>

		<div class="payouts-detail">
			<div class="can-payouts-records">
				<div class="can-payouts" @click="handleLinkCanPayouts">
					<p>订单数量</p>
					<p class="money">{{ userInfo.ordersum }}</p>
				</div>
				<div class="payouts-records" @click="handleLinkPayoutsRecords">提现记录</div>
			</div>
			<div class="payouts-type">
				<div>
					<p>积累佣金(元)</p>
					<p class="money">{{ userInfo.money1 }}</p>
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
			<!-- <div @click="handleLinkPartTimeOrderList">
				<img src="@/assets/images/icons/location-check-in.png" alt="" />
				<div class="name-number">
					<p>兼职订单</p>
				</div>
			</div> -->
			<div @click="handleCustomerService">
				<img src="@/assets/images/icons/my-customer.png" alt="" />
				<div class="name-number">
					<p>客服</p>
				</div>
			</div>
			<div @click="handleLinkPartTimeNumber">
				<img src="@/assets/images/icons/my-agreement.png" alt="" />
				<div class="name-number">
					<p>订单</p>
				</div>
			</div>
			<!-- <div @click="handleLinkPartTimeNumber">
				<img src="@/assets/images/icons/my-agreement.png" alt="" />
				<div class="name-number">
					<p>提现管理</p>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
import { requestApi } from 'api/home';
import { showToast } from 'vant';

const handleLinkPayOuts = () => {
	console.log('跳转提现');
	router.push('/payOuts');
};

const handleLinkPayoutsRecords = () => {
	console.log('跳转提现记录');
	router.push('/payoutsRecords');
};

const handleLinkPartTimeNumber = () => {
	console.log('跳转订单');
	router.push('/partOrderList');
};

// 联系客服
const handleCustomerService = () => {
	window.location.href = 'https://work.weixin.qq.com/kfid/kfc14772150a656b3a6';
};

const checked = ref(false);
const userInfo = ref(null);
userInfo.value = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;
if (userInfo) {
	requestApi({
		op: 'staffmoney',
		vxid: userInfo.value.id,
	}).then((res) => {
		console.log('res :>> ', res);
		userInfo.value = res.data;
		checked.value = res.data.online == 1 ? true : false;
	});
}

const onUpdateValue = (value) => {
	console.log('value :>> ', value);
	requestApi({
		op: 'openonline',
		vxid: userInfo.value.id,
		type: value ? 1 : 2,
	}).then((res) => {
		if (res.code == 0) {
			checked.value = value;
			showToast(`${checked.value ? '开启' : '关闭'}成功`);
		}
	});
};
</script>

<style lang="less" scoped>
.part-time-layout {
	padding: 24px;
	min-width: 100vw;
	min-height: 100vh;
	// background-color: #f2f3f7;
	box-sizing: border-box;
	// padding-top: 0;
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
		.switch {
			display: flex;
			flex-direction: column;
			font-weight: 300;
			font-size: 24px;
			color: #000000;
			align-items: center;
			justify-content: center;
			margin-left: auto;
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
					font-weight: 400;
					font-size: 36px;
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
					font-weight: 400;
					font-size: 36px;
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
		align-items: center;
		// position: relative;
		width: 677px;
		background: #fefeff;
		border-radius: 15px;
		margin-top: 42px;
		flex-wrap: wrap;
		padding-bottom: 20px;
		> div {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50%;
			padding-left: 50px;
			box-sizing: border-box;
			margin-top: 30px;

			img {
				width: 57px;
				height: 68px;
			}
			.name-number {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-left: 24px;
				flex: 1;
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

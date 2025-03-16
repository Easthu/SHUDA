<template>
	<div class="part-time-layout">
		<!-- <img :src="agentsBg" alt="" class="home-bg-fix" /> -->
		<div class="agents-info">
			<van-image round class="agents-avatar" :src="userInfo.url" />
			<div class="agents-name-place">
				<div class="agents-name">{{ userInfo.name }}</div>
				<!-- <div class="agents-place">朝天门来福士</div> -->
			</div>
			<div class="switch" v-if="isStaffPay == false">
				<van-switch
					active-color="#02B98C"
					inactive-color="#dcdee0"
					:model-value="checked"
					@update:model-value="onUpdateValue"
					style="margin-bottom: 10px"
				/>
				{{ checked ? '关闭' : '开启' }}接单
			</div>
			<div v-if="isStaffPay" class="isStaffPay" @click="handlePayStaffMoney">支付押金</div>
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
userInfo.value = sessionStorage.getItem('userInfo')
	? JSON.parse(sessionStorage.getItem('userInfo'))
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

// 是否需要支付兼职押金
const isStaffPay = ref(false);
const staffid = ref(null);
// 获取兼职详情
const fecthStaffId = async () => {
	const res = await requestApi({
		op: 'getstaffid',
		uid: JSON.parse(sessionStorage.getItem('userInfo')).id,
	});
	console.log('res :>> ', res);
	if (res.data.ifopen == 1 && res.data.ifpay == 0) {
		isStaffPay.value = true;
	}
	staffid.value = res.data.id;
};
const handlePayStaffMoney = async () => {
	const res = await requestApi({
		op: 'proxypay',
		staffid: staffid.value,
	});
	if (res.code == 0) {
		weixinPay(res.data.ordernum);
	}
};
const weixinPay = async (ordernum) => {
	const payRes = await requestApi({
		op: 'getorderPay',
		ordernum: ordernum,
		openid: JSON.parse(sessionStorage.getItem('userInfo')).openid,
	});
	console.log('payRes :>> ', payRes);
	// 微信内置浏览器支付
	// 下面是解决WeixinJSBridge is not defined 报错的方法
	if (typeof WeixinJSBridge === 'undefined') {
		// 微信浏览器内置对象。参考微信官方文档
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady(payRes.data), false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady(payRes.data));
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(payRes.data));
		}
	} else {
		onBridgeReady(payRes.data);
	}
	console.log('payRes :>> ', payRes);
};

const onBridgeReady = (res) => {
	// eslint-disable-next-line
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest',
		{
			appId: res.appId, //公众号名称，由商户传入
			nonceStr: res.nonceStr, //随机串
			package: res.package, // prepay_id=xxx
			timeStamp: res.timeStamp, //时间戳
			signType: res.signType, //微信签名方式：
			paySign: res.paySign, //微信签名
		},
		function (res) {
			//android：支付成功、支付失败、取消支付  都能执行这个回调
			//ios：支付失败、取消支付  能执行这个回调， 支付成功不执行这个回调
			if (res.err_msg == 'get_brand_wcpay_request:ok') {
				// 使用以上方式判断前端返回,微信团队郑重提示：
				window.location.reload();
			} else {
				console.log('res :>> ', res);
			}
		}
	);
};

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
fecthStaffId();
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
		.isStaffPay {
			margin-left: auto;
			margin-top: 40px;
			width: 200px;
			height: 60px;
			background: #fee405;
			border-radius: 30px;
			font-weight: 400;
			font-size: 26px;
			color: #010000;
			display: flex;
			justify-content: center;
			align-items: center;
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

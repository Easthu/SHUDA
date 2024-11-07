<template>
	<div class="order-detail" v-if="orderDetail">
		<img :src="back" alt="" class="back-icon" @click="router.back()" />
		<div class="make-info">
			<img :src="orderDetail.staffheadurl" alt="" />
			<div class="name-score">
				<div class="name">
					{{ orderDetail.staffname }}
					<span
						><img src="@/assets/images/icons/make-star.png" alt="" class="score" />{{
							orderDetail.score
						}}</span
					>
				</div>
				<!-- <div class="done">已完成43单</div> -->
			</div>
			<div class="order-state">
				{{ ['待支付', '已支付', '待服务', '已完成', '已评价'][orderDetail.status] }}
			</div>
		</div>
		<div class="services-list" v-if="orderDetail.type == 1">
			<div class="specification-item" v-for="(item, index) in scenicspotList" :key="index">
				<img :src="item.url" alt="" class="specification-img" v-if="item.url" />
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
		<!-- 医院 -->
		<div class="services-list-2" v-if="orderDetail.type == 2 && HospitalDetai">
			<div class="specification-info">
				<div class="spe-name">{{ HospitalDetai.name }}</div>
				<div class="spe-price">￥{{ HospitalDetai.price }}</div>
			</div>
			<div class="item-right">
				{{ HospitalDetai.introduce }}
			</div>
		</div>
		<div class="prcie-detail">
			<div class="detail-item">
				<p class="left">实付款</p>
				<p>￥{{ orderDetail.price }}</p>
			</div>
			<div class="detail-item">
				<p class="left">清单编号</p>
				<p>
					{{ orderDetail.ordernum
					}}<span @click="handleClipboard(orderDetail.ordernum)">复制</span>
				</p>
			</div>
			<div class="detail-item">
				<p class="left">创建时间</p>
				<p>{{ orderDetail.createtime }}</p>
			</div>
			<!-- <div class="detail-item">
				<p class="left">付款时间</p>
				<p>{{ orderDetail. }}</p>
			</div> -->
			<div class="detail-item">
				<p class="left">备注</p>
				<p>{{ orderDetail.other }}</p>
			</div>
		</div>
		<div class="bottom-btn">
			<div @click="handleCustomerService">联系客服</div>
			<div @click="weixinPay" v-if="orderDetail.status == 0">立即支付</div>
			<!-- <div>扫码服务</div> -->
			<!-- <div @click="handleCancelOrder" class="cancel">取消订单</div> -->
		</div>
	</div>
</template>

<script setup>
import handleClipboard from '@/utils/clipboard';
import { showConfirmDialog } from 'vant';
import back from '@/assets/images/icons/back.png';
import hongyadong from '@/assets/images/order/hongyadong.png';
import jiefangbei from '@/assets/images/order/jiefangbei.png';
import renmingdalitang from '@/assets/images/order/renmingdalitang.png';
const router = useRouter();
import { requestApi } from 'api/home';

const goodsList = ref([
	{
		name: '洪崖洞',
		img: hongyadong,
		suggestion: '建议玩1-2小时',
		time: '开放时间：全天',
		price: '80',
		checked: false,
	},
	{
		name: '解放碑',
		img: jiefangbei,
		suggestion: '建议玩1-2小时',
		time: '开放时间：全天',
		price: '100',
		checked: false,
	},
	{
		name: '人民大礼堂',
		img: renmingdalitang,
		suggestion: '建议玩1-2小时',
		time: '开放时间：全天',
		price: '80',
		checked: false,
	},
]);
const handleCancelOrder = () => {
	console.log('取消订单');
	showConfirmDialog({
		title: '取消订单',
		message: '是否取消订单，取消订单需要平台审核',
		confirmButtonColor: 'red',
	})
		.then(() => {
			// on confirm
		})
		.catch(() => {
			// on cancel
		});
};

const weixinPay = async () => {
	const payRes = await requestApi({
		op: 'getorderPay',
		ordernum: orderDetail.value.ordernum,
		openid: JSON.parse(sessionStorage.getItem('userInfo')).openid,
	});
	console.log('payRes :>> ', payRes);
	// 微信内置浏览器支付
	// 下面是解决WeixinJSBridge is not defined 报错的方法
	if (typeof WeixinJSBridge === 'undefined') {
		// 微信浏览器内置对象。参考微信官方文档
		if (document.addEventListener) {
			document.addEventListener(
				'WeixinJSBridgeReady',
				handle.onBridgeReady(payRes.data),
				false
			);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', handle.onBridgeReady(payRes.data));
			document.attachEvent('onWeixinJSBridgeReady', handle.onBridgeReady(payRes.data));
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
				//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				showLoadingToast({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
			} else {
				console.log('res :>> ', res);
			}
		}
	);
};

const orderDetail = ref(null);

// 获取景点
const scenicspotList = ref([]);
const requestScenicspotList = async (id) => {
	const params = {
		op: 'scenicid',
		id,
	};
	const { data } = await requestApi(params);
	scenicspotList.value = [...scenicspotList.value, data];
	scenicspotList.value = scenicspotList.value.filter((item) => item);
	console.log('scenicspotList.value :>> ', scenicspotList.value);
};

const HospitalDetai = ref(null);
// 医院列表
const requesHospitalList = async (hs, oederitem) => {
	const params = {
		op: 'gethospitalitem',
		id: hs,
		currentPage: 1,
	};
	const { data } = await requestApi(params);
	HospitalDetai.value = data.find((item) => item.id == oederitem);
	console.log('HospitalDetai.value :>> ', HospitalDetai.value);
};

// 联系客服
const handleCustomerService = () => {
	window.location.href = 'https://work.weixin.qq.com/kfid/kfc14772150a656b3a6';
};

onMounted(() => {
	try {
		orderDetail.value = JSON.parse(sessionStorage.getItem('orderDetail'));
		console.log('orderDetail.value :>> ', orderDetail.value);
		if ((orderDetail.value.oederitem.split(',').length > 0) & (orderDetail.value.type == 1)) {
			orderDetail.value.oederitem.split(',').forEach((item) => {
				requestScenicspotList(item);
			});
		}
		console.log('orderDetail :>> ', orderDetail.value);
		if (orderDetail.value.type == 2) {
			requesHospitalList(orderDetail.value.hs, orderDetail.value.oederitem);
		}
	} catch (e) {
		console.log('e :>> ', e);
		router.go(-1);
	}
});
</script>

<style lang="less" scoped>
.order-detail {
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
					.score {
						width: 26px;
						height: 26px;
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
			font-weight: bold;
			font-size: 28px;
			color: #061710;
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
						margin-right: 11px;
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
			p {
				font-weight: 400;
				font-size: 26px;
				color: #565656;
			}
			.left {
				font-weight: 400;
				font-size: 26px;
				color: #010000;
			}
		}
	}
	.bottom-btn {
		display: flex;
		justify-content: space-around;
		margin-top: 36px;
		div {
			width: 176px;
			height: 60px;
			background: #ffffff;
			border-radius: 29px;
			border: 3px solid #93f582;
			font-weight: bold;
			font-size: 28px;
			color: #061710;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.cancel {
			background: #93f582;
		}
	}
}
</style>

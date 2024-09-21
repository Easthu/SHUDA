<template>
	<div class="personal-business-license">
		<div class="license-top">
			<img :src="back" alt="" class="back-icon" @click="router.back()" />
			<p>营业执照</p>
		</div>
		<div class="contracted-merchants">
			<img src="@/assets/images/icons/make-detail-checked.png" alt="" />
			<div class="license-content">
				<p class="content-top">签约商家</p>
				<p class="content-bottom">签约商家签约商家签约商家签约商家</p>
			</div>
		</div>

		<div class="name-pass">
			<img src="@/assets/images/icons/make-detail-checked.png" alt="" />
			<div class="license-content">
				<p class="content-top">
					实名认证通过
					<!-- <span>身份证5000**********************</span> -->
				</p>
				<p class="content-bottom">所有兼职人员签约入驻平台时，身份信息均已通过核检</p>
			</div>
		</div>
		<div class="authentication-done">
			<img src="@/assets/images/icons/make-detail-checked.png" alt="" />
			<div class="license-content">
				<p class="content-top">已在平台完成市场主体登记认证</p>
				<p class="content-bottom">所有兼职人员签约入驻平台时，身份信息均已通过核检</p>
			</div>
		</div>
		<!-- <div class="id-card-img">
			<p>所属商家资质</p>
			<img src="@/assets/images/home/zhouxingle.png" alt="" />
		</div> -->
	</div>
</template>
<script setup>
import back from '@/assets/images/icons/back.png';

const router = useRouter();
</script>
<style lang="less" scoped>
.personal-business-license {
	display: flex;
	flex-direction: column;
	background: #f2f3f7;
	min-height: 100vh;
	padding: 46px 30px;
	box-sizing: border-box;
	.license-top {
		display: flex;
		align-items: center;
		img {
			width: 53px;
			height: 53px;
			background: #93f582;
			border-radius: 50%;
			margin-right: 215px;
		}
		p {
			font-weight: 400;
			font-size: 38px;
			color: #000000;
		}
	}
	.contracted-merchants,
	.name-pass,
	.authentication-done {
		margin: 0 auto;
		display: flex;
		width: 638px;
		height: 112px;
		background: #fefeff;
		border-radius: 15px;
		padding: 19px 8px;
		box-sizing: border-box;
		img {
			width: 33px;
			height: 33px;
			margin-right: 15px;
		}
		.license-content {
			display: flex;
			flex-direction: column;
		}
		.content-top {
			font-weight: 400;
			font-size: 30px;
			color: #000000;
			margin-bottom: 19px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			span {
				font-weight: 300;
				font-size: 18px;
				color: #93f582;
			}
		}
		.content-bottom {
			font-weight: 300;
			font-size: 22px;
			color: #000000;
		}
	}
	.contracted-merchants {
		margin-top: 61px;
	}
	.name-pass {
		margin-top: 26px;
	}
	.authentication-done {
		margin-top: 38px;
	}
	.id-card-img {
		display: flex;
		flex-direction: column;
		margin: 57px auto;
		p {
			font-weight: 400;
			font-size: 32px;
			color: #000000;
			text-align: center;
			margin-bottom: 31px;
		}
		img {
			width: 685px;
			height: 378px;
			background: #bfbfbf;
			border-radius: 15px;
		}
	}
}
</style>

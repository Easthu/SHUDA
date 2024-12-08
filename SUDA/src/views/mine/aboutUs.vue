<template>
	<div class="user-agreement">
		<img :src="back" alt="" class="back" @click="router.back()" />
		<div class="content">
			陌搭陪伴兼职服务平台主要以提供本地向导和陪诊就医为主要服务内容。
			<br />
			本地向导：作为本地向导，可以带游客前往当地最具特色的宝藏餐厅、必游景点和最值得去的地方，在陪伴过程中讲解当地民俗故事等，给旅游者“原汁原味”的本地体验。
			<br />
			陪诊就医：主要陪同患者前往医院，协助患者完成挂号、缴费、取药等一系列就医流程，同时为患者提供心理疏导，帮助患者应对医疗过程中的压力和焦虑。
		</div>
	</div>
</template>

<script setup>
import back from '@/assets/images/icons/back.png';
const router = useRouter();
</script>

<style lang="less" scoped>
.user-agreement {
	.back {
		width: 53px;
		height: 53px;
		margin-left: 51px;
		margin-top: 44px;
	}
	.content {
		width: 675px;
		height: 811px;
		background: #ffffff;
		font-weight: 500;
		font-size: 24px;
		color: #000000;
		line-height: 41px;
		margin: 70px auto 0;
		padding: 30px;
		box-sizing: border-box;
	}
}
</style>

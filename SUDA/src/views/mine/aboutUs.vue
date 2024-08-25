<template>
	<div class="about-us">
		<img :src="back" alt="" class="back" @click="router.back()" />
		<div class="content">
			用户隐私协议主要包括以下内容：
			<br />
			信息收集与使用：在用户使用我们的产品和服务时，我们可能会收集用户的个人信息，包括但不限于姓名、电子邮件地址、联系方式等。这些信息将用于改善我们的产品和服务，并为用户提供更好的用户体验。我们承诺不会向第三方公开或出售用户的个人信息，除非事先取得用户的许可或根据法律法规的规定。
			<br />
			信息处理与存储：我们将采取适当的安全措施，确保用户的个人信息的安全性。我们会在合理的时间内删除用户的个人信息，除非法律法规另有规定或我们另行通知。
			<br />
			信息共享与披露：除非得到用户的许可或根据法律法规的规定，我们不会向任何第三方共享用户的个人信息。但在以下情况下，我们可能会与第三方共享用户的个人信息：经用户事先同意或授权的情况下；根据法律法规的规定或有权机关的要求；维护我们的合法权益或遵守我们的服务条款。
		</div>
	</div>
</template>

<script setup>
import back from '@/assets/images/icons/back.png';
const router = useRouter();
</script>

<style lang="less" scoped>
.about-us {
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

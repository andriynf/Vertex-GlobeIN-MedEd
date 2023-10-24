<template>
	<div class="qr-code-tip swing-in-bottom-fwd animate__animated1 animate__slideInUp animate__delay-1s">

		<img src="/img/qr_image.png" alt="">

	</div>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		mounted() {},
		methods: {},
	};
</script>

<style lang="scss">
.qr-code-tip {
  position: absolute;
	left: 35px;
	bottom: -15px;
	animation-delay: 1s !important;
}
</style>

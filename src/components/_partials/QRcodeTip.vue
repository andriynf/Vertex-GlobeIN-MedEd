<template>
	<div class="qr-code-tip swing-in-bottom-fwd animate__animated1 animate__slideInUp animate__delay-1s">

		<img src="/img/qr_image.png" alt="">

		<div class="extimg">
			<slot>ext image</slot>
		</div>

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
	left: 60px;
	bottom: -15px;
	animation-delay: 1s !important;

	.extimg {
		position: absolute;
		left: 155px;
    top: 60px;
    width: 270px;
    height: 270px;
		border-radius: 10px;
    overflow: hidden;
		// background-color: rgba(255, 228, 225, 0.616);
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

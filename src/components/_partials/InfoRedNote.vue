<template>
	<div class="info-red-note animate__animated animate__slideInRight">
		<div class="info-content">
			<svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.58 52.58">
				<path d="m26.29,0C11.79,0,0,11.79,0,26.29s11.79,26.29,26.29,26.29,26.29-11.79,26.29-26.29S40.78,0,26.29,0Zm.73,7.81c3.2,0,5.81,2.61,5.81,5.81s-2.61,5.81-5.81,5.81-5.81-2.61-5.81-5.81,2.61-5.81,5.81-5.81Zm7.95,34.78c-.46.49-.95.59-1.28.59h-13.34c-.33,0-.83-.1-1.28-.59-.35-.38-.53-.88-.53-1.47s.17-1.12.52-1.51c.46-.52.96-.63,1.3-.63h1.52v-11.12h-1.52c-.33,0-.83-.1-1.28-.59-.35-.38-.53-.88-.53-1.48s.17-1.11.52-1.51c.46-.52.96-.63,1.3-.63h11.18c.36,0,.65.29.65.65v14.68h1.51c.34,0,.84.11,1.3.63.35.39.52.9.52,1.51s-.18,1.09-.54,1.47Z" />
			</svg>
			<div><slot>Label</slot></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		mounted() {
		},
		methods: {
		},
	};
</script>

<style lang="scss">
.info-red-note {
	position: relative;
	display: flex;
	justify-content: center;
	font-family: 'SourceSansPro-Semibold';
	font-size: 47px;
	fill: #d06578;
	color: #d06578;
	
	.info-icon {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		left: -40px;
    width: 60px;
		border: 8px solid #fff;
		border-radius: 50%;
	}

	.info-content {
		position: relative;
		padding: 15px 60px;
		border-radius: 20px;
		border: 2px solid #d06578;
	}

	
}
</style>

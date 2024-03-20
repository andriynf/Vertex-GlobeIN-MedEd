<template>
	<div class="info-note">
		<div class="info-content" :style="`color:${color}`">
			<img class="info-icon" :style="`border-color:${color}`" src="/img/icon_info.svg" alt="">
			<div><slot>Label</slot></div>
		</div>
		<!-- <svg style="" viewBox="0 0 38.94 74.87">
			<polyline points="1.5 1.5 37.44 37.44 1.5 73.37" :style="`stroke:${color}` " style="fill: none; stroke: #512c7d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3px;"/>
		</svg> -->
	</div>
</template>

<script>
	export default {
		props: {
			color: {
				type: String,
				default: '#512c7d',
			},
			
		},
		data() {
			return {
			};
		},
		mounted() {},
		methods: {
		},
	};
</script>

<style lang="scss">
.info-note {
	position: relative;
	display: flex;
	justify-content: center;
	
	.info-icon {
		position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: -35px;
    width: 50px;
    border: 6px solid #512c7d;
    border-radius: 50%;
	}

	.info-content {
		background-color: rgba(255, 255, 255, 0.9);
		font-family: 'SourceSansPro-Semibold';
		font-size: 23px;
		line-height: 30px;
		padding: 20px 40px;
		border-radius: 15px;
		position: relative;
	}

	// svg {
	// 	height: inherit;
	// 	padding: 28px 40px;
	// }
	
}
</style>

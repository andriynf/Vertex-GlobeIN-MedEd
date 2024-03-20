<template>
	<button 
		class="glob-button" 
		:class="[`icon_position-${icon_position}`]"
		:style="`border-color:${color}`" click="clickme()" 
	>

		<div class="label" :style="`color:${color}`"><slot>Label</slot></div>
		<svg style="" viewBox="0 0 38.94 74.87">
			<polyline points="1.5 1.5 37.44 37.44 1.5 73.37" :style="`stroke:${color}` " style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 6px;"/>
		</svg>
	</button>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: 'arrow_right',
			},
			icon_position: {
				type: String,
				default: 'right',
			},
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
			clickme(){
        this.$emit("click");
				// this.$router.push({ name: 'attract' });
			}
		},
	};
</script>

<style lang="scss">
.glob-button {
  border: 2px solid #51267d;
	color: #51267d;
	background-color: transparent;
	border-radius: 16px;
	height: 90px;
	// width: 256px;
	font-family: 'SourceSansPro-Semibold';
	font-size: 27px;
	line-height: 1;
	display: flex;
  align-items: center;
	padding: 0;

	.label {
		padding-left: 40px;
		white-space: nowrap;
	}
	svg {
		height: inherit;
		padding: 18px 30px;
	}
	& *{
		pointer-events: none;
	}
	
	&:hover {
		opacity: 0.9;
	}

	&.icon_position-left {
		flex-direction: row-reverse;
		.label {
			padding-left: 0px;
			padding-right: 50px;
		}
		svg {
			transform: rotate(180deg);
		}
	}
	
}
</style>

<template>
	<div class="footerarea">
		<div class="row">
			<div class="col"></div>
			<div class="col">
				<div class="bottommenu slide-in-blurred-bottom">
					<button class="btnHome" @click="onHomeClick()">
						<div>
							<svg style="width: 63px; height: 61px;" viewBox="0 0 62.76 60.76">
								<polygon points="61.26 31.38 31.38 1.5 1.5 31.38 10.25 31.38 10.25 59.26 52.5 59.26 52.5 31.38 61.26 31.38" style="fill: none; stroke: #512c7d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3px;"/>
							</svg>
							<span>HOME</span>
						</div>
					</button>
					<button class="btnBack" @click="onBackClick()">
						<div>
							<svg style="width: 39px; height: 75px;" viewBox="0 0 38.94 74.87">
								<polyline points="37.44 1.5 1.5 37.44 37.44 73.37" style="fill: none; stroke: #512c7d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3px;"/>
							</svg>
							<span>Back</span>
						</div>
					</button>
					<button class="btnNext" @click="onNextClick()">
						<div>
							<span>Next</span>
							<svg style="width: 39px; height: 75px;" viewBox="0 0 38.94 74.87">
								<polyline points="1.5 1.5 37.44 37.44 1.5 73.37" style="fill: none; stroke: #512c7d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3px;"/>
							</svg>
						</div>
					</button>
				</div>
			</div>
			<div class="col">
				<img class="logoimg" src="/img/vertex_logo_color.png" alt="">
			</div>
		</div>
	</div>
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
		mounted() {
		},
		methods: {
			onHomeClick(){
				// this.$emit("onHomeClick");
				// this.$router.push({ name: 'attract' });
				this.$store.dispatch("saveActivity", {
					ec: 'Bottom Menu',
					ea: 'click',
					el: "Home button",
				});
				this.$router.push({ name: "homepage" });
			},
			onBackClick(){
				this.$store.dispatch("saveActivity", {
					ec: 'Bottom menu',
					ea: 'click',
					el: "Back button",
				});
        this.$emit("onBackClick");
			},
			onNextClick() {
				this.$store.dispatch("saveActivity", {
					ec: 'Bottom menu',
					ea: 'click',
					el: "Next button",
				});	
				this.$emit("onNextClick");
			},
		},
	};
</script>

<style lang="scss">
.footerarea {
	.bottommenu {
		display: flex;
		align-items: center;
		justify-content: center;
		animation-delay: 1s !important;

		button {
			border: 1px solid #51267d;
			color: #51267d;
			background-color: transparent;
			border-radius: 16px;
			height: 125px;
			width: 256px;
			font-family: 'SourceSansPro-Semibold';
			font-size: 41px;
			line-height: 1;
			margin: 55px 25px 0;
			> div {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 15px;
				// pointer-events: none;
			}
			&:hover {
				background-color:rgba(81, 38, 125, 0.1)
			}
		}
	}
	.logoimg {
		margin-left: auto;
		margin-right: 90px;
		display: block;
	}
}
</style>

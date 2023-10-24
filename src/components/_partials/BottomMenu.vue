<template>
	<div class="footerarea">
		<div class="row">
			<div class="col"></div>
			<div class="col">
				<div class="bottommenu slide-in-blurred-bottom">
					<button class="btnHome" @click="onHomeClick()">
						<div>
							<svg style="width: 45px; height: 43px;" viewBox="0 0 44.68 43.25">
								<polygon points="43.68 22.34 22.34 1 1 22.34 7.25 22.34 7.25 42.25 37.43 42.25 37.43 22.34 43.68 22.34" style="fill: none; stroke: #51267d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px;"/>
							</svg>
							<span>HOME</span>
						</div>
					</button>
					<button class="btnBack" @click="onBackClick()">
						<div>
							<svg style="width: 28px; height: 53px;" viewBox="0 0 27.67 53.34">
								<polyline points="26.67 1 1 26.67 26.67 52.34" style="fill: none; stroke: #51267d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px;"/>
							</svg>
							<span>Back</span>
						</div>
					</button>
					<button class="btnNext" @click="onNextClick()">
						<div>
							<span>Next</span>
							<svg style="width: 28px; height: 53px;" viewBox="0 0 27.67 53.34">
								<polyline points="1 1 26.67 26.67 1 52.34" style="fill: none; stroke: #51267d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px;"/>
							</svg>
						</div>
					</button>
				</div>
			</div>
			<div class="col">
				<img class="logoimg" src="/img/vertex_logo_color.svg" width="179" alt="">
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
			border: 2px solid #51267d;
			color: #51267d;
			background-color: transparent;
			border-radius: 16px;
			height: 90px;
			width: 183px;
			font-family: 'SourceSansPro-Semibold';
			font-size: 30px;
			line-height: 1;
			margin: 28px 15px 0;
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
		margin-right: 100px;
		display: block;
	}
}
</style>

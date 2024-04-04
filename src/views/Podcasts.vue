<template>
  <div class="podcasts page-view">
		<div class="content-box">
			<div class="bodyarea">

				<div class="pageheader">
					<div class="iconstick">
						<img src="/img/bigicon_cast.png" width="263">
						<div>VIDEOS <br>& PODCASTS</div>
					</div>
					<div class="title">
						Video and podcast content hosted by leading international experts, <br>focused on key topics of clinical interest in haemoglobinopathies. <br>See below for available content:
					</div>
				</div>

				<info-red-note class="topAlert">Click below to watch the teaser videos or scan the QR code to access the full videos on the GlobeIN website</info-red-note>

				<div class="threeboxes">
					<div>
						<div class="topimg"><img src="/img/podcast_b2.png"/></div>
						<div class="title">SPOTLIGHT ON SICKLE CELL DISEASE: <br>CLINICAL COMPLICATIONS</div>
						<div class="botbut">
							<global-button color="#fff" @click="openVideoPage(0)">Click here to watch a teaser of <br>Dr Rachel Kesse-Adu’s video</global-button>
						</div>
					</div>
					<div>
						<div class="topimg"><img src="/img/podcast_b1.png"/></div>
						<div class="title">TALKING β-THALASSAEMIA: <br>CLINICAL COMPLICATIONS</div>
						<div class="botbut">
							<global-button color="#fff" @click="openVideoPage(1)">Click here to watch a teaser <br>of Dr Emma Drasar’s video</global-button>
						</div>
					</div>
					<div>
						<div class="topimg"><img src="/img/podcast_b3.png"/></div>
						<div class="title">HOLISTIC CONSIDERATIONS <br>IN HAEMOGLOBINOPATHIES: <br>PSYCHOLOGICAL AND MENTAL HEALTH</div>
						<div class="botbut">
							<global-button color="#fff" @click="openVideoPage(2)">Click here to watch a teaser of Dr Rachel <br>Kesse-Adu and Dr Kofi Anie’s podcast</global-button>
						</div>
					</div>
				</div>

				
			</div>
			
			<bottom-menu @onBackClick="onMenuBackClick()" @onNextClick="onMenuNextClick()" />

		</div>

		<qr-code-tip>
			<img src="/img/codes/GlobeIN_iPad_QR_slide7_videos.png" alt="">
		</qr-code-tip>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
  },
	computed: {
		...mapState([
			"config",
			"ipc_renderer",
			"main_data",
		]),
	},
  data() {
    return {
    };
  },
  created(){},
	beforeDestroy(){},
  mounted() {},
  methods: {
		openVideoPage(tabid) {
			// console.log('tabid=', tabid);
			
			this.$store.dispatch("saveActivity", {
				ec: 'Videos & Podcasts page',
				ea: 'click',
				el: this.main_data.podvideos[tabid].title,
			});

			this.$store.dispatch("forceOpenPlayer", tabid);
		},
		onMenuBackClick() {
			this.$router.push({ name: "interactive" });
			// this.$router.push({ name: "overview" });
		},
		onMenuNextClick() {
			this.$router.push({ name: "community" });
		},
    
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.podcasts {
  // background-image: url('/img/temp7.jpg');
	// .content-box {
	// 	background-color: rgb(255, 255, 255, 0.5);
	// }
	
	.pageheader {
		padding-top: 60px;
		display: flex;
    align-items: center;
		overflow: hidden;
		
		.iconstick {
			height: 250px;
			width: 940px;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			padding-left: 45px;
			font-family: 'SourceSansPro-Semibold';
			font-size: 83px;
			color: #fff;
			line-height: 1;
			gap: 40px;
			border-radius: 0 25px 25px 0;
			background-color: #51267d;
			animation:slide-in-left .5s cubic-bezier(.25,.46,.45,.94) both;
		}
		.title {
			font-weight: bold;
			margin-left: 90px;
			color: #51267d;
			font-size: 44px;
			line-height: 54px;
		}
	}

	.topAlert {
		justify-content: flex-start;
		margin-left: 120px;
    margin-top: 120px;
		font-size: 37px;
	}

	.threeboxes {
		margin: 80px 100px 0;
		height: 950px;
		display: flex;
		gap: 40px;
		
		> div {
			flex: 1 0 0%;
			border-radius: 20px;
    	border: 1px solid #51267d;
			background-color: #51267d; //rgba(255, 255, 255, 1);
			display: flex;
			flex-direction: column;
			// align-items: center;
			padding: 90px 50px;
			justify-content: space-between;
			animation:fade-in-bottom .6s cubic-bezier(.39,.575,.565,1.000) both;
			
			&:nth-child(1){
				animation-delay: .3s;
				background-color: #08a9b7;
			}
			&:nth-child(2){
				animation-delay: .6s;
				background-color: #d06578;
			}
			&:nth-child(3){
				animation-delay: .9s;
			}
		}
		.topimg img {
			// width: 520px;
			width: 100%;
		}
		.title {
			font-weight: bold;
			font-size: 35px;
			line-height: 43px;
			color: #fff;
			// text-align: center;
			// height: 260px;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			
		}
		.botbut {
			height: 160px;
			.glob-button {
				height: 127px;
				line-height: 1.4;
				// background-color: rgba(81, 38, 125, 0.9);
				background-color: transparent;
				text-align: right;
				svg {
					padding: 25px 35px;
				}
			}
		}
		
	}

}
</style>

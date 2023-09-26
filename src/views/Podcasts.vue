<template>
  <div class="podcasts page-view">
		<div class="content-box">
			<div class="bodyarea">

				<div class="pageheader">
					<div class="iconstick">
						<img src="/img/bigicon_cast.png" width="353">
						<div>VIDEOS <br>& PODCASTS</div>
					</div>
					<img class="title" src="/img/globein_teractive.png" width="1278">
				</div>

				<info-red-note class="topAlert">Click below to watch the teaser videos, and scan the QR code to access the full videos on the GlobeIN website</info-red-note>

				<div class="threeboxes">
					<div>
						<div class="topimg"><img src="/img/podcast_b1.png"/></div>
						<div class="title">TALKING β-THALASSAEMIA: <br>CLINICAL COMPLICATIONS</div>
						<div class="botbut">
							<global-button color="#fff" @click="openVideoPage(1)">Click here to watch a teaser <br>of Dr Emma Drasar’s video</global-button>
						</div>
					</div>
					<div>
						<div class="topimg"><img src="/img/podcast_b2.png"/></div>
						<div class="title">SPOTLIGHT ON SICKLE CELL DISEASE: <br>CLINICAL COMPLICATIONS</div>
						<div class="botbut">
							<global-button color="#fff" @click="openVideoPage(0)">Click here to watch a teaser of <br>Dr Rachel Kesse-Adu’s video</global-button>
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

		<qr-code-tip />
    
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
			this.$router.push({ name: "overview" });
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
  // background-image: url('/img/temp6.jpg');
  // .content-box {
	// 	background-color: rgb(255, 255, 255, 0.5);
	// }
	
	.pageheader {
		padding-top: 90px;
		display: flex;
    align-items: center;
		overflow: hidden;
		
		.iconstick {
			height: 340px;
			width: 1260px;
			display: flex;
			align-items: center;
			padding-left: 50px;
			font-family: 'SourceSansPro-Semibold';
			font-size: 113px;
			color: #fff;
			line-height: 100px;
			gap: 60px;
			border-radius: 0 25px 25px 0;
			background-color: #51267d;
			animation:slide-in-left .5s cubic-bezier(.25,.46,.45,.94) both;
		}
		.title {
			margin-top: 50px;
    	margin-left: 100px;
		}
	}

	.topAlert {
		justify-content: flex-start;
		margin-left: 270px;
    margin-top: 80px;
	}

	.threeboxes {
		margin: 50px 270px 0;
		height: 1080px;
		display: flex;
		gap: 60px;
		
		> div {
			flex: 1 0 0%;
			border-radius: 25px;
    	border: 1px solid #51267d;
			background-color: #51267d; //rgba(255, 255, 255, 1);
			display: flex;
			flex-direction: column;
			// align-items: center;
			padding-left: 70px;
			padding-top: 70px;
			justify-content: space-between;
			animation:fade-in-bottom .6s cubic-bezier(.39,.575,.565,1.000) both;
			
			&:nth-child(1){
				animation-delay: .3s;
			}
			&:nth-child(2){
				animation-delay: .6s;
			}
			&:nth-child(3){
				animation-delay: .9s;
			}
		}
		.title {
			font-weight: bold;
			font-size: 50px;
			line-height: 60px;
			color: #fff;
			// text-align: center;
			// height: 260px;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			
		}
		.botbut {
			height: 250px;
			.glob-button {
				height: 170px;
				line-height: 1.25;
				background-color: rgba(81, 38, 125, 0.9);
				text-align: right;
			}
		}
		
	}

}
</style>

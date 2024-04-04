<template>
  <div class="interactive page-view">
		
		<div class="content-box">

			<div class="bodyarea">

				<div class="pagetitle" style="padding-top: 150px;">
					<img src="/img/globein_teractive.png" width="1706">
					<div class="headline">
						Providing a wide range of educational resources for the multidisciplinary team involved in managing patients 
						<br>with haemoglobinopathies through our dedicated GlobeIN website. The GlobeIN website houses a multitude of 
						<br>resources on key topics of interest and practical elements of care
					</div>
				</div>

				<info-red-note style="margin-top: 50px;">Click below for an overview of the components and scan the QR code to explore the GlobeIN website</info-red-note>

				<div class="threeboxes">
					<div>
						<div class="title">WEBINARS</div>
						<div class="circle animate__animated animate__bounceIn"><img src="/img/bigicon_monitor.png"/></div>
						<global-button color="#fff" @click="onMoreClick(1)">Find out more</global-button>
					</div>
					<div>
						<div class="title">VIDEOS & PODCASTS</div>
						<div class="circle animate__animated animate__bounceIn"><img src="/img/bigicon_cast.png"/></div>
						<global-button color="#fff" @click="onMoreClick(2)">Find out more</global-button>
					</div>
					<div class="coming_soon">
						<div class="title">E-LEARNING</div>
						<div class="circle animate__animated animate__bounceIn"><img src="/img/bigicon_learn.png"/></div>
						<!-- <div>&nbsp;</div> -->
						<global-button color="#fff" @click="onMoreClick(3)">Find out more</global-button>
					</div>
				</div>

				
			</div>
			<bottom-menu @onBackClick="onMenuBackClick()" @onNextClick="onMenuNextClick()" />
		</div>


		<qr-code-tip>
			<img src="/img/codes/GlobeIN_iPad_QR_slide3_globeinteractive.png" alt="">
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
		onMenuBackClick() {
			this.$router.push({ name: "overview" });
		},
		onMenuNextClick() {
			this.$router.push({ name: "podcasts" });
		},
		onMoreClick(cid){
			let elText = '';
			switch (cid) {
				case 1:
					elText = 'Webinars / Find out more';
					break;
				case 2:
					elText = 'Videos & Podcasts / Find out more';
					break;
				case 3:
					elText = 'E-learning / Find out more';
					break;
			}

			this.$store.dispatch("saveActivity", {
				ec: 'Interactive page',
				ea: 'click',
				el: elText,
			});

			this.$store.dispatch('popup_item', {
				content_id: cid,
				// ga_category: 'hotspot',
			});
		},
		
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.interactive {
  // background-image: url('/img/temp3.jpg');
  // .content-box {
	// 	background-color: transparent;
	// }

	.headline {
		font-size: 50px !important;
		margin-top: 20px !important;
		line-height: 1.4 !important;
	}

	.threeboxes {
		margin: 100px 90px 0;
		height: 580px;
		display: flex;
		justify-content: space-between;
		gap: 40px;
		> div {
			flex: 1 0 0%;
			// margin: 0 25px;
			border-radius: 25px;
    	padding: 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			animation:fade-in-bottom .6s cubic-bezier(.39,.575,.565,1.000) both;
			
			&:nth-child(1){
				background-color: #d06578;
				animation-delay: .3s;
			}
			&:nth-child(2){
				background-color: #51267d;
				animation-delay: .6s;
			}
			&:nth-child(3){
				background-color: #08a9b799;
				animation-delay: .9s;
			}
		}
		.coming_soon {
			background-image: url("/img/coming_soon.png");
			background-repeat: no-repeat;
    	background-position: top right;
			background-size: 290px;
		}
		.title {
			font-family: 'SourceSansPro-Semibold';
			font-size: 57px;
			color: #fff;
			text-align: center;
		}
		.circle {
			width: 220px;
			height: 220px;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.2);
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				height: 170px;
			}
		}
		.glob-button {
			border-radius: 60px;
		}
	}

	
}
</style>

<template>
  <div class="homepage page-view">
		
		<img class="vertexlogowhite" src="/img/vertex_logo_white.png" alt="">

		<div class="centerlogo animate__animated animate__zoomIn">
			<svg class="ellipse" viewBox="0 0 1754.12 1434.19">
				<ellipse cx="877.06" cy="717.1" rx="928.88" ry="648.2" transform="translate(-231.78 484.84) rotate(-27.44)" style="fill: #ededed; isolation: isolate; opacity: .95;"/>
			</svg>

			<div class="titleimage">
				<div class="d-flex align-items-center">
					<span>GLOBE</span>
					<img src="/img/globe_twoleaves.svg" width="240" style="margin: 0 40px;" />
					<span class="text-aqua">IN</span>
				</div>
				<div class="subtext">
					PURSUING EDUCATIONAL EXCELLENCE IN HAEMOGLOBINOPATHIES
				</div>
			</div>
			<!-- <div class="subtitle">
				The Vertex Sickle Cell Disease and <br>Beta Thalassaemia Medical Education Programme 
			</div>
			<button class="btnStart btn btn-primary animate__animated animate__slower animate__infinite animate__pulse" @click="onStartClick()">TOUCH TO LEARN MORE</button> -->
		</div>

		<div class="menubuttons">
			<div class="animate__animated animate__fadeInRight" @click="onMenuClick(1)">
				<div>Overview of the GlobeIN <br>programme and its components</div>
				<img src="/img/menu_arrow_right.svg" />
			</div>
		
			<div class="animate__animated animate__fadeInRight" @click="onMenuClick(2)">
				<div>Videos and podcasts</div>
				<img src="/img/menu_arrow_right.svg" />
			</div>
		
			<div class="animate__animated animate__fadeInRight" @click="onMenuClick(3)">
				<div>Join the community</div>
				<img src="/img/menu_arrow_right.svg" />
			</div>

			<div class="animate__animated animate__fadeInRight" @click="onMenuClick(4)">
				<div>GlobeIN website</div>
				<img src="/img/menu_arrow_right.svg" />
			</div>

		</div>

		<button class="btnBack btn btn-outline-white animate__animated animate__bounceInLeft" @click="onBackClick()">Back</button>
		
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
	beforeDestroy(){
		this.$store.commit("set_showSegmentContent", -1);
	},
  mounted() {},
  methods: {
		onMenuClick(_menuid) {
			let pagename = '';
			let elText = '';
			switch (_menuid) {
				case 1:
					pagename = 'overview';
					elText = 'Overview';
					break;
				case 2:
					pagename = 'podcasts';
					elText = 'Videos and podcasts';
					break;
				case 3:
					pagename = 'community';
					elText = 'Join the community';
					break;
				case 4:
					pagename = 'website';
					elText = 'GlobeIN website';
					break;
					
			}

			this.$store.dispatch("saveActivity", {
				ec: 'Home page',
				ea: 'click',
				el: elText,
			});

			this.$router.push({ name: pagename });
		},
		onBackClick() {
			this.$store.dispatch("saveActivity", {
				ec: 'Home page',
				ea: 'click',
				el: 'Back',
			});
			this.$router.push({ name: 'attract' });
		},

  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.homepage {
  // background-image: url('/img/bg_homepage.jpg');
  // background-size: 100% 100%;

	* {
		transition: all 0.5s ease;
	}

	.vertexlogowhite{
		position: absolute;
		right: 230px;
    top: 1760px;
	}

	.centerlogo {
		position: absolute;
		width: 1754px;
		height: 1434px;
		left: 320px;
    top: 350px;
		
		.ellipse {
			position: absolute;
			z-index: -1;
		}

		.titleimage {
			position: absolute;
			left: 260px;
    	top: 560px;
			font-family: 'StolzlLight';
			font-size: 220px;
			line-height: 1.3;
			color: #51267d;
			text-align: center;
			.subtext {
				font-size: 38px;
				color: #1d1d1b;
			}
		}
	}
	
	.menubuttons {
		position: absolute;
		left: 2230px;
    top: 560px;
    width: 1210px;
		// border: #001177 1px solid;
		// font-size: 34px;
		// line-height: 1.2;
		> div {
			height: 190px;
			background-color: #51267d;
			margin-bottom: 90px;
			padding-right: 70px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			opacity: 0.9;
			border: 4px solid #fff;
			border-radius: 12px;
			color: white;
			font-family: 'SourceSansPro-Semibold';
			font-size: 60px;
			line-height: 65px;
			text-align: right;
			gap: 60px;
			//--animate-duration: 0.2s;
			img {
				width: 55px;
			}
			&:hover{
				padding-right: 50px;
			}
			&:nth-child(1) { animation-delay: 0.0s; } 
			&:nth-child(2) { animation-delay: 0.2s; } 
			&:nth-child(3) { animation-delay: 0.4s; } 
			&:nth-child(4) { animation-delay: 0.6s; } 
		}
		
	}

	.btnBack {
		position: absolute;
		left: 130px;
		top: 1930px;
		z-index: 1;
	}
  
}
</style>

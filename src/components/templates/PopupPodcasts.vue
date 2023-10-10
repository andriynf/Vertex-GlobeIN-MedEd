<template>
	<div class="popup-podcasts">

		<div class="popheader">
			<div class="iconstick">
				<img src="/img/bigicon_cast.png" width="353">
				<div>VIDEOS <br>& PODCASTS</div>
			</div>
			<div v-if="showPlayer==false" class="title">
				Video and podcast content hosted by leading international experts, focused on key topics of clinical interest in haemoglobinopathies. See below for available content:
			</div>
		</div>

		<div v-if="showPlayer==false" class="threeboxes">
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
				<div class="topimg"><img src="/img/podcast_b1.png"/></div>
				<div class="title">HOLISTIC CONSIDERATIONS <br>IN HAEMOGLOBINOPATHIES: <br>PSYCHOLOGICAL AND MENTAL HEALTH</div>
				<div class="botbut">
					<global-button color="#fff" @click="openVideoPage(2)">Click here to watch a teaser of Dr Rachel <br>Kesse-Adu and Dr Kofi Anie’s podcast</global-button>
				</div>
			</div>
		</div>

		<div class="playerBox" v-if="showPlayer">
			<div class="playmenu">
				
				<div 
					class="menuitem"
					v-for="(pItem, index) in main_data.podvideos" :key="`poditem_${index}_${pItem.id}`"
	        @click="openVideoPage(index)"
					:class="{'active':index== activePlayerItemID }"
				>
					<div class="label" v-html="pItem.button_label"></div>
					<div class="arrow">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.94 74.87">
							<polyline points="1.5 1.5 37.44 37.44 1.5 73.37" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 5px;"/>
						</svg>
					</div>
				</div>
				
			</div>
			<div class="playcontent">
				<div class="title animate__animated animate__fadeInRight" v-html="main_data.podvideos[activePlayerItemID].title"></div>
				<div class="videocontainer">
					<video 
						autoplay preload="metadata" playsinline
						disablePictureInPicture 
						controls
	      		controlsList="nofullscreen1 nodownload noremoteplayback noplaybackrate"
						:src="main_data.podvideos[activePlayerItemID].media_url" >
					</video>
				</div>
				<div class="infotext animate__animated animate__fadeIn" v-html="main_data.podvideos[activePlayerItemID].infotext"></div>

				<div class="bottomButtons">
					<global-button color1="#fff" icon_position="left" @click="onPrevVideoClick()">Back</global-button>
					<global-button color1="#fff" @click="onNextVideoClick()">Next</global-button>
				</div>
				<div class="headphones">
					<div style="width: 175px;">
						<div style="width: 99px; margin: auto;">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 99 84" style="enable-background:new 0 0 99 84;" xml:space="preserve">
							<path style="fill:#B2B2B2;" d="M99,74.1c-0.5,2.1-1.2,4-2.6,5.6c-1.9,2.1-4.1,3.4-7,3.5c-2.8,0.1-5.7,0-8.6,0c0-0.4,0-0.8,0-1.2
							c0-12.7,0-25.4,0-38.2c0-6.2-1.2-12.2-4.6-17.6c-4.5-7.4-10.9-12.3-19.3-14.3c-10.6-2.5-20-0.1-28.2,7.1
							c-5.1,4.5-8.4,10.2-9.7,16.8c-0.5,2.6-0.8,5.3-0.8,8c-0.1,12.7,0,25.4,0,38.2c0,0.4,0,0.8,0,1.1c-3.3,0-6.6,0.3-9.8-0.1
							c-4.7-0.6-8.3-4.9-8.3-9.6C0,66.1,0,58.8,0.1,51.5C0.2,47,2.5,43.7,6.7,42c0.5-0.2,0.7-0.5,0.7-1C7.8,29.8,12,20.1,19.9,12.3
							C29.7,2.7,41.6-1.4,55.2,0.4c13,1.8,22.9,8.5,30,19.5c4.1,6.4,6.2,13.5,6.5,21.1c0,0.3,0.3,0.8,0.6,0.9c3.7,1.5,5.9,4.3,6.6,8.3
							c0,0.1,0.1,0.2,0.1,0.4C99,58.4,99,66.2,99,74.1z"/>
							<path style="fill:#B2B2B2;" d="M21.7,62.6c0-5.6,0-11.1,0-16.7c0-1.9,1-3.3,2.7-3.7c2.1-0.6,4.2,0.8,4.5,3
							c0.1,0.4,0.1,0.8,0.1,1.3c0,10.8,0,21.7,0,32.5c0,1.8-0.5,3.3-2.3,4c-2.4,1-5-0.7-5-3.4C21.6,73.8,21.7,68.2,21.7,62.6z"/>
							<path style="fill:#B2B2B2;" d="M77.4,62.7c0,5.6,0,11.1,0,16.7c0,2.3-1.6,3.9-3.8,3.8c-1.7-0.1-3.1-1.4-3.4-3
							c-0.1-0.3-0.1-0.7-0.1-1.1c0-11,0-21.9,0-32.9c0-2,0.8-3.4,2.4-3.9c2.4-0.9,4.8,0.8,4.9,3.4c0.1,3.6,0,7.2,0,10.8
							C77.4,58.5,77.4,60.6,77.4,62.7z"/>
						</svg>
						</div>
					</div>
					<div>Headphones may be available for optimal viewing <br>of the video, please speak to a booth attendant</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    properties: {
      type: Object,
      default: function() {
        return { title: '', data: [] };
      },
    },
  },
  data() {
    return {
			showPlayer: false,
			
      video_src: "",
      videoElement: null,
      paused: null,
      innerTimer: null,
    };
  },
  computed: {
    ...mapState([
      "config",
      "ipc_renderer",
      "main_data",
			"activePlayerItemID",
    ])
  },
	watch: {
		activePlayerItemID(newValue, oldValue) {
			if (newValue == -1) {
				//close
				this.showPlayer = false;
			}else{
				this.showPlayer = true;
			}
		},
	},
  created() {
    // this.video_src = this.config.local_content + this.properties.media_url;
    this.$store.commit("set_video_is_playing", true);
		if(this.activePlayerItemID != -1){
			//force to show player
			this.showPlayer = true;
		}
  },
  mounted(){
    // const fs = require("fs");
    // if (fs.existsSync(this.video_src)) {
    // }else{
    //   this.$notify({
    //     type: 'error',
    //     title: this.properties.media_url
    //   });
    // }
  },
  beforeDestroy: function () {
    this.$store.commit("set_video_is_playing", false);
    clearTimeout(this.innerTimer);
  },
  methods: {
		openVideoPage(tabid){
			console.log('tabid=', tabid);

			this.$store.dispatch("saveActivity", {
				ec: 'Videos & Podcasts popup',
				ea: 'click',
				el: this.main_data.podvideos[tabid].title,
			});
			
			this.$store.dispatch("openPlayerBox", tabid);
		},
		onPrevVideoClick(){
			let n = this.activePlayerItemID - 1;
			if (n < 0) {
				n = this.main_data.podvideos.length - 1;
				//send ask to close popup
				// this.$parent.closeClick();
				this.$emit("onBackClick");
				return;
			}
			this.$store.dispatch("saveActivity", {
				ec: 'Videos & Podcasts Menu',
				ea: 'click',
				el: this.main_data.podvideos[n].title,
			});
			this.$store.dispatch("openPlayerBox", n);
		},
		onNextVideoClick() {
			let n = this.activePlayerItemID + 1;
			if (n >= this.main_data.podvideos.length){
				n = 0;
				//send ask to close popup
				// this.$parent.closeClick();
				this.$emit("onBackClick");
				return;
			}
			this.$store.dispatch("saveActivity", {
				ec: 'Videos & Podcasts Menu',
				ea: 'click',
				el: this.main_data.podvideos[n].title,
			});
			this.$store.dispatch("openPlayerBox", n);
		},
		
		////////////////////////
    updatePaused(event) {
      this.videoElement = event.target;
      this.paused = event.target.paused;
      if(this.paused){
        this.videoElement.play();
      }
    },
    playpause(event){
      this.videoElement = event.target;
      this.paused = ! event.target.paused;
      if (this.paused) {
        this.videoElement.pause();
      }else{
        this.videoElement.play();
      }
    },
    onVideoEnd(){
      // console.log('Finished.');
      clearTimeout(this.innerTimer);
      this.innerTimer = setTimeout(() => {
        this.$emit("onVideoEnd");
      }, 2 * 1000);

    }
  },
};
</script>

<style lang="scss">
.popup-podcasts {
	
	.popheader {
		.iconstick {
			background-color: #51267d;
		}
		.title {
			color: #51267d;
		}
	}

	.threeboxes {
		margin: 110px 90px 0;
		height: 1070px;
		display: flex;
		gap: 60px;
		
		> div {
			flex: 1 0 0%;
			border-radius: 25px;
			border: 1px solid #51267d;
			background-color:#51267d;// rgba(255, 255, 255, 1);
			display: flex;
			flex-direction: column;
			// align-items: center;
			padding-left: 70px;
			padding-top: 70px;
			justify-content: space-between;
			animation:fade-in-bottom .6s cubic-bezier(.39,.575,.565,1.000) both;
			// background-color: #08a9b799;
			
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
		// .topimg {
			// margin-top: 30px;
		// }
		.title {
			font-weight: bold;
			font-size: 52px;
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
				letter-spacing: -1px;
			}
		}
		
	}

	.playerBox {
		position: absolute;
		top: 0;
		width: 100%;
    height: 100%;;
		// background-color: rgba(208, 101, 120, 0.1);
		display: flex;

		.playmenu {
			margin-top: 560px;
			
			.menuitem {
				width: 1185px;
				height: 267px;
				margin-bottom: 40px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 50px;
				border: 5px solid #d06578;
				border-radius: 0 50px 50px 0;
				padding-right: 70px;
				background-color: transparent;
				// background-color: #51267d00;
				transition: all 0.3s ease;
				border-left: unset !important;
				
				.label {
					font-family: 'SourceSansPro-Semibold';
					font-size: 51px;
					line-height: 61px;
					// letter-spacing: -2px;
					color: #d06578;
					text-align: right;
					transition: all 0.3s ease;
				}
				.arrow {
					width: 44px;
					height: 88px;
					stroke: #d06578;
					transition: all 0.3s ease;
				}

				&.active {
					border: transparent;
					background-color: #51267d;
					.label,
					.arrow {
						color: #fff;
						stroke: #fff;
					}
				}
			}
		}

		.playcontent {
			position: relative;
			padding-left: 220px;
			font-family: 'SourceSansPro-Semibold';
			.title {
				font-size: 70px;
				line-height: 85px;
				color: #51267d;
				margin-top: 100px;
			}
			.videocontainer {
				width: 1582px;
				height: 886px;
				margin-top: 50px;
				border: 1px solid #000;
			}
			.infotext {
				font-size: 42px;
				line-height: 63px;
				margin-top: 50px;
			}

			.bottomButtons {
				position: absolute;
				bottom: 110px;
				display: flex;
				gap: 80px;
			}
			.headphones {
				position: absolute;
				bottom: 110px;
				left: 1050px;
				width: 980px;
				height: 153px;
				border: 4px solid #c6c6c6;
				border-radius: 25px;
				display: flex;
				align-items: center;
				font-family: 'SourceSansPro-Semibold';
				font-size: 36px;
				color: #9d9d9c;
			}
		}
	}

	/////////////////////////
	video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
}
</style>

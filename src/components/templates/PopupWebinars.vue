<template>
	<div class="popup-webinars">

		<div class="popheader">
			<div class="iconstick">
				<img src="/img/bigicon_monitor.png" width="260">
				<div>WEBINARS</div>
				<!-- <div>VIDEOS <br>& PODCASTS</div> -->
			</div>
			<div class="title">
				60-minute interactive educational webinars with expert faculty, including interactive peer-to-peer scientific exchange and Q&A. The GlobeINteractive webinar series is <span class="accent">accredited by the CPD Certification Service</span>. All webinars are recorded and made available on-demand via the GlobeIN website.
			</div>
		</div>

		<div class="speakers">
			<div class="title">AVAILABLE ON-DEMAND WEBINARS</div>

			<div class="row panel-container">
				<div class="boxcol">
					<img src="/img/webinar_b1.png"/>
					<div class="panel_title">SPOTLIGHT ON SICKLE CELL DISEASE: PATHOLOGY AND CLINICAL COMPLICATIONS</div>
				</div>
				<div class="boxcol">
					<img src="/img/webinar_b2.png"/>
					<div class="panel_title">TALKING β-THALASSAEMIA: PATHOLOGY AND CLINICAL COMPLICATIONS</div>
				</div>
				<div class="boxcol">
					<img src="/img/webinar_b3.png"/>
					<div class="panel_title">SPOTLIGHT ON SICKLE CELL DISEASE: UNDERSTANDING THE THERAPEUTIC LANDSCAPE</div>
				</div>
				<div class="boxcol">
					<img src="/img/webinar_b4.png"/>
					<div class="panel_title">TALKING β-THALASSAEMIA: UNDERSTANDING <br>THE THERAPEUTIC LANDSCAPE</div>
				</div>
			</div>

		</div>

		<div class="upcomming">
			<img src="/img/icon_clock.svg" class="roll-in-right" width="240" alt="">
			<div class="title">The GlobeINteractive webinar series, videos, and podcasts are available in several different languages</div>
			<info-red-note>Please contact a Vertex medical <br>representative to find out more about <br>the programme and events</info-red-note>
			<div class="qrcode"><img src="/img/qr_webinar.png" alt="">Scan the QR code <br>to access the <br>on-demand webinars</div>
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
    ])
  },
  created() {
    // this.video_src = this.config.local_content + this.properties.media_url;
    this.$store.commit("set_video_is_playing", true);
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
		closeMe() {
			this.$emit("onBackClick");
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
.popup-webinars {
	
	.speakers {
		position: absolute;
		top: 550px;
    left: 80px;
		width: 2435px;
		height: 1148px;
		// background-color: rgba(255, 255, 255, 1.0);
		background-color: #fff;
		border: 3px solid #d06578;
		border-radius: 25px;
		.title {
			font-family: 'SourceSansPro-Semibold';
			font-size: 60px;
			color: #d06578;
			text-align: center;
    	margin-top: 45px;
		}
		.panel-container {
			margin: 40px 60px 0;
			justify-content: space-between;
			.boxcol {
				width: 1125px;
				height: 395px;
				padding: 0;
				background-color: #d06578;
				color: #fff;
				border-radius: 20px;
				margin-bottom: 60px;
				padding-top: 40px;
				display: flex;
				align-items: flex-start;
				img {
					margin-left: 40px;
					margin-right: 40px;
				}

				animation:fade-in-bottom .6s cubic-bezier(.39,.575,.565,1.000) both;
				@for $i from 1 through 6 {
					&:nth-child( #{$i} ) {
						// background-color: lighten($base-color, $i * 5%);
						animation-delay: 0.2 + $i * 0.2s;
					}
				}
			}

		}

		.panel_title {
			font-family: "Arial";
			font-size: 38px;
			font-weight: bold;
			// line-height: 40px;
			color: #fff;
			// text-align: center;
		}
		
	
	}

	.upcomming {
		position: absolute;
		top: 550px;
    left: 2600px;
		width: 657px;
		height: 1148px;
		background-color: #d06578;
		border-radius: 25px;
		text-align: center;
		padding-top: 40px;
		// opacity: 0.5;
		overflow: hidden;
		.title {
			font-family: 'SourceSansPro-Semibold';
			font-size: 45px;
			line-height: 60px;
			margin-top: 35px;
			color: #fff;
    	padding: 0 60px;
		}
		.info-red-note {
			animation-name: unset;
			margin-top: 70px;
			font-size: 31px;
			line-height: 40px;
			fill: #fff;
			.info-content {
				background-color: rgba(255, 255, 255, 0.9);
				padding: 20px 50px;
			}
			.info-icon {
				top: -45px;
				bottom: unset;
				left: 0;
				right: 0;
				border-color: #d06578;
			}
		}
		.qrcode {
			font-family: 'SourceSansPro-Semibold';
			font-size: 40px;
			line-height: 50px;
			letter-spacing: -1px;
			text-align: left;
			margin-top: 70px;
			margin-left: 40px;
			display: flex;
			align-items: center;
			gap: 20px;
			color: #fff;
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

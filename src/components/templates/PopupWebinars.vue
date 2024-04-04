<template>
	<div class="popup-webinars">

		<div class="popheader">
			<div class="iconstick">
				<img src="/img/bigicon_monitor.png" width="200">
				<div>WEBINARS</div>
				<!-- <div>VIDEOS <br>& PODCASTS</div> -->
			</div>
			<div class="title">
				60-minute interactive educational webinars with expert faculty, including interactive peer-to-peer scientific exchange and Q&A. The GlobeINteractive webinar series is <span class="accent">accredited by the CPD Certification Service</span>. All webinars <br>are recorded and made available on-demand via the GlobeIN website in English, French, German and Italian.
			</div>
		</div>

		<div class="speakers">
			<div class="title">AVAILABLE ON-DEMAND WEBINARS</div>

			<div class="row panel-container">
				<div class="boxcol" style="background-color: #08a9b7;">
					<img src="/img/webinar_b1.png"/>
					<div class="panel_title">SPOTLIGHT ON SICKLE CELL DISEASE: PATHOLOGY AND CLINICAL COMPLICATIONS</div>
				</div>
				<div class="boxcol">
					<img src="/img/webinar_b2.png"/>
					<div class="panel_title">TALKING <br>β-THALASSAEMIA: PATHOLOGY AND CLINICAL COMPLICATIONS</div>
				</div>
				<div class="boxcol" style="background-color: #51267d;">
					<img src="/img/webinar_b3.png"/>
					<div class="panel_title">HOT TOPICS IN HAEMOGLOBINOPATHIES: THE TRANSPLANT JOURNEY <br><br>PART 1: <br>PRE-TRANSPLANTATION</div>
				</div>
				<div class="boxcol" style="background-color: #08a9b7;">
					<img src="/img/webinar_b4.png"/>
					<div class="panel_title">SPOTLIGHT ON SICKLE CELL DISEASE: UNDERSTANDING THE THERAPEUTIC LANDSCAPE</div>
				</div>
				<div class="boxcol">
					<img src="/img/webinar_b5.png"/>
					<div class="panel_title">TALKING <br>β-THALASSAEMIA: UNDERSTANDING <br>THE THERAPEUTIC LANDSCAPE</div>
				</div>
				<div class="boxcol" style="background-color: #51267d;">
					<img src="/img/webinar_b6.png"/>
					<div class="panel_title">HOT TOPICS IN HAEMOGLOBINOPATHIES: THE TRANSPLANT JOURNEY <br><br>PART 2: <br>POST-TRANSPLANTATION</div>
				</div>

				<div class="boxcol50">
					<div>Scan the QR code to access the on-demand webinars</div>
					<img src="/img/codes/GlobeIN_iPad_QR_slide4_webinars.png" width="180" style="margin-left: 40px;" >
				</div>
				<div class="boxcol50">
					<info-red-note>Please contact a Vertex medical representative to find out <br>more about the programme and events</info-red-note>
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
		top: 420px;
    left: 65px;
		width: 2425px;
		height: 1175px;
		background-color: #fff;
		// background-color: rgba(255, 255, 255, 0.5);
		border: 3px solid #d06578;
		border-radius: 35px;
		.title {
			font-family: 'SourceSansPro-Semibold';
			font-size: 46px;
			color: #d06578;
			text-align: center;
    	margin-top: 35px;
		}
		.panel-container {
			margin: 35px 50px 0;
			justify-content: space-between;
			.boxcol {
				width: 750px;
				height: 350px;
				padding: 0;
				background-color: #d06578;
				color: #fff;
				border-radius: 10px;
				margin-bottom: 25px;
				padding-top: 40px;
				display: flex;
				align-items: flex-start;
				img {
					width: 332px;
					margin-left: 45px;
					margin-right: 20px;
				}

				animation:fade-in-bottom .6s cubic-bezier(.39,.575,.565,1.000) both;
				@for $i from 1 through 6 {
					&:nth-child( #{$i} ) {
						// background-color: lighten($base-color, $i * 5%);
						animation-delay: 0.2 + $i * 0.2s;
					}
				}
			}

			.boxcol50 {
				width: 1141px;
				height: 240px;
				background-color: #dadada;
				border-radius: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0;
				font-size: 30px;
				font-family: 'SourceSansPro-Semibold';

				.info-red-note {
					animation-name: unset;
					margin-top: 35px;
					font-size: 24px !important;
					line-height: 31px;
					fill: #fff;
					color: unset;

					.info-content {
						background-color: rgba(255, 255, 255, 0.9);
						padding: 20px 50px;
						text-align: center;
						border-color: transparent;
					}
					.info-icon {
						top: -45px;
						bottom: unset;
						left: 0;
						right: 0;
						border-color: #dadada;
					}
				}
				
			}

		}

		.panel_title {
			font-family: "Arial";
			font-size: 25px;
			font-weight: bold;
			line-height: 33px;
			color: #fff;
			padding-right: 30px;
			// text-align: center;
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

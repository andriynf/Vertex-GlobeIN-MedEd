<template>
	<div class="popup-learning">

		<div class="popheader">
			<div class="iconstick">
				<img src="/img/bigicon_learn.png" width="306">
				<div>E-LEARNING</div>
				<img class="commingsoon" src="/img/coming_soon_sm.png" alt="">
				<!-- <div>VIDEOS <br>& PODCASTS</div> -->
			</div>
			<div class="title">
				A range of educational resources for healthcare professionals involved in <br>managing patients with haemoglobinopathies, covering key topics of interest <br>and practical elements of patient care
				<div class="clockbox">
					<img src="/img/icon_clock.svg" width="86" />
					Stay tuned for the upcoming resources
				</div>
			</div>
		</div>

		<div class="threeboxes">
			<div>
				<div class="circle animate__animated animate__bounceIn"><img src="/img/bigicon_module.png"/></div>
				<div class="title">E-LEARNING <br>MODULES</div>
				<div>Bite-size modules to enhance knowledge and <br>understanding of the fundamental topics in <br>sickle cell disease and β-thalassaemia</div>
			</div>
			<div>
				<div class="circle animate__animated animate__bounceIn"><img src="/img/bigicon_studies.png"/></div>
				<div class="title">INTERACTIVE PATIENT <br>CASE STUDIES</div>
				<div>Interactive patient cases demonstrating a range <br>of clinical complications experienced by <br>paediatric and adult patients with sickle cell <br>disease and β-thalassaemia</div>
			</div>
			<div>
				<div class="circle animate__animated animate__bounceIn"><img src="/img/bigicon_resources.png"/></div>
				<div class="title">ADDITIONAL <br>RESOURCES</div>
				<div>Further resources to support your <br>educational learning needs in sickle cell <br>disease and β-thalassaemia</div>
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
.popup-learning {
	
	.popheader {
		
		.clockbox {
			background-color: #08a9b7;
			color: #fff;
			border-radius: 25px;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			width: 1000px;
			height: 158px;
			margin-top: 20px;
		}
		
		.iconstick {
			position: relative;
			background-color: #08a9b7;
			.commingsoon {
				position: absolute;
				top: 0;
				right: 0;
			}
		}
		.title {
			color: #51267d;
		}
	}

	.threeboxes {
		margin: 110px 50px 0;
		height: 1070px;
		display: flex;
		justify-content: space-between;
		font-size: 40px;
		line-height: 54px;
		color: #fff;
		text-align: center;

		> div {
			flex: 1 0 0%;
			margin: 0px 25px;
			padding: 120px 25px;
			border-radius: 25px;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #08a9b7;
			animation:fade-in-bottom .6s cubic-bezier(.39,.575,.565,1.000) both;
			// justify-content: space-around;
			
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
		.circle {
			width: 305px;
			height: 305px;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.2);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.title {
			font-family: 'SourceSansPro-Semibold';
			font-size: 80px;
			line-height: 75px;
			margin-top: 50px;
			margin-bottom: 55px;
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

<template>
	<div class="popup-learning">

		<div class="popheader">
			<div class="iconstick">
				<img src="/img/bigicon_learn.png" width="235">
				<div>E-LEARNING</div>
				<img class="commingsoon" src="/img/coming_soon_sm.png" alt="">
				<!-- <div>VIDEOS <br>& PODCASTS</div> -->
			</div>
			<div class="title">
				A range of educational resources for healthcare professionals involved <br>in managing patients with haemoglobinopathies, covering key topics <br>of interest and practical elements of patient care
				
				<div class="infoTop">
					<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.58 52.58">
						<g id="Layer_1-2" data-name="Layer 1">
							<path d="m26.29,0C11.79,0,0,11.79,0,26.29s11.79,26.29,26.29,26.29,26.29-11.79,26.29-26.29S40.78,0,26.29,0Zm.73,7.81c3.2,0,5.81,2.61,5.81,5.81s-2.61,5.81-5.81,5.81-5.81-2.61-5.81-5.81,2.61-5.81,5.81-5.81Zm7.95,34.78c-.46.49-.95.59-1.28.59h-13.34c-.33,0-.83-.1-1.28-.59-.35-.38-.53-.88-.53-1.47s.17-1.12.52-1.51c.46-.52.96-.63,1.3-.63h1.52v-11.12h-1.52c-.33,0-.83-.1-1.28-.59-.35-.38-.53-.88-.53-1.48s.17-1.11.52-1.51c.46-.52.96-.63,1.3-.63h11.18c.36,0,.65.29.65.65v14.68h1.51c.34,0,.84.11,1.3.63.35.39.52.9.52,1.51s-.18,1.09-.54,1.47Z" style="fill: #08a9b7;"/>
						</g>
					</svg>
					Please contact a Vertex medical representative to find out more about the programme and events
				</div>

			</div>
		</div>

		<div class="threeboxes">
			<div>
				<div class="circle"><img src="/img/bigicon_module.png" width="250"/></div>
				<div class="title">E-LEARNING <br>MODULES</div>
				<div>Bite-size modules to enhance <br>knowledge and understanding of the <br>fundamental topics in sickle cell <br>disease and β-thalassaemia</div>
			</div>
			<div>
				<div class="circle"><img src="/img/bigicon_studies.png" width="240"/></div>
				<div class="title">INTERACTIVE PATIENT <br>CASE STUDIES</div>
				<div>Interactive patient cases studies <br>demonstrating a range of clinical <br>complications experienced by <br>paediatric and adult patients with <br>sickle cell disease</div>
			</div>
			<div>
				<div class="circle"><img src="/img/bigicon_resources.png" width="217"/></div>
				<div class="title">ADDITIONAL <br>RESOURCES</div>
				<div>Further resources to support your <br>educational learning needs in sickle <br>cell disease and β-thalassaemia</div>
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
		.infoTop {
			display: inline-flex;
			align-items: center;
			justify-content: flex-start;
			background-color: #08a9b7;
    	color: #fff;
			font-family: "SourceSansPro-Semibold";
			font-size: 25px;
			padding: 20px 40px;
			border-radius: 15px;
			margin-top: 15px;
			svg {
				margin-left: -80px;
    		margin-right: 20px;
				width: 60px;
				height: 60px;
				border: 6px solid #fff;
				border-radius: 50%;
			}
		}
		
		.iconstick {
			position: relative;
			background-color: #08a9b7;
			.commingsoon {
				position: absolute;
				top: 0;
				right: 0;
				width: 250px;
			}
		}
		.title {
			color: #51267d;
		}
	}

	.threeboxes {
		margin: 150px 60px 0;
		height: 980px;
		display: flex;
		// justify-content: space-between;
		font-size: 37px;
		line-height: 47px;
		color: #fff;
		text-align: center;
		gap: 40px;

		> div {
			flex: 1 0 0%;
			padding: 100px 30px;
			border-radius: 70px;
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
			width: 280px;
			height: 280px;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.2);
			flex: 0 0 auto;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.title {
			font-family: 'SourceSansPro-Semibold';
			font-size: 67px;
			line-height: 1;
			margin-top: 70px;
			margin-bottom: 45px;
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

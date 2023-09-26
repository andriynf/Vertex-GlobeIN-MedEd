<template>
	<div class="banner-booth" :class="{'show': showMe}" click="hideThisPopup()">
		<svg class="iconchat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220.81 186.75">
			<path d="m197.99,147.29c-.86,0-1.71-.33-2.35-.96l-33.32-32.57h-10.56c-1.86,0-3.36-1.5-3.36-3.36s1.5-3.36,3.36-3.36h11.93c.88,0,1.72.34,2.35.96l28.59,27.95v-29.5c0-1.66,1.21-3.06,2.84-3.32,11.18-1.75,16.62-8.57,16.62-20.85V23.09c0-11.63-4.82-16.37-16.63-16.37h-82.72c-10.17,0-25.31,4.36-25.31,16.37v59.19c0,11.57,13.48,24.77,25.31,24.77h19.99c1.86,0,3.36,1.5,3.36,3.36s-1.5,3.36-3.36,3.36h-19.99c-15.57,0-32.03-16.19-32.03-31.49V23.09C82.72,7.23,99.32,0,114.75,0h82.72c15.49,0,23.35,7.77,23.35,23.09v59.19c0,14.65-6.71,23.9-19.46,26.93v34.73c0,1.35-.81,2.57-2.06,3.1-.42.18-.86.26-1.3.26Z" style="fill: #fff;"/>
			<path d="m22.82,186.75c-.47,0-.93-.1-1.37-.29-1.21-.54-1.99-1.74-1.99-3.07v-34.73c-12.75-3.03-19.46-12.28-19.46-26.93v-59.19c0-14.35,10.66-23.62,27.16-23.62h41.88c1.86,0,3.36,1.5,3.36,3.36s-1.5,3.36-3.36,3.36H27.16c-4.79,0-20.44,1.22-20.44,16.9v59.19c0,12.27,5.44,19.09,16.62,20.85,1.64.26,2.84,1.66,2.84,3.32v29.98l32.52-29.06c.61-.55,1.41-.85,2.24-.85h48.94c11.05,0,21.49-11.78,21.49-24.24v-11.33c0-1.86,1.5-3.36,3.36-3.36s3.36,1.5,3.36,3.36v11.33c0,16.2-13.45,30.96-28.21,30.96h-47.66l-37.16,33.2c-.63.56-1.43.85-2.24.85Z" style="fill: #fff;"/>
		</svg>
		<div>
			For more information on the GlobeIN website and how to register, 
			<br>please speak to a booth representative 
		</div>
		<svg class="iconchat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220.81 186.75">
			<path d="m197.99,147.29c-.86,0-1.71-.33-2.35-.96l-33.32-32.57h-10.56c-1.86,0-3.36-1.5-3.36-3.36s1.5-3.36,3.36-3.36h11.93c.88,0,1.72.34,2.35.96l28.59,27.95v-29.5c0-1.66,1.21-3.06,2.84-3.32,11.18-1.75,16.62-8.57,16.62-20.85V23.09c0-11.63-4.82-16.37-16.63-16.37h-82.72c-10.17,0-25.31,4.36-25.31,16.37v59.19c0,11.57,13.48,24.77,25.31,24.77h19.99c1.86,0,3.36,1.5,3.36,3.36s-1.5,3.36-3.36,3.36h-19.99c-15.57,0-32.03-16.19-32.03-31.49V23.09C82.72,7.23,99.32,0,114.75,0h82.72c15.49,0,23.35,7.77,23.35,23.09v59.19c0,14.65-6.71,23.9-19.46,26.93v34.73c0,1.35-.81,2.57-2.06,3.1-.42.18-.86.26-1.3.26Z" style="fill: #fff;"/>
			<path d="m22.82,186.75c-.47,0-.93-.1-1.37-.29-1.21-.54-1.99-1.74-1.99-3.07v-34.73c-12.75-3.03-19.46-12.28-19.46-26.93v-59.19c0-14.35,10.66-23.62,27.16-23.62h41.88c1.86,0,3.36,1.5,3.36,3.36s-1.5,3.36-3.36,3.36H27.16c-4.79,0-20.44,1.22-20.44,16.9v59.19c0,12.27,5.44,19.09,16.62,20.85,1.64.26,2.84,1.66,2.84,3.32v29.98l32.52-29.06c.61-.55,1.41-.85,2.24-.85h48.94c11.05,0,21.49-11.78,21.49-24.24v-11.33c0-1.86,1.5-3.36,3.36-3.36s3.36,1.5,3.36,3.36v11.33c0,16.2-13.45,30.96-28.21,30.96h-47.66l-37.16,33.2c-.63.56-1.43.85-2.24.85Z" style="fill: #fff;"/>
		</svg>
		
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    // VideoViewer,
  },
  data() {
    return {
      noActivityTimer: null,
      autoCloseTimer: null,
      
			showMe: false,
    };
  },
  computed: {
    ...mapState([
      "config",
      "is_electron",
      "ipc_renderer",
      "main_data",
      "video_is_playing"
    ]),
    
  },
  watch: {
  },
  mounted() {
		setTimeout(() => {
			
			this.resetNoActivity();

		}, 5000);
    window.addEventListener('click', this.resetNoActivity);
		window.addEventListener('touchstart', this.resetNoActivity);
  },
  beforeDestroy: function () {
    // window.removeEventListener('click', this.resetNoActivity);
    // window.removeEventListener('touchstart', this.resetNoActivity);
    // clearTimeout(this.noActivityTimer);
    // clearTimeout(this.autoCloseTimer);
  },
  methods: {
    resetNoActivity() {
			// console.log('resetNoActivity');
			console.log("BannerBooth / Router.name =", this.$router.currentRoute.value.name);
			
			//hide popup if it on screen
			this.showMe = false;
			clearTimeout(this.autoCloseTimer);

			if (this.config.banner_showtime > 0) {

				clearTimeout(this.noActivityTimer);
				this.noActivityTimer = setTimeout(() => {
					
					var isCorrectPage = false;
					switch (this.$router.currentRoute.value.name) {
						case 'website':
						// case 'homepage':
							isCorrectPage = true;
							break;
					}

					if (isCorrectPage) {
						clearTimeout(this.noActivityTimer);
						this.showThisPopup();
					} else {
						//wait
						this.resetNoActivity();
					}

				}, this.config.banner_showtime * 1000);

			}

    },
    
    showThisPopup(){
      console.log("AutoClose in (sec)", this.config.banner_closetime);

			this.showMe = true;

      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = setTimeout(() => {
        // console.log("autoclose timeout");
        // window.dispatchEvent(new Event('click'));
        this.hideThisPopup();
        this.$router.push({ name: 'attract' }).catch(err => { });

      }, this.config.banner_closetime * 1000);
    },
    hideThisPopup(){
			this.resetNoActivity();
      clearTimeout(this.autoCloseTimer);
      // clearTimeout(this.noActivityTimer);
      this.showMe = false;
    },
    

  },
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';
.banner-booth {
  background-color: #51267df2;
	position: absolute;
	left: 0;
	bottom: -300px;
	width: 100%;
	height: 256px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 60px;
	font-family: 'SourceSansPro-Semibold';
	font-size: 66px;
	line-height: 75px;
	color: #fff;
	text-align: center;
	transition: all 1.0s ease;
	box-shadow: rgba(0, 0, 0, 0.3) 15px 15px 10px;

	.iconchat {
		width: 220px;
		height: 186px;
		opacity: 0.5;
	}
  
	&.show {
		bottom: 400px;
	}
}
</style>

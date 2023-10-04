<template>
  <div id="app"
    :class="{'debug': is_development}"
    :style="[scaleStyle]"
  >

		<router-view v-slot="{ Component }">
			<transition 
				enter-active-class="animate__animated animate__faster animate__fadeIn"
	      leave-active-class="animate__animated animate__faster animate__fadeOut"
	      appear
	      mode="out-in"
			>
				<component :is="Component" />
			</transition>
		</router-view>


    <segment-player-box v-if="showSegmentContent >= 0" />
    <the-popup />
	  
		<banner-booth />

  </div>
</template>

<script>
import { mapState } from "vuex";
import { TweenMax, Draggable } from "gsap/all";
// @ is an alias to /src
import SegmentPlayerBox from "./components/SegmentPlayerBox.vue";
// import ThePopup from "./components/ThePopup.vue";
// import BannerBooth from "./components/BannerBooth.vue";

export default {
  components: {
    SegmentPlayerBox,
		// ThePopup,
		// BannerBooth
	},
  data() {
    return {
      fastclickTimer: 1,
			fastclickCounter: 0,
      screensaverTimer: null,
      noActivityTimer: null,

      scaleStyle: {},
      is_app_ready: false
    };
  },
  computed: {
    ...mapState([
      "config",
      "is_development",
      "ipc_renderer",
      "showSegmentContent",
      "video_is_playing",
			"userid"
    ]),
    
  },
  watch: {
    $route(to, from) {
      switch (from.name) {
        case "loading":
          this.is_app_ready = true;
          break;
      }
      switch (to.name) {
        case "home":
          break;
      }
    },
    config(newValue, oldValue) {
      // config updated
      // console.log("config", newValue);
      if(newValue){
        this.handleResize();
        this.$nextTick(()=>{
        });
      }
    },
  },
  created() {
    // if (this.$router.currentRoute.value.name != "loading") {
    //   this.$router.push({ name: "loading" });
    // }
    this.$router.replace({
      name: 'loading',
      query: { q: 'test', t: new Date().getTime() },
    });

  },
  mounted() {
		this.handleResize();
		window.addEventListener("resize", this.handleResize);

    window.addEventListener('click', (e) => {
			if(e.x < 150 && e.y < 150){
				
				this.fastclickCounter++;
				// console.log("this.fastclickCounter="+this.fastclickCounter);

				if(this.fastclickCounter == 3){
					console.log('reset');
					// this.$router.push({ name: 'login' }).catch(err => {});
          this.resetApp()
				}else
				if(this.fastclickCounter == 5){
					console.log('quit');
					this.ipc_renderer.send('close-me');
				}

				clearTimeout(this.fastclickTimer);
				this.fastclickTimer = setTimeout(() => {
					this.fastclickCounter = 0;
				}, 1000);
				
			}
		});
    window.addEventListener('click', this.resetNoActivity);
		window.addEventListener('touchstart', this.resetNoActivity);
    
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener('click', this.resetNoActivity);
		window.removeEventListener('touchstart', this.resetNoActivity);
    clearTimeout(this.noActivityTimer);
    clearTimeout(this.screensaverTimer);
  },
  methods: {
    handleResize() {
      if (this.config) {
        var screen_width = document.documentElement.clientWidth,
          screen_height = document.documentElement.clientHeight,
          app_width = this.config.width,
          app_height = this.config.height;

        let scale_valueX = 1;
				let scale_valueY = 1;
        if (app_width > screen_width || app_height > screen_height) {
          // fit to screen
          if (screen_width / screen_height > app_width / app_height) {
            scale_valueX = screen_height / app_height;
          } else {
            scale_valueX = screen_width / app_width;
          }
        }

				scale_valueY = scale_valueX;
				// scale_valueX = screen_width / app_width;
				// scale_valueY = screen_height / app_height;

        // console.log(screen_width, screen_height);
        // console.log(app_width, app_height);
        // this.$store.commit("set_scaleValue", scale_valueX);
				let leftPos = Math.floor((screen_width - app_width * scale_valueX) / 2);
				let topPos = Math.floor((screen_height - app_height*scale_valueY) / 2);

        this.scaleStyle = {
          transform: `scale(${scale_valueX}, ${scale_valueY})`,
          // left: Math.floor((screen_width - app_width) / 2) + "px",
          // top: Math.floor((screen_height - app_height) / 2) + "px",
					left: `${leftPos}px`,
					top: `${topPos}px`, 
          width: `${app_width}px`,
          height: `${app_height}px`,
					position: 'relative',
        };

        this.resetNoActivity();
      }
    },
    resetNoActivity() {
      // console.log("resetNoActivity", this.$router.currentRoute.name);
      clearTimeout(this.screensaverTimer);
      this.screensaverTimer = setTimeout(() => {
        if (this.$router.currentRoute.value.name == "attract") {
          if (this.video_is_playing == false) {
            // this.$store.commit("set_showSegmentContent", true);
          }
        }
      }, this.config.screensaver_time * 1000);
      //

      clearTimeout(this.noActivityTimer);
      this.noActivityTimer = setTimeout(() => {
        // console.log("APP.VUE timeout");
        // if (this.$router.currentRoute.value.name != "attract") {
          this.resetApp();
        // }
      }, this.config.back_inactivity_time * 1000);
    },
    resetApp() {
      /**
       * we call this function from other view pages. Need to check route name to prevent errors
       * attract -- dont need timeout, it is first page
       */
      if (this.$router.currentRoute.value.name != "attract" && this.$router.currentRoute.value.name != "website") {
        console.log("resetApp()");
        this.$router.push({ name: "attract" }).catch(err => { });
      }
    },
    
  }
};
</script>

<style lang="scss">
@import './assets/scss/vue-app';
// @import "../node_modules/bootstrap/scss/bootstrap.scss";

</style>

<template>
  <div id="videocontainer">
    <!-- <h1 class="bg-white">screensaver</h1> -->
    <video
      controls123 autoplay preload="metadata" playsinline
      ref="vidbigscreen"
      disablePictureInPicture  controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
      @click="playpause()"
      @timeupdate="onTimeUpdate()"
      @ended="loadNextVideo()"
      :src="video_src"
    >
    </video>

    <the-navigation @onBackClick="closeMe" />

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "video-player-box",
  components: {},
  data() {
    return {
      random_id: null,
      video_src: "",
    };
  },
  computed: {
    ...mapState([
      "config",
      "ipc_renderer",
      "main_data",
    ]),
  },
  mounted() {
    this.loadNextVideo();
  },
  beforeDestroy: function() {
    this.$refs.vidbigscreen.pause();
  },
  methods: {
    loadNextVideo(){
      this.random_id = this.getRandomInt(0, this.main_data.content.length - 1);
      this.video_src = this.config.local_content + this.main_data.content[this.random_id].properties.media_url;
      console.log(this.random_id, this.video_src);
    },
    closeMe() {
      this.$store.commit("set_showScreenSaver", false);
    },
    
    playpause() {
      // this.loadNextVideo();
      // if (this.$refs.vidbigscreen.paused) {
      //   this.$refs.vidbigscreen.play();
      // } else {
      //   this.$refs.vidbigscreen.pause();
      // }
    },
    
    
    onTimeUpdate() {
      if (this.$refs.vidbigscreen) {
        let curTime = this.$refs.vidbigscreen.currentTime;
        let vidDuration = this.$refs.vidbigscreen.duration;
        console.log(curTime, vidDuration);
      }
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>

<style lang="scss">
#videocontainer {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: black;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>


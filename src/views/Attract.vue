<template>
  <div class="attract page-view" @click="welcomeClick()">

		<video 
			autoplay preload1="metadata" loop muted playsinline
			disablePictureInPicture 
			controls123
			controlsList="nofullscreen1 nodownload noremoteplayback noplaybackrate"
			:src="'/media/176201952 Vertex Heme GlobeIN animation for congress Vertex - UK_edit_v3_1.mp4'"
			>
		</video>

  </div>
</template>

<script>
//src="'https://bhoward3.com/electron/GlobeIN/media/176201365_vertex_heme_eha_animation_v2 (2160p).mp4'"
import { mapState } from "vuex";

export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      "config",
      "is_electron",
      "ipc_renderer",
      "main_data"
    ]),
  },
  mounted() {},
	beforeDestroy(){},
  methods: {
		welcomeClick() {
			this.$store.commit("set_userid", "user-" + new Date().getTime());

			this.$store.dispatch("saveActivity", {
				ec: 'Attract page',
				ea: 'click',
				el: 'Touch to learn more',
			});

			
			this.$router.push({ name: 'homepage' });
		},


  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.attract {
	video {
		width: 100%;
		height: 100%;
	}
}
</style>

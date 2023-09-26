<template>
	<div class="popup-showvideo container-fluid">

    <component
      :is="current_viewer"
      :properties="viewer_properties"
      :key="`${viewer_properties.media_url}`"
    ></component>
    
    <!-- <h1 class="popuptitle">{{ properties.title }}</h1>

		<div class="row">
			<div v-if="current_viewer" class="col viewer-container">
				<transition
					enter-active-class="animate__animated animate__faster animate__fadeIn"
					leave-active-class="animate__animated animate__faster animate__fadeOut"
					appear
					mode="out-in"
				>
					<component
						:is="current_viewer"
						:properties="viewer_properties"
						:key="`${viewer_properties.url}`"
					></component>
				</transition>
			</div>
      <div v-else class="col">
        no viewer
      </div>
		</div> -->

	</div>
</template>

<script>
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
      current_viewer: null,
      viewer_properties: null,
      
    };
  },
  created() {
    // console.log("this.properties = ", this.properties);

    this.$store.dispatch('store_ga_event', this.properties.ga);
    // this.$store.dispatch('store_ga_event', {
    //   category: `popup ${this.properties.title}`,
    //   action: `clicked ${this.properties.type}`,
    //   label: `${this.properties.url}`,
    // });

    switch (this.properties.type) {
      case 'pdf':
        this.current_viewer = 'pdf-reader';
        this.viewer_properties = { ...this.properties };
        break;
      case 'vimeo_single':
      case 'vimeo_showcase':
      case 'youtube':
        this.current_viewer = 'video-viewer';
        this.viewer_properties = { ...this.properties };
        break;
      default:
        this.current_viewer = null;
        this.viewer_properties = null;
        break;
    }
    
  },
  methods: {
    clickedItem() {
      
    }
    
  },
};
</script>

<style lang="scss">
.popup-showvideo {
  padding: 60px;
  width: 2130px;
  height: 1250px;
}
</style>

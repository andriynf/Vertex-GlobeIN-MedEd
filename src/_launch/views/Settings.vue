<template>
  <div class="settings">
    <div class="container py-3">

      <div class="row my-3">
        <div class="col">
          <h5>Settings</h5>
        </div>
        <div class="col-auto">
          <small>
            app version: <span class="badge bg-secondary">{{ app_version }}</span>
          </small>
        </div>
      </div>


      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text">Update url</span>
        <input type="text" class="form-control" v-model="url_update">
      </div>

			<!-- <div class="input-group input-group-sm mb-3">
				<span class="input-group-text">API url</span>
				<input type="text" class="form-control" v-model="url_api">
			</div> -->

      <div class="row">
        <div class="col">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">App width / height</span>
            <input type="number" min="800" step="1" class="form-control" v-model="app_width">
            <input type="number" min="800" step="1" class="form-control" v-model="app_height">
          </div>
        </div>

      </div>

      <!-- <div class="row">
        <div class="col d-none">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">Screensaver timeout (sec)</span>
            <input type="number" min="5" step="1" class="form-control" v-model="screensaver_time">
          </div>
        </div>
        <div class="col">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">'Still There' timeout (sec)</span>
            <input type="number" min="5" step="1" class="form-control" v-model="back_inactivity_time">
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">Auto Close timeout (sec)</span>
            <input type="number" min="5" step="1" class="form-control" v-model="back_autoexit_time">
          </div>
        </div>
      </div> -->

			<div>
				Info Banner
			</div>
			<div class="row">
        <div class="col">
					<div class="input-group input-group-sm mb-3">
						<span class="input-group-text">Show after inactivity (sec) <small class="ms-1">(0 = never show)</small></span>
						<input type="number" min="0" step="10" class="form-control" v-model="banner_showtime">
					</div>
        </div>
        <div class="col">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">stay up for xx (sec) <small class="ms-1">then go to the attract loop</small></span>
            <input type="number" min="5" step="1" class="form-control" v-model="banner_closetime">
          </div>
        </div>
      </div>

			<div>
				No activity for the overall program
			</div>
			<div class="row">
        <div class="col-6">
					<div class="input-group input-group-sm mb-3">
						<span class="input-group-text">back to attract page <small class="ms-1">(0 = disabled)</small></span>
						<input type="number" min="0" step="10" class="form-control" v-model="back_inactivity_time">
						<span class="input-group-text">sec</span>
					</div>
        </div>
        
      </div>

      

      



      <div class="bottom-buttons text-end">
        <div class="btn-group" role="group">
          <button v-if="false" type="button" class="btn btn-sm btn-secondary mr-2" :disabled="is_saving"
            @click="onCancelClicked()">
            Cancel
          </button>
          <button type="button" class="btn btn-sm btn-primary" :disabled="is_saving" 
            @click="onSaveClicked()">
            <font-awesome-icon class="icon-settings" icon="save" />
            <span v-if="is_saving" class="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span>
            Save
          </button>
        </div>
      </div>



      <div class="row" v-if="is_development">
        <div class="col">
          <pre class="bg-info p-2" v-html="JSON.stringify(config, null, 2)"></pre>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      is_saving: false,
      app_version: null,
      // form
      url_update: "",
			url_api: "",
      app_width: 1200,
      app_height: 800,
      back_inactivity_time: 180,
      back_autoexit_time: 30,
      screensaver_time: 30,
			banner_showtime: 120,
			banner_closetime: 20,
    };
  },
  computed: {
    ...mapState(["is_development", "config"]),
  },
  async created() {
    let resultAbout = await this.$store.dispatch('callBackgroundProcess', {
      sendTo: 'get_about',
      params: { reply_to: 'got about' }
    });
    this.app_version = resultAbout.appVersion;

		this.url_update = this.config.url_update;
		this.url_api = this.config.url_api;
    this.app_width = this.config.width;
    this.app_height = this.config.height;
    this.back_inactivity_time = this.config.back_inactivity_time;
    this.back_autoexit_time = this.config.back_autoexit_time;
    this.screensaver_time = this.config.screensaver_time;
		this.banner_showtime = this.config.banner_showtime;
		this.banner_closetime = this.config.banner_closetime;

    // this.$forceUpdate();
  },
  mounted(){
  },
  beforeDestroy() {
  },
  methods: {
    async onSaveClicked() {
      this.is_saving = true;
      let newConfig = await this.$store.dispatch('callBackgroundProcess', {
        sendTo: 'update config',
        params: {
          reply_to: 'updated config',
          config: {
            ...this.config,
            ...{
              url_update: this.url_update,
							url_api: this.url_api,
              width: Number(this.app_width),
              height: Number(this.app_height),
              back_inactivity_time: Number(this.back_inactivity_time),
              back_autoexit_time: Number(this.back_autoexit_time),
              screensaver_time: Number(this.screensaver_time),
							banner_showtime: Number(this.banner_showtime),
							banner_closetime: Number(this.banner_closetime),
            },

          },
        },
      });
      this.$store.commit("set_config", newConfig);
      this.is_saving = false;
      this.validateConfig();
    },
    validateConfig() {
      // let isValid = !!this.cameraId;
      // if (!this.cameraId) {
      //   this.$notify({ type: 'error', title: 'Please select a webcam.' });
      // }
      let isValid = true;
      if (isValid) {
        this.onCancelClicked();
      }
    },
    onCancelClicked() {
      this.$router.push({ name: "updates" });
    },
  }
};
</script>

<style lang="scss">
.settings {
  >.container {
    >.row {
      >.col {
        display: flex;
        flex-direction: column;
      }
    }

    .bottom-buttons {
      margin-top: auto;
    }

  }
}
</style>
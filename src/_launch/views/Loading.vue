<template>
  <div class="loading">
    <div class="loading-content">
      <p class="mt-3"><strong>{{ appName }}</strong></p>
      <p>Current version: <span id="version">{{ appVersion }}</span></p>
      <p id="messages"></p>
    </div>
    <div class="enter-settings">Press F2 to open settings [{{ interval_seconds }}s]</div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
  name: 'loading',
  data() {
    return {
      appName: '',
      appVersion: '',
      interval_skip: null,
      interval_seconds: 3,
    };
  },
  computed: {
    ...mapState(['ipc_renderer', 'config']),
  },
  async created() {
    window.addEventListener('keydown', this.keyDownEvents);
    this.continueLoading();
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDownEvents);
    clearInterval(this.interval_skip);
  },

  methods: {
    keyDownEvents(event) {
      switch (event.keyCode) {
        case 113: // F2
          this.showSettings();
          break;
        case 122: // F11
          break;
        default:
      }
    },
    async continueLoading() {
      // get name & version
      this.appName = await this.$store.dispatch('callBackgroundProcess', {
        sendTo: 'get name',
        params: { reply_to: 'app name' }
      });
      this.appVersion = await this.$store.dispatch('callBackgroundProcess', {
        sendTo: 'get version',
        params: { reply_to: 'app version' }
      });
      console.log('%c Version: ', 'background: #222; color: #bada55', this.appVersion);
      // get config
      let bgconfig = await this.$store.dispatch('callBackgroundProcess', {
        sendTo: 'get config',
        params: { reply_to: 'current config' }
      });
      this.$store.commit("set_config", bgconfig);

      // let content_data_file = await this.$store.dispatch('callBackgroundProcess', {
      //   sendTo: 'read_from_file',
      //   params: { file_name: 'content.json', reply_to: 'content_file_reply' }
      // });
      // if (content_data_file == '') {
      //   console.error("content.json is not exists");
      //   this.showSettings();
      // }else{
      //   console.log("content.json", JSON.parse(content_data_file));
      //   this.$store.commit('setRawContentData', JSON.parse(content_data_file));
      //   this.startAutoSkipSettings();
      // }
			this.startAutoSkipSettings();

    },

    startAutoSkipSettings() {
      this.interval_skip = setInterval(() => {
        this.interval_seconds--;
        if (this.interval_seconds <= 0) {
          this.onCancelClicked();
        }
      }, 1000);
    },
    onCancelClicked() {
      clearInterval(this.interval_skip);
      this.$router.push({ name: 'updates' });
    },
    showSettings() {
      this.$router.push({ name: 'settings' });
    },
  },
};
</script>

<style lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-content {
    text-align: center;
    img {
      width: 80px;
    }
  }
  .enter-settings {
    position: absolute;
    bottom: 0;
    left: 0;
    color: rgba(255, 255, 255, 0.3);
    font-size: 10px;
    padding: 10px;
  }
}
</style>
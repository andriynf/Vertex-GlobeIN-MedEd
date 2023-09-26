<template>
  <div class="content">
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
      <p>Content</p>
      <div class="progress" style="width: 50%; height: 4px;">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          :aria-valuenow="percents"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="[{width: `${percents}%`}]"
        ></div>
      </div>
      <pre v-if="message" class="mt-2">{{ message }}</pre>
      <pre v-if="output" class="downloading-files bg-light text-dark" v-html="output"></pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      files: [],
      percents: 0,
      output: ""
    };
  },
  computed: {
    is_electron() {
      return this.$store.state.is_electron;
    },
    ipc_renderer() {
      return this.$store.state.ipc_renderer;
    },
    config() {
      return this.$store.state.config;
    }
  },
  watch: {
    output(newValue, oldValue) {
      this.$nextTick(() => {
        let elem = this.$el.querySelector('.downloading-files');
        elem.scrollTop = elem.scrollHeight;
      });
    }
  },
  created() {
    // load data for selected presentation
    this.initCompleted();

    this.ipc_renderer.on("file downloaded", (event, obj) => {
      switch (obj.status) {
        case "skipped":
          this.output += `<span class="badge badge-secondary">skipped</span>\n`;
          break;
        case "saved":
          this.output += `<span class="badge badge-success">success</span>\n`;
          break;
        default:
          this.output += `<span class="badge badge-danger">error</span>\n`;
      }
      if (this.files.length == 0) {
        this.initCompleted();
      } else {
        this.downloadFile();
      }
    });
    this.ipc_renderer.on("download progress", (event, progress) => {
      // Progress in fraction, between 0 and 1
      this.percents = Math.round(progress * 100);
    });

    // // download files
    // let structure = this.config.get('structure');
    // this.files.push(structure.full_prescribing_pdf);
    // this.downloadFile();
    
  },
  methods: {
    
    downloadFile() {
      let file = this.files.shift();
      this.output += `${file} `;
      this.ipc_renderer.send("download file", file);
    },
    initCompleted() {
      this.output += `<strong>Completed</strong>`;
      // close launch window and open application window
      this.ipc_renderer.send("launch completed");
    }
  }
};
</script>

<style lang="scss">
.downloading-files {
  min-width: 50%;
  padding: 5px 10px;
  max-height: 250px;
  overflow: visible;
}
</style>

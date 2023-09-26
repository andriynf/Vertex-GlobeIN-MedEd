<template>
	<div class="content">
    <div class="container py-3">

      <p class="lead">Content</p>

      <div class="mb-3">
        <label for="">Available maps</label>
        <div class="input-group">
          <select class="form-select" v-model="current_event_id">
            <option disabled value="0">Choose...</option>
            <option 
              v-for="(option, index) in allEvents"
              :key="'aeopt'+index"
              :value="option.id"
            >{{`[ID: ${option.id}] ${option.title}`}}</option>
          </select>
          <button 
            type="button"
            class="btn btn-warning"
            :class="{'disabled':!current_event_id || is_busy}"
            @click="startDownload()"
          >
            <span>{{btnDownloadLabel}}</span>
          </button>
        </div>
      </div>
      <div v-if="rawContent" class="mb-3">
        <label for="">Found Local Content</label>
        <div>
          <span class="badge text-bg-secondary me-2">Name: {{rawContent.event_title}}</span>
          <span class="badge text-bg-secondary me-2">Event ID: {{rawContent.event_id}}</span>
          <span class="badge text-bg-secondary me-2">ver: {{rawContent.ver}}</span>
        </div>
      </div>

    

      <transition 
        enter-active-class="animate__animated animte__faster animate__fadeIn"
        leave-active-class="animate__animated animte__faster animate__fadeOut animate__delay-3s"
        mode="out-in"
        appear
      >
        <div class="d-flex flex-column justify-content-center align-items-center vh-1001">
          <!-- <p>Status</p> -->
          <div v-show="is_busy" class="progress" style="width: 50%; height: 4px;">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="percents" aria-valuemin="0" aria-valuemax="100" :style="[{width: `${percents}%`}]"></div>
          </div>
          <pre v-if="message" class="mt-2">{{ message }}</pre>
          <pre v-if="output" class="downloading-files bg-light text-black" v-html="output"></pre>
        </div>
      </transition>

      <div class="text-center mt-5">
        <div class="btn-group" role="group">
          <button
            v-if="rawContent"
            type="button"
            class="btn btn-sm1 btn-primary"
            :class="{'disabled':is_busy}"
            @click="onStartAppClicked()"
          >
            Start App
          </button>
        </div>
      </div>

    </div>

	</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
	data() {
		return {
      allEvents: null,
      current_event_id: 0,
      is_content_updates: false,

      is_busy: true,
      
			// files: [],
			percents: 0,
			output: '',
			kiosk_id: null,
			message: null,
		};
	},
  computed: {
    ...mapState(['ipc_renderer', 'config', 'rawContent']),
    btnDownloadLabel(){
      let t = "Fresh download";
      if (this.is_content_updates && this.current_event_id==this.rawContent.event_id){
        t = "Download Updates";
      }
      return t;
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
    if(this.rawContent){
      this.current_event_id = this.rawContent.event_id;
    }
    this.loadAllEvents();


    this.ipc_renderer.on('download file', (event, obj) => {
      console.log(`${obj.file_name} [${obj.status}]`);
      switch (obj.status) {
        case "skipped":
          this.output += `${obj.file_name} - <span class="badge bg-secondary">exists</span>\n`;
          break;
        case "saved":
          this.output += `${obj.file_name} - <span class="badge bg-success">success</span>\n`;
          break;
        default:
          this.output += `${obj.file_name} - <span class="badge bg-danger">error</span>\n`;
      }
    });
    this.ipc_renderer.on('download progress', (event, progress) => {
      // Progress in fraction, between 0 and 1
      this.percents = Math.round(progress.percent * 100);
    });
    
  },
  mounted() {
  },
	methods: {
    loadAllEvents(){
      this.is_busy = true;
      axios
        .get(`${this.config.url_api}/request/get_available_events`)
        .then(response => {
          this.is_busy = false;
          console.log(`Loaded Avail Events`, response);
          let retdata = response.data;

          if(response.request.status == 200 && retdata.status == "success"){
            this.allEvents = retdata.data;
            // console.log(this.allEvents);
            this.checkIsUpdates();
          }else{
            console.error(response);
            this.$notify({
              duration: -1,
              type: 'error',
              title: retdata.status,
              text: retdata.msg
            });
          }
        })
        .catch(e => {
          this.is_busy = false;
          console.error("loadAllEvents()", e);
        });
    },
    checkIsUpdates(){
      let localEventVer = 0;
      let remoteEventVer = 0;

      if(this.rawContent){
        localEventVer = String(this.rawContent.ver).replace(/\D/g, '');
      }
      let eventItem = this.allEvents.find(x => parseInt(x.id) === parseInt(this.current_event_id));
      if (eventItem){
        remoteEventVer = String(eventItem.ver).replace(/\D/g, '');
      }

      if(remoteEventVer > localEventVer){
        this.is_content_updates = true;
      }else{
        this.is_content_updates = false;
      }
    },
    startDownload(){
      let _url = `${this.config.url_api}/request/get_update_content/${this.current_event_id}`;
      if (this.is_content_updates && this.current_event_id==this.rawContent.event_id){
        _url = `${this.config.url_api}/request/get_update_content/${this.current_event_id}/${this.rawContent.ver}`;
      }
      console.log("_url", _url);

      this.is_busy = true;

      axios
        .get(_url)
        .then(response => {
          console.log(`Downloading files. Please wait.`);

          let retdata = response.data;

          if(response.request.status == 200 && retdata.status == "success"){
            // this.allEvents = retdata.files;
            // this.checkIsUpdates();
            let usedata = {
              files: retdata.files,
              url: `${this.config.url_api}/storage/`,
            };
            
            let has_errors = false;
            this.ipc_renderer.send('download', usedata);
            this.ipc_renderer.once('download_complete', event => {
              this.output += `<strong>Complete</strong>\n`;
              if (has_errors) {
                this.$notify({
                  duration: -1,
                  type: 'error',
                  title: 'Error! Download content',
                  text: `Some files didn't download. Please check your internet connection. Then restart application.`
                });
              } else {
                // this.runApplication();
                console.log("Reload content.json");
                this.reloadContentFile();
                
              }
              this.is_busy = false;
            });
            
          }else{
            console.error(response);
            this.$notify({
              duration: -1,
              type: 'error',
              title: retdata.status,
              text: retdata.msg
            });

            this.is_busy = false;
          }
          
        })
        .catch(e => {
          this.is_busy = false;
          console.error("startDownload()", e);
        });


      // setTimeout(() => {
      //   this.is_busy = false;
      // }, 2000);
    },

    async reloadContentFile(){
      let content_data_file = await this.$store.dispatch('callBackgroundProcess', {
        sendTo: 'read_from_file',
        params: { file_name: 'content.json', reply_to: 'content_file_reply' }
      });
      if(content_data_file == ''){
        console.error("content.json is not exists");
      }else{
        console.log("content.json", JSON.parse(content_data_file));
        this.$store.commit('setRawContentData', JSON.parse(content_data_file));
      }
      this.checkIsUpdates();
    },
		/*
		loadApiData() {
      axios
				.get(`${this.config.url_api}/kiosk/${this.kiosk_id}`)
        .then(response => {
          this.$store.commit('set_is_connection', true);
          this.$store.commit('set_api_data', response.data);
          this.$store.dispatch('save_to_file', {
            file_path: `${this.kiosk_id}/data.json`,
            o: response.data
          });
					// read content and compare with local contents
					// if file not exists then download
					this.CompareFiles();
        })
        .catch(e => {
          this.$notify({ duration: 3, type: 'error', title: 'No connection!' });
          this.$store.commit('set_is_connection', false);
          // this.LoadLocalApiData();
        });
    },
		CompareFiles() {
      axios
        .get(`${this.config.url_api}/kiosk/${this.kiosk_id}/files`)
        .then(response => {
          console.log(`Downloading files. Please wait.`);
          this.$store.commit('set_is_connection', true);
          let data = {
            files: response.data.files,
            kiosk_id: this.kiosk_id,
            url: `${this.config.get('url_application')}/storage/${this.kiosk_id}/`
          };
          let has_errors = false;
          this.ipc_renderer.send('download', data);
          this.ipc_renderer.on('download file', (event, obj) => {
						console.log(`${obj.file_name} [${obj.status}]`);
            switch (obj.status) {
							case "skipped":
								this.output += `${obj.file_name} - <span class="badge bg-secondary">skipped</span>\n`;
								break;
							case "saved":
								this.output += `${obj.file_name} - <span class="badge bg-success">success</span>\n`;
								break;
							default:
								has_errors = true;
								this.output += `${obj.file_name} - <span class="badge bg-danger">error</span>\n`;
            }
          });
          this.ipc_renderer.once('download_complete', event => {
            this.output += `<strong>Completed</strong>`;
            if (has_errors) {
              this.$notify({
                duration: -1,
                type: 'error',
                title: 'Error! Download content',
                text: `Some files didn't download. Please check your internet connection. Then restart application.`
              });
            } else {
							this.runApplication();
            }
          });
					this.ipc_renderer.on('download progress', (event, progress) => {
						// Progress in fraction, between 0 and 1
						this.percents = Math.round(progress.percent * 100);
					});
        })
        .catch(e => {
          this.$store.commit('set_is_connection', false);
          // skip compare and run app
          this.runApplication();
        });
    },
    */
    onStartAppClicked(){
      this.runApplication();
    },
		runApplication() {
			this.ipc_renderer.send('launch completed');
		},
	}
}
</script>

<style lang="scss">
.downloading-files {
	min-width: 50%;
	padding: 5px 10px;
	max-height: 100px;
	overflow-y: auto;
	margin-top: 1em;
}
</style>

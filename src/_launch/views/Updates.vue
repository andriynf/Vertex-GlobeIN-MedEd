<template>
  <div class="updates">
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
			<p>Updating...</p>
			<div class="progress" style="width: 50%; height: 4px;">
				<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="percents" aria-valuemin="0" aria-valuemax="100" :style="[{width: `${percents}%`}]"></div>
			</div>
			<pre v-if="message" class="mt-2">{{ message }}</pre>
			<pre v-if="progress_text" class="mt-2">{{ progress_text }}</pre>
		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'updates',
	data() {
		return {
			percents: 0,
			message: null,
			progress_text: null,
		};
	},
	computed: {
		...mapState(['ipc_renderer', 'config', 'data']),
	},
  mounted() {
		this.ipc_renderer.send('check_for_updates', this.config.url_update);
		this.ipc_renderer.once('skipped_updates', (event, message) => {
			this.message = message
			
			// this.$router.push({ name: 'content' });

			// skip content
			this.runApplication();
		});
		this.ipc_renderer.on('updating', (event, text) => {
			this.message = text;
			if (text == 'Update available.') {
				this.percents = 0;
			} else
			if (text == 'Update downloaded.') {
				this.percents = 100;
			}
		})
		this.ipc_renderer.on('progress', (event, o) => {
			this.progress_text = o.str;
			this.percents = o.percent;
		})
	},
	methods: {
		runApplication() {
			this.ipc_renderer.send('launch completed');
		},
	},
}
</script>

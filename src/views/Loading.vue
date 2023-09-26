<template>
  <div class="loading page-view">
    <div class="d-flex flex-column justify-content-center align-items-center h-100">
      
			<h1>
				<font-awesome-icon icon="spinner" pulse />
			</h1>
			
			<!-- <button class="btn btn-primary" @click="continueLoading()">Start App</button> -->
    </div>
  </div>
</template>

<script>
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { mapState } from "vuex";
export default {
  name: "loading",
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "config",
      "ipc_renderer",
    ]),
  },
  async created() {
    console.log("%c Electron ", "background: #29516B; color: #6F8DA1");
		if (Capacitor.isNativePlatform()) {
			console.log("%c I'm a native app!", "background: #29516B; color: #6F8DA1");

			const hideStatusBar = async () => {
				await StatusBar.hide();
			};
			hideStatusBar();

		} else {
			console.log("%c I'm a PWA or Web app!", "background: #29516B; color: #6F8DA1");
		}

		if (Capacitor.getPlatform() === 'ios') {
			console.log('iOS!');
		} else if (Capacitor.getPlatform() === 'android') {
			console.log('Android!');
		} else {
			console.log('Web!');
		}

		await SplashScreen.show({
			showDuration: 2000,
			autoHide: true,
		});

		

		const logDeviceInfo = async () => {
			const info = await Device.getInfo();

			console.log('getInfo', info);
			// {
			// androidSDKVersion: 30
			// diskFree: 0
			// diskTotal: 716886016
			// isVirtual: true
			// manufacturer: "Google"
			// memUsed: 3522960
			// model: "sdk_gphone_x86"
			// name: "sdk_gphone_x86"
			// operatingSystem: "android"
			// osVersion: "11"
			// platform: "android"
			// realDiskFree: 4754960384
			// realDiskTotal: 6240665600
			// webViewVersion: "83.0.4103.106"
			// }
		};
		logDeviceInfo();

		//get device info
		const deviceInfo = await Device.getInfo();
		this.$store.commit("set_machineInfo", deviceInfo);

		//get unique machine Id
		const deviceID = await Device.getId();
		console.log('getId', deviceID.identifier); //getId 42d28ce6ab9c0985
		this.$store.commit("set_machineId", deviceID.identifier);
		

    
		/*
    // get config
    let bgconfig = await this.$store.dispatch('callBackgroundProcess', {
      sendTo: 'get config',
      params: { reply_to: 'current config' }
    });
    this.$store.commit("set_config", bgconfig);

		let app_path = await this.$store.dispatch('callBackgroundProcess', {
			sendTo: 'get app_path',
			params: { reply_to: 'current app_path' }
		});
		this.$store.commit('set_app_path', app_path);
    
    //get unique machine Id
    let pcid = await this.$store.dispatch('callBackgroundProcess', {
      sendTo: 'get machineId',
      params: { reply_to: 'current machineId' }
    });
    this.$store.commit("set_machineId", pcid);


		setInterval(async () => {
			console.log("upload activity");
			let activity_data_file = await this.$store.dispatch('callBackgroundProcess', {
				sendTo: 'upload activity',
				params: { reply_to: 'upload_activity_file_reply' }
			});
			// console.log("activity_data_file==", activity_data_file);
		}, 60 * 1000); //every 5min
		
    // when reload app (ctrl + R) need to run continueLoading()
    this.ipc_renderer.send("check communication", { name: "launch win" });
    this.ipc_renderer.once("ready communicate", event => {
      // ready to communicate with background.js
      this.continueLoading();
    });
    this.ipc_renderer.on("message", (event, message) => {
      console.log(`[bg]: ${message}`);
    });
		*/
		
		this.continueLoading();
  },
  methods: {
    continueLoading() {
      this.$router.push({ name: "attract" });
    },
    
  }
};
</script>

<style lang="scss" scoped1>
.loading {
	background-color: #fff;

	button {
		font-size: 100px;
    padding: 30px 60px;
	}
}
</style>
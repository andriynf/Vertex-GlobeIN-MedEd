// import Vue from "vue";
import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vue.config.productionTip = false;

// activate bootstrap js features
// const bootstrap = require("bootstrap");

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// window.axios = require("axios").default;
import axios, {isCancel, AxiosError} from 'axios';
window.axios = axios;

// typical import
// import gsap from 'gsap';
import { gsap, ScrollTrigger, Draggable } from "gsap/all";
// don't forget to register plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

// animate.css
import "animate.css/animate.min.css";

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserSecret,
  faSpinner,
  faAlignLeft,
  faCog,
  faSave,
  faArrowLeft,
  faArrowRight,
	faArrowUp,
  faArrowDown,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUserSecret,
  faSpinner,
  faAlignLeft,
  faCog,
  faSave,
  faArrowLeft,
  faArrowRight,
	faArrowUp,
  faArrowDown,
  faUndo
);

// Vue.component("popup-showvideo", require("./components/templates/PopupShowVideo.vue").default);
// це коли глобально компоненту оголошуєш. так точно буде робити <bg-video />
//Vue.component('bg-video', require('./components/_partials/BgVideo.vue').default);

const app = createApp(App)
	.use(store)
	.use(router);

router.isReady().then(() => {
	app.mount('#mainapp');
});


app.component("font-awesome-icon", FontAwesomeIcon);

import QRcodeTip from "./components/_partials/QRcodeTip.vue";
import InfoRedNote from "./components/_partials/InfoRedNote.vue";
import InfoNote from "./components/_partials/InfoNote.vue";
import GlobalButton from "./components/_partials/GlobalButton.vue";
import BottomMenu from "./components/_partials/BottomMenu.vue";

import ThePopup from "./components/ThePopup.vue";
import BannerBooth from "./components/BannerBooth.vue";
import PopupWebinars from "./components/templates/PopupWebinars.vue";
import PopupPodcasts from "./components/templates/PopupPodcasts.vue";
import PopupLearning from "./components/templates/PopupLearning.vue";

app.component("qr-code-tip", QRcodeTip);
app.component("global-button", GlobalButton);
app.component("info-note", InfoNote);
app.component("info-red-note", InfoRedNote);
app.component("bottom-menu", BottomMenu);
// popup
app.component("the-popup", ThePopup);
app.component("banner-booth", BannerBooth);
app.component("popup-webinars", PopupWebinars);
app.component("popup-podcasts", PopupPodcasts);
app.component("popup-learning", PopupLearning);


// app.mount('#app');


(async () => {
  await axios
    .get(`./data.json`)
    .then((response) => {
      let r = response.data;
      store.commit("set_main_data", r);

      let ga_id = r.ga_id;
      // if (ga_id) {
      //   app.use(
          
      //     VueAnalytics,
      //     {
      //       id: ga_id,
      //       fields: {
      //         userId: uid,
      //       },
      //       // set: [
      //       //   { field: 'userId', value: uid }
      //       // ],
      //       autoTracking: {
      //         pageviewOnLoad: false,
      //         pageviewTemplate(route) {
      //           return {
      //             page: route.path,
      //             title: document.title,
      //             location: window.location.href,
      //           };
      //         },
      //       },
      //     },
      //     router
      //   );
      // } else {
      //   console.info("No GA id.");
      // }
    })
    .catch((error) => {
      console.log(error);
      router.push("/error");
    });

  // app = createApp({
  //   router,
  //   store,
  //   // render: (h) => h(App),
  // }).mount("#app");

	

})();

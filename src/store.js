// import Vue from "vue";
import Vuex from "vuex";
import router from "./router.js";

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    is_electron: !!import.meta.env.IS_ELECTRON,
    is_development: import.meta.env.NODE_ENV !== "production",
    ipc_renderer: null,
    machineId: null,
    machineInfo: {},
    config: {
			url_update: "http://globein-api/MedEd/", //https://bhoward3.com/electron/GlobeIN/MedEd/
			url_api: "//bhoward3.com/electron/GlobeIN/api", //https://bhoward3.com/electron/GlobeIN/api     http://globein-api
			width: 3840,
			height: 2160,
			back_inactivity_time: 180,
			back_autoexit_time: 30,
			screensaver_time: 30,
			banner_showtime: 120,
			banner_closetime: 120,
		},
		app_path: "", // \AppData\Roaming...  or \_USER\Desktop\
		// rawContent: null, //external content.json
		userid: "user",
    main_data: null,
    activePlayerItemID: -1,
		isForcedPlayer: false,
		isForcedBrowser: false,
		//-------------------
    challengeData: null,
		showSegmentContent: -1,
    video_is_playing: false,
  },
  mutations: {
    set_env: (state, o) => (state.env = o),
    set_ipc_renderer: (state, o) => (state.ipc_renderer = o),
    set_machineId: (state, s) => (state.machineId = s),
    set_machineInfo: (state, o) => (state.machineInfo = o),
    set_userid: (state, s) => (state.userid = s),
    set_config: (state, el) => (state.config = el),
		set_app_path: (state, str) => (state.app_path = str),
		// setRawContentData(state, o) {
    //   state.rawContent = o;
		// 	state.main_data = o;
    // },
    set_main_data: (state, o) => (state.main_data = o),
		set_activePlayerItemID: (state, num) => (state.activePlayerItemID = num),
		set_isForcedPlayer: (state, boo) => (state.isForcedPlayer = boo),
		set_isForcedBrowser: (state, boo) => (state.isForcedBrowser = boo),
		
		//////----------------------------------
    set_video_is_playing: (state, boo) => (state.video_is_playing = boo),
    set_showSegmentContent: (state, num) => (state.showSegmentContent = num),
    
  },
  actions: {
    callBackgroundProcess({ commit, state, dispatch }, args) {
      return new Promise((resolve, reject) => {
        // args.params has 'reply_to' parameter
        // state.ipc_renderer.send(args.sendTo, args.params);
        // state.ipc_renderer.once(args.params.reply_to, (event, result) => {
        //   resolve(result);
        // });
      });
    },
		
		forceOpenPlayer({ commit, state, dispatch }, pid) {
			//set video item
      commit('set_activePlayerItemID', pid);
      //popup window
			dispatch('popup_item', {
				content_id: 2,
			});
			//force to show player
			commit('set_isForcedPlayer', true);
		},
		openPlayerBox({ commit, state, dispatch }, pid) {
      commit('set_activePlayerItemID', pid);
		},
		closePlayerBox({ commit, state, dispatch } ) {
      commit('set_activePlayerItemID', -1);
			commit('set_isForcedPlayer', false);
		},
		saveActivity({ state }, obj) {

			obj.eid = state.main_data.event_id;
			obj.mid = state.machineId;
			obj.dev = state.machineInfo;
			obj.uid = state.userid;
			obj.start_dt = new Date().toISOString().slice(0, 19).replace("T", " ");

      if (state.ipc_renderer) {
        state.ipc_renderer.send("save activity", obj);
      }
			

			const formData = new FormData();
			formData.append("logs", JSON.stringify([obj]) );

			axios
			.post(`${state.config.url_api}/request/save_logs/`, formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data' //Skip CORS: https://stackoverflow.com/a/30554385
					}
				}
			)
			.then((response)=>{
				const r = response.data;
				if (r.status == 'success'){
					//all good
				}else{
					console.error('Error on server');
					console.log(response);
				}
			})
			.catch((error)=>{
				console.error('Error save logs');
				console.log(error);
			});

    },
		popup_item({ commit, state, dispatch }, { content_id, ga_category }) {
      // item - object from content
      // get content by id
      let item = state.main_data.content.find((o) => o.id === content_id); // if not found > undefined
      console.log("popup_item>>", content_id, item);
			// console.log("router.currentRoute", router.currentRoute);

      if (item) {
        if (
          item.type === "popup" &&
          router.currentRoute.value.query.popup !== item.template
        ) {
          
          router.push({
            path: router.currentRoute.value.path,
            query: { popup: item.template, id: content_id },
          });
        }
      } else {
        this._vm.$notify({
          type: "error",
          title: "No data to view",
        });
      }
    },
		
    // getProductContentData({ commit, state, dispatch }, content_id) {
    //   return new Promise(async (resolve, reject) => {
    //     let result = state.main_data.content.find((o) => o.id === content_id);
    //     resolve(result);
    //   });
    // },
    getPageById({ commit, state, dispatch }, id) {
      return new Promise(async (resolve, reject) => {
        // deep clone first
        let arr_clone = JSON.parse(JSON.stringify(state.main_data.pages));
        let result = arr_clone.filter((o) => parseInt(o.id) === parseInt(id));

        resolve(result);
      });
    },
    store_ga_event({ state, dispatch }, { category, action, label }) {
      // console.log(this._vm.$ga);
      // if (this._vm.$ga) {
      //   this._vm.$ga.event({
      //     eventCategory: category,
      //     eventAction: action,
      //     eventLabel: label,
      //     // eventValue: 123
      //   });
      // }

      // dispatch("send_message_to_parent", {
      //   event: "custom.postGAmessage.track",
      //   category: category,
      //   action: action,
      //   label: label,
      //   //value: '',
      // });

      // if (this._vm.$gtag) {
      //   console.log('store_ga_event', [ category, action, label ]);
      // 	let prefix = '';
      // 	// this._vm.$gtag.event(prefix + action, {
      // 	// 	event_category: prefix + category,
      // 	// 	event_label: prefix + label
      // 	// });

      // 	this._vm.$gtag.event('all_events', {
      // 		event_category: prefix + category,
      // 		event_label: prefix + label
      // 	});
      // } else {
      // 	console.error('NO GTAG', this._vm.$gtag);
      // }

      let form_data = {};
      form_data.uid = state.machineId;
      form_data.ec = category;
      form_data.ea = action;
      form_data.el = label;

      // axios
      //   .get(state.config.api_url + "/request.php", {
      //     params: { action: "usagestat", ...form_data },
      //   })
      //   .then(
      //     (response) => {
      //       const r = response.data;
      //       // console.log("save_analytics > ", r);
      //       if (r.status === "success") {
      //       } else {
      //         // console.error('error insert');
      //       }
      //     },
      //     () => {
      //       // console.error('Something went wrong!');
      //     }
      //   );
    },
    send_message_to_parent({ state }, obj) {
      if (state.is_development) {
        // console.log("send_message_to_parent()", obj);
      }
      try {
        if (typeof window.parent !== "undefined" && window.parent !== window) {
          if (typeof window.parent.postMessage !== "undefined") {
            // Convent message into a string
            const messageJSON = JSON.stringify({ ...obj });
            //console.log('Send message to parent', obj);
            window.parent.postMessage(messageJSON, "*");
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    clicked_item({ commit, state, dispatch }, { content_id, ga_category }) {
      // item - object from content
      // get content by id
      let item = state.main_data.content.find((o) => o.id === content_id); // if not found > undefined
      // console.log(content_id, item);

      if (item) {
        if (
          item.type === "popup" &&
          router.currentRoute.value.query.popup !== item.template
        ) {
          // dispatch('store_ga_event', {
          // 	category: ga_category,
          // 	action: `open popup (${item.template})`,
          // 	label: item.properties.title
          // });
          router.push({
            path: router.currentRoute.value.path,
            query: { popup: item.template, id: content_id },
          });
        }
      } else {
        this._vm.$notify({
          type: "error",
          title: "No data to view",
        });
      }
    },
  },
});

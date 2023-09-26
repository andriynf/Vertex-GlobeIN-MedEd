import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // default values
    is_electron: !!process.env.IS_ELECTRON,
    is_development: process.env.NODE_ENV !== "production",
    ipc_renderer: null,
    config: null,
    rawContent: null,
  },
  mutations: {
    set_ipc_renderer: (state, o) => (state.ipc_renderer = o),
    set_env: (state, o) => (state.env = o),
    set_config: (state, el) => (state.config = el),
    set_app_path: (state, str) => (state.app_path = str),

    setRawContentData(state, o) {
      state.rawContent = o;
    },
  },
  actions: {
    callBackgroundProcess({ commit, state, dispatch }, args) {
      return new Promise((resolve, reject) => {
        // args.params has 'reply_to' parameter
        state.ipc_renderer.send(args.sendTo, args.params);
        state.ipc_renderer.once(args.params.reply_to, (event, result) => {
          resolve(result);
        });
      });
    },
    
  },
});

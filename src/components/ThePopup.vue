<template>
  <div class="modal fade123" :class="['the-popup', `tpl-${current_template}`, extra_class]" ref="main_popup"
    id="myModal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered123 modal-fullscreen w-1001">
      <div class="modal-content">

        <!-- body of popup -->
        <transition 
          enter-active-class="animate__animated animate__fast animate__fadeIn"
          leave-active-class="animate__animated animate__fast animate__fadeOut" appear mode1="out-in"
        >
          <component :is="current_template" :properties="current_properties" ref="popup_content" @onVideoEnd="closeClick" @onBackClick="closeClick"></component>
        </transition>

				<div class="bottomLine"></div>

        <!-- close button -->
        <div class="btn-close-popup" @click="closeClick()"><img src="/img/icon_close.svg" width="74" />Close</div>

      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { mapState } from "vuex";

// import VideoViewer from '@/components/templates/VideoViewer.vue';
export default {
  components: {
    // VideoViewer,
  },
  data() {
    return {
      thisModalObj: null,
      current_template: null,
      current_properties: null,
      extra_class: '',
    };
  },
	computed: {
		...mapState([
			"config",
			"ipc_renderer",
			"main_data",
			"activePlayerItemID",
			"isForcedPlayer",
		]),
    popup_data() {
      let result;
      if (this.$route.query.id !== undefined) {
        // search by id
        result = this.$store.state.main_data.content.find(
          (o) => o.id === parseInt(this.$route.query.id)
        );
      } else 
      if (this.$route.query.popup !== undefined) {
        // search by popup name
        result = this.$store.state.main_data.content.find(
          (o) => o.template === this.$route.query.popup
        );
      }

      return result;
    }
    
  },
  watch: {
    '$route.query.popup'(newValue, oldValue) {
			// console.log("$route.query.popup", this.$route.query.popup);

      if (newValue === undefined) {
        // try to close
        this.thisModalObj.hide();
      }
    },
    popup_data(newValue, oldValue) {
      if (newValue !== undefined) {
        this.getPopupProperties();
      }
    },
  },
  mounted() {
    this.thisModalObj = new Modal(this.$refs.main_popup);
    const myModalEl = document.getElementById('myModal')
    myModalEl.addEventListener('shown.bs.modal', event => {
      this.shownPopup();
    });
    myModalEl.addEventListener('hidden.bs.modal', event => {
      // console.log("hidden.bs.modal");
      this.hiddenPopup()
    });

    this.getPopupProperties();
  },
  methods: {
    getPopupProperties() {
      let current = this.popup_data;
      // console.log("current", current);
      if (current && current.properties) {
        this.current_template = `popup-${current.template}`;
        this.current_properties = current.properties;

        this.extra_class = "cid-"+current.id;

        this.thisModalObj.show();
      } else {
        // this.$notify({ type: 'error', title: 'No data' });
      }
    },
    hiddenPopup() {
      if (this.$route.query.popup !== undefined) {
        // remove query from url
        console.log("this.$route.path=", this.$route.path);
        this.$router.push({ path: this.$route.path });
        
        this.current_template = null;
        this.current_properties = null;
        this.$store.commit("set_video_is_playing", false);
      }
      
    },
    shownPopup() {
      if (
        this.$refs.popup_content &&
        typeof this.$refs.popup_content.shownPopup === 'function'
      ) {
        this.$refs.popup_content.shownPopup();
      }
    },
    closeClick() {
      console.log("popup closeClick()");

			this.$store.dispatch("saveActivity", {
				ec: 'Popup',
				ea: 'click',
				el: "Close",
			});

			if (this.isForcedPlayer){
				this.$store.dispatch("closePlayerBox");
				this.thisModalObj.hide();
			}else{
				if(this.activePlayerItemID != -1){
					this.$store.dispatch("closePlayerBox");
				}else{
					this.thisModalObj.hide();
				}
			}
    },

  },
};
</script>

<style lang="scss">
.the-popup {
	// background-image: url('/img/temp10.jpg');
  background-color: rgba(29, 29, 27, 0.85);

  .modal-dialog {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
  .modal-content {
		width: 3345px;
		height: 1805px !important;
    // background-color: transparent;
    background-color: rgba(255, 255, 255, 0.95);
    // background-color: rgba(255, 255, 255, 0.5); // REMOVE IN PROD
		box-shadow: rgba(0, 0, 0, 0.8) 0px -7px 5px;

		.bottomLine {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 25px;
			background-color: #51267d;
		}
  }

	.btn-close-popup {
		position: absolute;
		top: -20px;
		right: -40px;
		width: 256px;
		height: 125px;
		background-color: #51267d;
		border-radius: 16px;
		border: 4px solid #fff;
		font-family: 'SourceSansPro-Semibold';
		font-size: 41px;
		color: #fff;
		display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
		cursor: pointer;
		// transition: all 0.3s ease;
	}

	&.cid-2 {
		.bottomLine {
			background-color: #08a9b7;
		}
	}

	&.cid-3 {
		.bottomLine {
			background-color: #d06578;
		}
	}

	/* ******************* */
	/* POPUP CHILD CONTENT */

	.popheader {
		padding-top: 100px;
		display: flex;
    align-items: center;
		overflow: hidden;
		
		.iconstick {
			height: 350px;
			width: 1260px;
			display: flex;
			align-items: center;
			align-self: flex-start;
			padding-left: 50px;
			font-family: 'SourceSansPro-Semibold';
			font-size: 113px;
			line-height: 100px;
			color: #fff;
			gap: 60px;
			border-radius: 0 25px 25px 0;
			background-color: #d06578;
			animation:slide-in-left .5s cubic-bezier(.25,.46,.45,.94) both;
		}
		.title {
			width: 1780px;
			margin-left: 100px;
			font-family: 'SourceSansPro-Semibold';
			font-size: 47px;
			line-height: 63px;
			color: #1d1d1b;
			animation:fade-in-bck .6s cubic-bezier(.39,.575,.565,1.000) both;
			.accent {
				font-family: 'SourceSansPro';
				font-weight: bold;
				color: #d06578;
			}
		}
	}
}
</style>

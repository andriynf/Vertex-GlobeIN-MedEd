<template>
  <div id="segmentdayscontainer">
    <div class="content animate__animated animate__faster animate__fadeIn">

      <div class="welcome-message">
        <div class="row">
          <div class="col" style="display: flex; justify-content: center; align-items: center;">
						<img class="virtpreview" :src="challengeData.thumbs[showSegmentContent].fullImg" />
					</div>
        </div>
        <!-- <div class="text-center">
          <button class="btn" @click="closeMe()">Close</button>
        </div> -->
      </div>
      
      <div class="btn-back" @click="closeMe()"></div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "segment-player-box",
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState([
      "config",
      "ipc_renderer",
      "main_data",
			"challengeData",
			"showSegmentContent"
    ]),
  },
  mounted() {},
  beforeDestroy: function() {},
  methods: {
    closeMe() {
      this.$store.commit("set_showSegmentContent", -1);
    }
  }
};
</script>

<style lang="scss">
#segmentdayscontainer {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    position: relative;
    background-color: black;
		width: 1400px;
		min-height: 650px;
    transition: all 0.3s ease;
		border: 1px solid gray;
		border-radius: 15px;

    .btn-back {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 51px;
      height: 51px;
			background: url('/img/icon_close.svg') no-repeat center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    
    .welcome-message {
      color: #fff;
      padding: 75px 70px;
    }
    
  }
  
}
</style>


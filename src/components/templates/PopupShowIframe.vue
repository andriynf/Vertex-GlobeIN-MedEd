<template>
	<div 
    class="popup-showiframe container-fluid"
    :class="{'h-100vh': properties.full_size==true}"
  >
		<!-- <h3>{{ properties.title }}</h3> -->

    <iframe :src="full_src" frameborder="0" allow="autoplay; fullscreen"></iframe>

    
    
	</div>
</template>

<script>
	export default {
		props: {
			properties: {
				type: Object,
				default: function() {
					return { title: '', data: [] };
				},
			},
		},
		data() {
			return {
        
			};
		},
    computed: {
      is_electron() {
        return this.$store.state.is_electron;
      },
      full_src(){
        if(this.properties.localExtContent == true){
          const path = require('path');
          let newurl = path.join(__static, this.properties.media_url);
          console.log("newurl=", newurl);
          return newurl;
        }else{
          return this.properties.media_url
        }
      }
    },
		created() {
			
		},
		methods: {
			backClick() {
				console.log("popup-showiframe backClick()");
			},
		},
	};
</script>

<style lang="scss">
	.popup-showiframe {
		// color: var(--primary);
		padding: 0;
    height: 840px;

    &.h-100vh {
      height: calc(1080px - 16px - 16px);
    }

		h3 {
			text-transform: uppercase;
			font-weight: bold;
			position: absolute;
		}
		
		iframe {
			width: 100%;
			height: 100%;
		}
		
	}
</style>

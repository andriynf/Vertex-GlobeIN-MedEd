<template>
  <div class="globeinwebsite page-view">
		
		<div class="content-box">
			<div class="bodyarea">

				<div v-if="isForcedBrowser" class="iframewebsite">
					<div class="content">
						<!-- WEBSITE TO BE EMBEDDED -->
						<iframe src="https://globeinportal.wbcst.co.uk/" frameborder="0" class="w-100 h-100"></iframe>
					</div>
				</div>

				<div v-else>
					<div class="pagetitle">
						<img src="/img/globein_overview.png" width="1043">
						<div class="headline">
							Dedicated to providing tailored medical education resources for haemoglobinopathies to support you, your patients,
							<br>and the multidisciplinary care team. Discover a range of resources covering pathophysiology, clinical complications,
							<br>patient journey, and current and future management of sickle cell disease and β-thalassaemia
						</div>
					</div>

					<div class="row gx-0" style="margin-top: 45px; justify-content: space-between;">
						<div class="col-auto">
							<div class="imggray animate__animated animate__fadeInRight">
								<img src="/img/globweb.png" width="615">
							</div>
						</div>
						<div class="col-auto">
							<div class="textgray animate__animated animate__fadeInRight">
								<ul>
									<li>The <strong>GlobeIN</strong> website hosts on-demand resources including webinar recordings, videos, and podcasts, with additional resources including e-learning coming soon!</li>
									<li>Resources are available in <strong>English, French, German and Italian</strong></li>
								</ul>
							</div>
						</div>
					</div>

					<h3 class="animate__animated animate__fadeIn animate__delay-1s">To access the GlobeIN website and learn more about the programme, scan the QR code below</h3>

					<div class="animate__animated animate__fadeIn animate__delay-1s">
						<info-red-note class="blackinfotext">This site is for healthcare professionals only. *By entering this site, you confirm that you are a healthcare professional.*</info-red-note>

						<div class="footnote">
							*A Healthcare Professional (HCP) is defined as any person that is a member of the medical, dental, pharmacy or nursing professions or any other
							<br>person who, in the course of his/her professional activities, may prescribe, purchase, supply, recommend or administer a Medicinal Product.
						</div>
					</div>
				</div>

			</div>

			<bottom-menu @onBackClick="onMenuBackClick()" @onNextClick="onMenuNextClick()" />

		</div>

		<qr-code-tip />
    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
  },
	computed: {
		...mapState([
			"config",
			"ipc_renderer",
			"main_data",
			"isForcedBrowser",
		]),
	},
  data() {
    return {
    };
  },
  created(){},
	beforeDestroy(){
		this.$store.commit('set_isForcedBrowser', false);
	},
  mounted() {},
  methods: {
		openWebsitePopup(){

			this.$store.dispatch("saveActivity", {
				ec: 'GlobeIn website page',
				ea: 'click',
				el: "Open website popup",
			});

			this.$store.commit('set_isForcedBrowser', true);

		},
		onMenuBackClick() {
			if (this.isForcedBrowser){
				this.$store.commit('set_isForcedBrowser', false);
				this.$store.dispatch("saveActivity", {
					ec: 'GlobeIn website page',
					ea: 'click',
					el: "Close website popup",
				});
			}else{
				
				this.$router.push({ name: "community" });

			}
		},
		onMenuNextClick() {
			this.$router.push({ name: "homepage" });
		},
		
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.globeinwebsite {
  // background-image: url('/img/temp9.jpg');
	// .content-box {
	// 	background-color: rgb(255, 255, 255, 0.5);
	// }

	.iframewebsite {
		height: 100%;
		padding: 50px;
		.content {
			// background-color: #e6007e;
			height: 100%;
			font-size: 100px;
			text-align: center;
		}
	}
	.bodyarea {
		width: 2430px;
    margin: auto;

		.pagetitle {
			.headline {
				background-color: #08a9b7;
				color: #fff !important;
				border-radius: 25px;
				height: 235px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.imggray {
			width: 921px;
			height: 488px;
			border-radius: 15px;
			background-color: rgba(135, 135, 135, 0.12);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.textgray {
			width: 1470px;
			height: 500px;
			border-radius: 15px;
			border: 2px solid rgba(135, 135, 135, 0.45);
			color: #51267d;
			font-size: 49px;
			line-height: 1.25;
			display: flex;
    	align-items: center;

			ul {
				list-style: none;
    		margin-top: 20px;
				margin-bottom: 0;
				margin-left: 60px;
				margin-right: 60px;
				li::before {
					content: "•";
					color: #08a9b7;
					display: inline-block; 
					width: 1em;
  				margin-left: -1em;
				}
				li {
					margin-bottom: 40px;
				}
			}
		}

		h3 {
			font-weight: bold;
			font-size: 53px;
			color: #08a9b7;
			text-align: center;
    	margin-top: 80px;
		}
	}


	
	.blackinfotext {
		margin-top: 40px;
		.info-content {
	    padding: 15px 120px;
			font-size: 36px;
			color: #3c3c3b !important;
			border-color: #3c3c3b;
		}
		.info-icon {
			fill: #3c3c3b;
		}
	}

	.footnote {
		font-size: 29px;
		line-height: 1.25;
		color: #3c3c3b;
		text-align: center;
    margin-top: 25px;
	}
  
}
</style>

<template>
  <div class="overview page-view">

		<div class="content-box">
			<div class="bodyarea">
				
				<div class="pagetitle">
					<img src="/img/globein_overview.png" width="800">
					<div class="headline">
						A multifaceted, tailored medical education programme, developed in close partnership with an expert steering
						<br>committee, to deliver bespoke education for healthcare professionals managing patients with haemoglobinopathies
					</div>
				</div>

				<div class="tablerow">
					<div class="col">
						<div class="colForum fade-in-bottom">
							<div class="title">EXPERT EDUCATIONAL MEETINGS</div>
							<div class="imgrow"><img src="/img/globe_forum.png" alt=""></div>
							<div class="bodytext">Internationally connecting and educating <br>specialist healthcare professionals on the key topics in haemoglobinopathies, whilst also providing an opportunity for best-practice sharing for those involved in the management of patients with haemoglobinopathies</div>
							<info-note color="#08a9b7" class="infoBottom">Please contact a Vertex medical representative to <br>find out more about the programme and events</info-note>
						</div>
					</div>
					<div class="col">
						<div class="colLocal fade-in-bottom">
							<div class="title">LOCAL EDUCATION</div>
							<div class="imgrow"><img src="/img/globe_local.png" alt=""></div>
							<div class="bodytext">Equipping healthcare professionals with knowledge and resources on the key topics <br>in haemoglobinopathies, tailored to <br>local-country service design, through <br>expert-led sessions and workshops</div>
							<info-note color="#51267d" class="infoBottom">Please contact a Vertex medical representative to <br>find out more about the programme and events</info-note>
						</div>
					</div>
					<div class="col">
						<div class="colInteract fade-in-bottom">
							<div class="title">WEBINARS & E-LEARNING</div>
							<div class="imgrow"><img src="/img/globe_interact.png" alt=""></div>
							<div class="bodytext">
								<p>Providing a repository of educational resources to support the multidisciplinary team involved in managing patients with haemoglobinopathies</p>
								<p>Educational resources include webinars, podcasts, talking head videos, e-learning modules, and interactive patient cases</p>
								<p>Click below to find out more and access the resources on our dedicated GlobeIN website</p>
							</div>
							<global-button class="btnFindOut" color="#ffffff" @click="onFindMoreClick()">Find out more</global-button>
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
  components: {},
	computed: {
		...mapState([
			"config",
			"ipc_renderer",
			"main_data",
		]),
	},
  data() {
    return {
      isQuestionPage: true,
			answeredIdx: null,
			userid: "user",
    };
  },
  created(){
  },
	beforeDestroy(){
	},
  mounted() {
  },
  methods: {
		onMenuBackClick() {
			this.$router.push({ name: "homepage" });
		},
		onMenuNextClick() {
			this.$router.push({ name: "podcasts" });
		},
		onFindMoreClick() {
			// console.log("onFindMoreClick()");
			this.$store.dispatch("saveActivity", {
				ec: 'Overview page',
				ea: 'click',
				el: "Find out more",
			});
			this.$router.push({ name: "interactive" });
		},

		
    
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.overview {
  // background-image: url('/img/p1_Page_02.jpg');
	// background-size: 100% 100%;
	// .content-box {
	// 	background-color: transparent;
	// }

	.tablerow {
		margin: 70px 50px 0;
		height: 690px;
		display: flex;
    gap: 40px;

		.col > div {
			height: 100%;
			border-radius: 50px;
		}
		.title {
			font-family: 'SourceSansPro-Semibold';
			font-size: 39px;
			line-height: 42px;
			color: #fff;
			height: 110px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.imgrow {
			text-align: center;
			img {
				height: 100px;
			}
		}
		.bodytext {
			font-size: 26px;
			line-height: 34px;
			color: #fff;
			text-align: center;
			padding: 30px 20px;
			
			p {
				margin-bottom: 12px;
			}
		}
		.infoBottom {
			position: absolute;
			bottom: 100px;
			width: 100%;
		}
	}

	.colForum {
		background-color: #08a9b7;
		animation-delay: .3s !important;
	}
	.colLocal {
		background-color: #51267d;
		animation-delay: .6s !important;
	}
	.colInteract {
		background-color: #d06578;
		animation-delay: .9s !important;
	}

	.btnFindOut {
		margin: auto;
		background-color: rgba(81, 38, 125, 0.9);
	}

}
</style>

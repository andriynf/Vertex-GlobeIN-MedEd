<template>
  <div class="community page-view">
		
		<div class="content-box">
			<div class="bodyarea">

				<div class="pagetitle">
					<img src="/img/globein_overview.png" alt="">
					<div class="headline">
						The GlobeIN programme provides accessible, expert-led content, designed to support you in providing the best possible care for your patients.
						<br>See below for testimonials on our programme from global experts, and for more information on how to access our available resources
					</div>
				</div>

				<div class="joinPool">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2125.6 953.23">
						<rect y="381.9" width="1152.57" height="571.33" rx="25" ry="25" style="fill: #868585; opacity: .15;"/>
						<rect x="1187.1" y="673.34" width="831.22" height="241.38" rx="25" ry="25" style="fill: #868585; opacity: .15;"/>
						<rect x="1369.29" y="212.53" width="756.31" height="386.82" rx="25" ry="25" style="fill: #868585; opacity: .15;"/>
						<rect x="444.41" width="1287.65" height="885.6" rx="25" ry="25" style="fill: #51267d;"/>
					</svg>
					<div class="content">
						<div class="title">
							<svg style="width: 135px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134.73 113.95">
								<path d="m120.8,89.87c-.52,0-1.04-.2-1.43-.58l-20.33-19.87h-6.44c-1.13,0-2.05-.92-2.05-2.05s.92-2.05,2.05-2.05h7.28c.54,0,1.05.21,1.43.58l17.44,17.05v-18c0-1.01.74-1.87,1.73-2.03,6.82-1.07,10.14-5.23,10.14-12.72V14.09c0-7.09-2.94-9.99-10.15-9.99h-50.47c-6.21,0-15.44,2.66-15.44,9.99v36.11c0,7.06,8.23,15.11,15.44,15.11h12.2c1.13,0,2.05.92,2.05,2.05s-.92,2.05-2.05,2.05h-12.2c-9.5,0-19.54-9.88-19.54-19.21V14.09c0-9.68,10.13-14.09,19.54-14.09h50.47c9.45,0,14.25,4.74,14.25,14.09v36.11c0,8.94-4.1,14.58-11.87,16.43v21.19c0,.82-.49,1.57-1.26,1.89-.26.11-.53.16-.8.16Z" style="fill: #fff;"/>
								<path d="m13.93,113.95c-.28,0-.57-.06-.84-.18-.74-.33-1.21-1.06-1.21-1.87v-21.19c-7.78-1.85-11.88-7.49-11.88-16.43v-36.11c0-8.76,6.5-14.41,16.57-14.41h25.56c1.13,0,2.05.92,2.05,2.05s-.92,2.05-2.05,2.05h-25.56c-2.93,0-12.47.74-12.47,10.31v36.11c0,7.49,3.32,11.65,10.14,12.72,1,.16,1.73,1.02,1.73,2.03v18.29l19.84-17.73c.37-.34.86-.52,1.37-.52h29.86c6.74,0,13.11-7.19,13.11-14.79v-6.91c0-1.13.92-2.05,2.05-2.05s2.05.92,2.05,2.05v6.91c0,9.88-8.2,18.89-17.21,18.89h-29.08l-22.67,20.26c-.38.34-.87.52-1.37.52Z" style="fill: #fff;"/>
							</svg>
							Join the community
						</div>
						<div class="gridballoons">
							<div class="comment animate__animated animate__zoomInDown red">Thank you…for an excellently designed, organised and executed meeting, which in this format was novel but very inspiring and enriching to me <span class="author">– Transplant expert, Germany</span></div>
							<div class="comment animate__animated animate__zoomInDown blue">Thank you for the excellent meeting we had in Hamburg. It was really interesting, interactive, friendly, and fruitful <span class="author">– Transplant expert, France</span></div>
							<div class="comment animate__animated animate__zoomInDown red">The presentations were very good <br><span class="author">– Webinar attendee</span></div>
							<div class="comment animate__animated animate__zoomInDown blue">…the recent GlobeIN meeting was one of the best meetings I have been to all year. Great conversations and educational content… <br><span class="author">– Haematology specialist, UK</span></div>
							<div class="comment animate__animated animate__zoomInDown red">Really good presentations. As a paediatric nurse, it was beneficial to have adult case presentation to help improve my knowledge and understanding <span class="author">– Webinar attendee</span></div>
						</div>
					</div>

				</div>

				<div class="accessPortal fade-in-bottom">
					<div style="margin-top: 350px;">Learn more about the GlobeIN programme on our website</div>
					<div class="touchbtn animate__animated animate__pulse animate__infinite animate__slow" @click="openWebsitePopup()"><img src="/img/btn_touchtolearn.png"/> </div>
				</div>

				<info-red-note class="bottomAlert">Please contact Vertex medical representative to find out more about the programme and events</info-red-note>

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
		]),
	},
  data() {
    return {
    };
  },
  created(){},
	beforeDestroy(){},
  mounted() {},
  methods: {
		openWebsitePopup(){
			this.$store.dispatch("saveActivity", {
				ec: 'Join the community page',
				ea: 'click',
				el: "Open website popup",
			});

			// this.$store.commit('set_isForcedBrowser', true);
			this.$store.commit('set_isForcedBrowser', false);

			this.$router.push({ name: "website" });
		},
		onMenuBackClick() {
			this.$router.push({ name: "podcasts" });
		},
		onMenuNextClick() {
			this.$router.push({ name: "website" });
		},
		
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.community {
  // background-image: url('/img/temp5.jpg');
	// .content-box {
	// 	background-color: rgb(255, 255, 255, 0.5);
	// }

	.joinPool {
		position: absolute;
		top: 735px;
		left: 236px;
		width: 2125px;
		.content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			.title {
				font-family: 'SourceSansPro-Semibold';
				font-size: 90px;
				color: #fff;
				text-align: center;
				margin-top: 60px;
				margin-left: 60px;
			}
			.gridballoons {
				display: flex;
    		flex-wrap: wrap;
				margin-top: 50px;
				margin-left: 90px;
    		margin-right: 50px;
				flex-direction: column;
				// justify-content: flex-start;
				// align-items: flex-start;
				height: 750px;

				.comment{
					position: relative;
					width: calc(50% - 26px);
    			margin: 13px;
					border-radius: 16px;
					box-shadow: rgba(0, 0, 0, 0.3) 4px 4px 5px;
					line-height: 55px;
					font-size: 37px;
					font-weight: bold;
					padding: 20px 90px;
					color: #fff;
					.author {
						font-weight: normal;
					}
					&::before{
						content: " ";
						background: url('/img/quotes_1.svg') no-repeat;
						position: absolute;
						top: 30px;
    				left: 12px;
						width: 58px;
						height: 49px;
					}
					&::after{
						content: " ";
						background: url('/img/quotes_2.svg') no-repeat;
						position: absolute;
						bottom: 8px;
    				right: 25px;
						width: 58px;
						height: 49px;
					}

					&:nth-child(1) { animation-delay: 1s; } 
					&:nth-child(2) { animation-delay: 1.2s; } 
					&:nth-child(3) { animation-delay: 1.4s; } 
					&:nth-child(4) { animation-delay: 1.6s; } 
					&:nth-child(5) { animation-delay: 1.8s; } 
				}
				.red {
					background-color: #d06578;
				}
				.blue {
					background-color: #08a9b7;
				}
			}
		}
	}
	
	.accessPortal {
		position: absolute;
		left: 2430px;
		top: 880px;
		width: 1128px;
		height: 765px;
		background-image: url('/img/bg_community_touch.svg');
		background-repeat: no-repeat;
		font-family: 'SourceSansPro-Semibold';
		font-size: 67px;
		line-height: 1.2;
		color: #fff;
		// border-radius: 25px;
		// background-color: #08a9b7;
		// opacity: 0.8;
		text-align: center;
		padding: 0 50px;
		animation-delay: 1s !important;
		.touchbtn {
			// font-family: 'SourceSansPro-Semibold';
			// font-size: 90px;
			// letter-spacing: -2px;
			margin-top: 25px;
			text-align: center;
		}
	}

	.bottomAlert {
		position: absolute;
		top: 1740px;
    margin: auto;
    left: 0;
    right: 0;
	}

  
}
</style>

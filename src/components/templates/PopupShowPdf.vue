<template>
	<div class="popup-showpdf container-fluid">
		<!-- <div class="titlebar">
			<h3>{{ properties.title }}</h3>
			<div 
				v-if="order_btn_show"
				class="btnPdfOrder"
				@click="onOrderNowClick()"
			>{{properties.order_btn.title}}</div>
		</div> -->

		<div class="pages-container">
			<iframe id="iframePDF" height="100%" width=100% :src="pdf_src" style="border:0;" @load="onFileLoaded()" ></iframe>
		</div>

		
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
				pdf_src: null,
				order_btn_show: false,
			};
		},
		created() {
			this.order_btn_show = (this.properties.order_btn != null);

			let str = this.properties.media_url;
			if (str !== null) {
				if (str.indexOf('http') !== -1) {
					// url
				} else {
					// file
					// str = `/content/${str}`;
				}
				// this.pdf_src = `${str}#view=FitH&toolbar=0`;
				// this.pdf_src = `./lib/pdfjs-2.5.207-dist/web/viewer.html?file=${str}`;

        console.log("this.properties=", this.properties.media_url);
        let zoomval = '';
        switch (this.properties.media_url) {
          case "/media/pdf/Rheumatoid Arthristis/EULAR Unmet need infographic_D4.pdf":
            zoomval = "#zoom=55%";
            break;
          case "/media/ZEJULA HCP PRIMA DIGITAL Leave Behind 2021.pdf":
          case "/media/ZEJULA HCP PRIMA BRCAmut DIGITAL Flashcard 2021.pdf":
            zoomval = "#zoom=80%";
          break;
          case "/media/ZEJULA HCP PRIMA HRd Digital Leave Behind Landscape 2021.pdf":
            zoomval = "#zoom=100%";
          break;
          case "/media/ZEJULA HCP NOVA 30 Day Quick Hit DIGITAL  2021.pdf":
          case "/media/ZEJULA HCP QUADRA DIGITAL Leave Behind 2021.pdf":
            zoomval = "#zoom=70%";
          break;
        }
        zoomval += '&textlayer=off';
        zoomval += '&r='+Math.random();
        

				this.pdf_src = `./lib/pdfjs-2.13.216-dist/web/viewer.html?file=${str}`+zoomval;
			}

			// window.addEventListener("resize", this.resizeEventHandler);
		},
		destroyed() {
			// window.removeEventListener("resize", this.resizeEventHandler);
		},
		mounted(){
			// window.dispatchEvent(new Event("resize"));
			
		},
		methods: {
			resizeEventHandler(){
				// console.log("resizeeeee");
			},
      onFileLoaded(){
        console.log("file loaded");
        // var myIframe = document.getElementById('iframePDF');
        
        document.getElementById('iframePDF').contentWindow.document.getElementById('viewerContainer').scrollTo(0,0);

        setTimeout(() => {
          document.getElementById('iframePDF').contentWindow.document.getElementById('viewerContainer').scrollTo(0,0);
          // console.log(myIframe);
          // myIframe.contentWindow.scrollTo(0,0);
        }, 500);
      },
			onOrderNowClick(){
				// console.log("showPdf order_btn", this.properties.order_btn);
        
        if (this.properties.order_btn.ga) {
          // console.warn("GA EXIST", this.properties.order_btn.ga);
          this.$store.dispatch('store_ga_event', this.properties.order_btn.ga);
        }

				if(this.properties.order_btn.url != ""){
					window.open(this.properties.order_btn.url, '_blank');
				}

				
			}
		},
	};
</script>

<style lang="scss">
	.popup-showpdf {
		// color: var(--primary);
		padding: 0;
		// width: 100%;
		// height: 100%;
		height: 80vh;
		line-height: 0;
		display: flex;
    flex-direction: column;
		// background-color: rgba($color: black, $alpha: 0.7);

		.pages-container {
			height: 100%;
			// overflow: hidden;
		}
		.titlebar {
			background-color: #000;
			min-height: 46px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			h3 {
				color: #ffffff;
				margin: 10px 20px;
				// text-transform: uppercase;
				// font-weight: bold;
				// position: absolute;
			}
			.btnPdfOrder {
				color: #ffffff;
				font-size: 22px;
				font-family: 'Roboto';
				cursor: pointer;
				text-decoration: underline;
				margin-right: 30px;
				white-space: nowrap;
			}

		}
		
		
	}
</style>

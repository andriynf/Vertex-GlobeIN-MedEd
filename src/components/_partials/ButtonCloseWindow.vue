<template>
	<div v-if="is_electron" class="btn-close-window" @click="closeWindow()"></div>
</template>
<script>
export default {
	name: 'button-close-window',
	data() {
		return {
			intervalClose: null,
			closeCount: 0
		};
	},
	computed: {
		is_electron() {
			return this.$store.state.is_electron;
		},
	},
	methods: {
		closeWindow() {
			if (this.is_electron) {
        clearTimeout(this.intervalClose);
				this.intervalClose = setTimeout(() => {
					this.closeCount = 0;
				}, 500);
				this.closeCount++;
				if (this.closeCount >= 3) {
					this.closeCount = 0;
					const remote = window.require("electron").remote;
					remote.getCurrentWindow().close();
				}
			}
		},
	}
}
</script>
<style lang="scss">
.btn-close-window {
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(255, 0, 0, 0);
	width: 50px;
	height: 50px;
	z-index: 9999;
}
</style>

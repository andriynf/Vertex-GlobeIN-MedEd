<template>
  <div id="app">
		<transition 
      enter-active-class="animate__animated animate__faster animate__fadeIn" 
      leave-active-class="animate__animated animate__faster animate__fadeOut" 
      mode="out-in"
      appear
    >
			<router-view :key="'view_' + $route.params.id" class="page-view"/>
		</transition>
		
  </div>
</template>

<script>
	export default {
		created () {
			// reset previous url
			if (this.$router.currentRoute.value.name != 'loading') {
				this.$router.push({ name: "loading" });
			}
		},
	}
</script>

<style lang="scss">
// @import "../../node_modules/bootstrap/scss/bootstrap.scss";
@import '~bootstrap';

body {
  background-color: #1e1e1e;
	// overflow: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  > .page-view {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>

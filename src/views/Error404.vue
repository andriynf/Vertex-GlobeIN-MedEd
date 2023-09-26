<template>
	<div class="error404">
		<div class="col-md-6">
			<h1>404</h1>
			<h2>Sorry, the page you are looking for could not be found.</h2>
			<button
				type="button"
				class="btn btn-primary"
				@click="$router.push({ name: 'attract' })"
			>
				GO HOME
			</button>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss">
	.error404 {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: rgba($color: #333, $alpha: 0.7);
		h1 {
			position: relative;
			font-size: 140px;
			margin-bottom: 30px;
			color: var(--secondary);
			&::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 80px;
				height: 4px;
				background-color: var(--secondary);
			}
		}
		h2 {
			margin-bottom: 30px;
			color: white;
		}
		button {
			min-width: 190px;
		}
	}
</style>

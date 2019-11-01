<template>
  <div id="app">
		<MHeader />
		<MTab />
		<router-view/>
  </div>
</template>

<script>
	import MHeader from '@/components/m-header/index.vue'
	import MTab from '@/components/m-bar'
	export default{
		name:'App',
		components:{
			MHeader,
			MTab
		}
	}
</script>

<style lang="stylus" scoped>
	#app
		position fixed
		top 0
		height 100%
		width 100%
		overflow hidden
</style>

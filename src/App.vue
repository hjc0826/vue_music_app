<template>
  <div id="app">
		<MHeader />
		<MTab />
		<!-- 播放组件 -->
		<MPlayer></MPlayer>
		<router-view/>
  </div>
</template>

<script>
	import MHeader from '@/components/m-header/index.vue'
	import MTab from '@/components/m-bar'
	import MPlayer from '@/components/m-player'
	export default{
		name:'App',
		components:{
			MHeader,
			MTab,
			MPlayer
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

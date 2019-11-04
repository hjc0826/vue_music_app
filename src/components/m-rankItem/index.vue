<template>
	<div class="rank_item">
		<div class="icon">
			<img :src="itemData.coverImgUrl" alt="">
		</div>
		<ul class="song_list">
			<li v-for="(unit,index) in itemData.tracks.slice(0,3)" :key="unit.id">
				<span>{{index + 1}}.</span>
				<span>{{unit.name}} - {{unit.ar[0].name}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'MRankItem',
		props:{
			itemData : Object
		}
	}
</script>

<style lang="stylus" scoped>
	.rank_item
		margin 0 10px
		padding 3px 0
		display flex
		height 100px
		border-bottom 1px solid #e4e4e4
		.icon
			flex 0 0 100px
			width 100px
			height 100px
			img
				border-radius 3px
				width 100%
		.song_list
			flex 1
			flex-direction column
			justify-content center
			padding 0 20px
			height 100px
			overflow hidden
			font-size 12px
			color #2E3030
			li
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
				line-height 30px
</style>

<template>
	<div class="item" @click="jumpRecommend">
		<div class="icon">
			<div class="gradients"></div>
			<img alt="" v-lazy="itemData.picUrl ? itemData.picUrl : itemData.song.album.picUrl">
		</div>
		<p class="play_count" v-if="!(itemData.type)">
				<i class="iconfont icon-erji"></i>
				{{itemData.trackCount}}W
		</p>
		<div class="text">
			<p class="name">
				{{itemData.name}}
			</p>
			<p class="anchor">
				{{itemData.type ? itemData.song.artists[0].name : ''}}
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:'MSongItem',
		props:{
			itemData : [Object]
		},
		mounted(){
			
		},
		methods:{
			jumpRecommend(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.item
		width 33.33%
		box-sizing border-box
		padding 0 1%
		display flex
		flex-direction column
		position relative
		.icon
			position relative
			width 100%
			margin-bottom 5px
			.gradients
				position absolute
				top 0
				width 100%
				height 35px
				border-radius 3px
				background linear-gradient(rgba(109,109,109,0.4), rgba(255,255,255,0))
			img
				border-radius 3px
				width 100%
				height 100%
		.play_count
			position absolute
			top 5px
			right 8px
			font-size 8px
			color #f1f1f1
			i
				font-size 7px
		.text
			text-align left
			height 40px
			line-height 16px
			overflow hidden
			margin-bottom 10px
			font-size 11px
			float left
			.name
				overflow hidden
				white-space nowrap
				text-overflow ellipsis
</style>

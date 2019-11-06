<template>
	<div class="song_menu_item">
		<p class="count">
			{{index + 1}}
		</p>
		<div class="content">
			<h2 class="name">
				{{itemData.name}}
			</h2>
			<p class="desc">
				{{itemData.ar[0].name}}
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:'MSongMenuItem',
		props:{
			itemData : [Object],
			index : [Number]
		}
	}
</script>

<style lang="stylus" scoped>
	.song_menu_item
		display flex
		align-items center
		box-sizing border-box
		height 60px
		border-bottom 1px solid #e4e4e4
		&:last-child
			border none
		.count
			width 50px
			text-align center
			color #757575
		.content
			flex 1
			line-height 20px
			overflow hidden
			.name
				margin-top 4px
				width 80%
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
				color #2E3030
			.desc
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
				font-size 12px
				color #757575
				width 80%
</style>

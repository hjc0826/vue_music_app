<template>
	<div class="tab">
		<router-link to='/recommend' tag="div" class="tab_item"><span>推荐</span></router-link>
		<router-link to='/rank' tag="div" class="tab_item"><span>排行</span></router-link>
		<router-link to='/songer' tag="div" class="tab_item"><span>歌手</span></router-link>
	</div>
</template>

<script>
	export default{
		name: 'MTab'
	}
</script>

<style lang="stylus" scoped>
	.tab
		display flex
		line-height 44px
		height 44px
		font-size 14px
		width 100%
		background-color #d44439
		position relative
		z-index 101
		.tab_item
			flex 1
			text-align center
			color #e4e4e4
			span
				padding-bottom 3px
		.router-link-active span
			font-weight bold
			color #f1f1f1
			border-bottom 2px solid #f1f1f1
</style>

<template>
  <div class="m_header_body">
      <h1 class="text">
        HMUSICBYC
      </h1>
      <div class="mine">
        <i class="iconfont icon-liebiao1"></i>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
      </div>
  </div>
</template>

<script>
  export default {
    name:'MHeader',
	data(){
		return{
			
		}
	}
  }
</script>

<style lang="stylus" scoped>
.m_header_body
	height 44px
	width 100%
	background-color #d44439
	text-align center
	position relative
	z-index 100
	.text
		line-height 44px
		font-weight bold
		color #f1f1f1
		letter-spacing 3px
		margin 0
	.mine
		position absolute
		left 0
		top -1.5px
		i
			display block
			padding 11px
			font-size 22px
			color #f1f1f1
	.search
		position absolute
		right 0
		top 2px
		i
			display block
			padding 12px
			font-size 18px
			color #f1f1f1
</style>

<template>
	<div class="recommend">
		<div class="recommend_content">
			<div class="wrapper" ref="wrapper">
				<div class="recommend_list">
					<h1 class="title">推荐歌单</h1>
						<ul>
							<MSongItem v-for="item in personalizedData" :key="item.id" :itemData="item" />
						</ul>
					<div class="recommend_new_song">
						<h1 class="title">推荐歌曲</h1>
						<ul>
							<MSongItem v-for="item in newsongData" :key="item.id" :itemData="item" />
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MSongItem from '@/components/m-songItem'
	import {personalized,newsong} from '@/api/recommend.js'
	import BScroll from 'better-scroll'
	export default{
		name:'Recommend',
		data(){
			return{
				// 推荐歌单
				personalizedData : '',
				newsongData : ''
			}
		},
		mounted() {
			personalized().then( res => {
				this.personalizedData = res.result
			})
			newsong().then( res => {
				this.newsongData = res.result
			})
			 this.$nextTick(() => {
				//$refs绑定元素
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.wrapper, {
					//开启点击事件 默认为false
					click:true
				})
				// console.log(this.scroll)
				}else if(!this.$refs.wrapper){
					return
				}
				else{
					this.scroll.refresh()
				}
			  })
		},
		methods:{
			
		},
		components:{
			MSongItem
		}
	}
</script>

<style lang="stylus" scoped>
	.recommend
		position fixed
		width 100%
		top 88px
		bottom 0
		.recommend_content
			width 100%
			height 100%
			overflow hidden
			.wrapper
				background linear-gradient(#d44439, #d44439 50%, white 50%)
				height 100%
				width 100%
				overflow hidden
				.recommend_list
					background-image linear-gradient(#d44439, #d44439 8%, white 8%)
					position relative
					box-sizing border-box
					text-align center
					width 100%
					.title
						height 65px
						line-height 65px
						padding-left 1.5%
						text-align left
						font-size 14px
						font-weight bold
						color #2E3030
					ul
						display flex
						flex-wrap wrap
						justify-content space-around
					.recommend_new_song
						width 100%
						box-sizing border-box
						margin-top -20px
						ul
							display flex
							flex-wrap wrap
							justify-content flex-start
							
</style>

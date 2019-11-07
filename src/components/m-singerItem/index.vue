<template>
	<div class="singerItem_body">
		<div class="header" :style="{background : 'rgba(212, 68, 57,' + colorValue + ')'}">
			<div class="back" @click="$router.go(-1)">
				<i class="iconfont icon-icon-arrow-left2"></i>
			</div>
			<div class="text">
				<h1 class="title">{{singName}}</h1>
			</div>
		</div>
		<div class="list">
			<!-- 滚动内容 -->
				<div class="wrapper" ref="wrapper">
					<div class="slide">
						<div class="bg_image" :style="bgStyle" ref="$img">
							<!-- 遮罩层 -->
							<div class="fitter"></div>
							<div class="text">
								<h2 class="list_title">{{artistInfo.name}}</h2>
								<p class="update">
									
								</p>
							</div>
						</div>
						<div class="song_list_wrapper">
							<div class="play_button">
								<i class="iconfont icon-bofang2"></i>
								<span class="text">播放全部</span>
								<span class="count">(共{{artistListData.length}}首)</span>
							</div>
							<div class="song_list">
								<ul>
									<MSongMenuItem v-for="(item,index) in artistListData" :key="item.id" :itemData="item" :index="index"/>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	import MSongMenuItem from '@/components/m-songMenuItem'
	import BScroll from 'better-scroll'
	export default{
		name: 'SingerItem',
		components:{
			MSongMenuItem,
			singerSid : {}
		},
		props:{
			artistInfo: [Object],
			artistListData : [Array]
		},
		data(){
			return({
				// 配置项
				imgHeight : '',
				colorValue : 0,
				singName : '歌手'
			})
		},
		methods:{
			// 根据卷东芝改变header背景颜色
			scrollChangeBac(e){
				let scrollValue = Math.abs(e.y)
				if(scrollValue <= 245){
					this.singName = '歌手'
					this.colorValue=scrollValue/this.imgHeight
				}else{
					this.colorValue = 1
					this.singName = this.artistInfo.name
				}
			}
		},
		mounted(){
				this.$nextTick(()=>{
				this.imgHeight = this.$refs.$img.clientWidth * 0.75 - 15
					var scroll = new BScroll(this.$refs.wrapper,{
						scrollY: true,
						click: true,
						probeType : 3
					})
				scroll.on('scroll', this.scrollChangeBac)
			})
		},
		computed:{
			bgStyle () {
				return `background-image: url(${this.artistInfo.coverImgUrl ? this.artistInfo.coverImgUrl : this.artistInfo.img1v1Url})`
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.singerItem_body
		position fixed
		top 0
		bottom 0
		width 100%
		background #F2F3F4
		transition all 0 ease 0.5s
		&.leaveout
			right -100vh
		.header
			position fixed
			top 0
			width 100%
			height 44px
			color #fff
			z-index 200
			.back
				position absolute
				top 8px
				left -4px
				i
					padding 5px 10px
					font-size 24px
			.text
				position absolute
				left 38px
				line-height 44px
				font-size 16px
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
		.list
			position fixed
			top 0
			bottom 0
			width 100%
			background #f2f3f4
			// overflow auto
			.wrapper
				width 100%
				height 100%
				.bg_image
					position relative
					width 100%
					height 0
					padding-top 75%
					transform-origin top
					background-size cover
					background-position 0 30%
					.fitter
						position absolute
						top 0
						left 0
						width 100%
						height 100%
						background black
						opacity .2
					.text
						position absolute
						width 80%
						height 40px
						bottom 40px
						left 20px
						color #fff
						.list_title
							position absolute
							bottom 0
							font-size 17px
							line-height 18px
							font-weight bold
							letter-spacing 1px
						.update
							position absolute
							top 45px
							left 7px
							line-height 14px
							font-size 11px
				.song_list_wrapper
					padding 41px 0 20px 0
					border-radius 10px
					position relative
					top -20px
					background #F2F3F4
					.play_button
						position absolute
						top 0px
						display box
						display flex
						align-items center
						width 100%
						height 40px
						padding-left 16px
						border-bottom 1px solid #e4e4e4
						i
							font-size 24px
							color #2E3030
							padding-right 14px
						.text
							font-size 16px
						.count
							font-size 14px
							color #757575
</style>

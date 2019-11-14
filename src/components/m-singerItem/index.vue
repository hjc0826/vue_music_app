<template>
	<div class="singerItem_body">
		<div class="header" :style="{background : 'rgba(212, 68, 57,' + colorValue + ')'}">
			<div class="back" @click="openPlay">
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
							<div class="play_button" @click="playAllSongList">
								<i class="iconfont icon-bofang2"></i>
								<span class="text">播放全部</span>
								<span class="count">(共{{artistListData.length}}首)</span>
							</div>
							<div class="song_list">
								<ul>
									<MSongMenuItem v-for="(item,index) in artistListData" :itemData="item" :index="index"
									@click.native = "play(item)"/>
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
	import Bus from '@/assets/bus'
	import BScroll from 'better-scroll'
	import {SongMusci} from '@/api/song.js'
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
		mounted() {
			
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
			},
			// 播放弹出播放器 开始播放++++++++++++++++++
			play(item){
				this.$store.state.isMiniPlay = false
				this.$store.state.isMiniList = false
				// 兄弟组件传递数据
				this.sendSongData(item)
				// 将点击歌曲加入到播放列表中
				this.$store.state.playList.push(item)
				// 打开播放器
				this.$store.commit('playSwitch')
				// 播放音乐
				this.playmusic(item)
			},
			// 播放音乐
			playmusic(item){
				// SongMusci({
				// 	id : mid
				// }).then(res=>{
				// 	console.log('开始播放')
				// })
				// 调用兄弟组件方法 定义自定义方法 并且发布到订阅器
				Bus.$emit('borplay',item)
			},
			// 回退
			openPlay(){
				this.$router.go(-1)
			},
			// 发送数据函数
			sendSongData(item){
				Bus.$emit('transportData',item)
			},
			// 播放全部歌曲
			playAllSongList(){
				this.$store.state.playList = this.artistListData
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

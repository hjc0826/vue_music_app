<template>
	<div class="player">
		<div class="play_view" v-show="this.$store.state.isPlay">
			<!-- 遮罩 -->
			<div class="background">
				<div class="fitter"></div>
			</div>
			<div class="header">
				<div class="back" @click="openMini">
					<i class="iconfont icon-bottom"></i>
				</div>
				<h1 class="title">
					Z5-DarkSide
				</h1>
				<h2 class="subtitle">
					Z5
				</h2>
			</div>
			<div class="middle">
				<div class="middle_one">
					<div class="cdwrapper">
						<div class="cd_play">
							<img src="http://p1.music.126.net/XEW4XCLgFgL7R_grEMHJRw==/109951164475468266.jpg" alt="" class="img">
						</div>
					</div>
				</div>
				<div class="middle_two">
					
				</div>
			</div>
			<div class="bottom">
				<div class="progress_wrapper">
					<span class="time time_l">
						0.00
					</span>
					<div class="progress_bar_wrapper">
						<div class="progress_bar">
							<div class="bar_inner" 
										@touchstart.prevent = "progressTouchStart"
										@touchmove.prevent = "progressTouchMove">
								<!-- 长条 -->
								<div class="progress" ref='progress'>
									<div class="progress_btn_wrapper" >
										<div class="progress_btn"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<span class="time time-r">
						12.00
					</span>
				</div>
				<div class="opeartor">
					<div class="icon i-left">
						<i class="iconfont icon-shunxubofang mode"></i>
					</div>
					<div class="icon i-left roll">
						<i class="iconfont icon-kuaijin"></i>
					</div>
					<div class="icon i-center">
						<i class="iconfont icon-bofang2"></i>
					</div>
					<div class="icon i-right">
						<i class="iconfont icon-kuaijin"></i>
					</div>
					<div class="icon i-right">
						<i class="iconfont icon-icon-test"></i>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 迷你播放按钮 -->
		<div class="mine_play" v-show="this.$store.state.isMiniPlay">
			<div class="icon" @click="closeMiniOpenPlay">
				<img src="http://p1.music.126.net/XEW4XCLgFgL7R_grEMHJRw==/109951164475468266.jpg" alt="">
			</div>
			<div class="text">
				<h2 class="name">
					Z5-DarkSide
				</h2>
				<p class="desc">
					Z5
				</p>
			</div>
			<div class="control">
				<i class="iconfont icon-zanting1 play"></i>
			</div>
			<div class="control" @click="popList">
				<i class="iconfont icon-liebiao"></i>
			</div>
		</div>
		<strong></strong>
		<!-- 播放mini列表 -->
		<transition>
				<div class="mine_play_list" :class="{shandow:isShandow}" v-show="this.$store.state.isMiniList">
					<div class="list_wrapper">
						<div class="list_header">
							<h1 class="title">
								<i class="iconfont icon-shunxubofang"></i>
								<span class="text">单曲循环</span>
								<span class="delete">
									<i class="iconfont icon-lajitong1"></i>
								</span>
							</h1>
						</div>
						<div class="list_content">
							<ul>
								<div>1</div>
								<div>1</div>
								<div>1</div>
								<div>1</div>
								<div>1</div>
								<div>1</div>
								<div>1</div>
								<div>1</div>
								<div>1</div>
								<div>1</div>
							</ul>
						</div>
						<div class="list_close" @click="closeList"><span>关闭</span></div>
					</div>
				</div>
		</transition>
		
	</div>
</template>

<script>
	import Bus from '@/assets/bus'
	export default{
		name:'MPlayer',
		data(){
			return({
				slideInfo : {
					startX:'',
					width : '',
					precent:''
				},
				SongInfo:{},
				isShandow : false
			})
		},
		beforeCreate(){
			this.acceptData()
		},
		mounted(){
			this.slideInfo.width =  document.querySelector('.bar_inner').clientWidth
		},
		methods:{
			progressTouchStart(e){
				// 起始位置
				this.slideInfo.startX = e.touches[0].clientX
				this.slideInfo.precent = (e.touches[0].clientX -70)/this.slideInfo.width
				this.setProcessLength(this.slideInfo.precent)
			},
			progressTouchMove(e){
				this.slideInfo.precent = (e.touches[0].clientX -70)/this.slideInfo.width
				e.touches[0].clientX-70>this.slideInfo.width	?	this.setProcessLength(1)
																:	this.setProcessLength(this.slideInfo.precent)
				
			},
			// 设置播放条长度
			setProcessLength(precent){
				this.$refs.progress.style.width = precent * this.slideInfo.width + "px"
			},
			// 关闭play播放打开mini播放
			openMini(){
				this.$store.commit('playSwitch')
				this.$store.state.isMiniPlay = true
			},
			closeMiniOpenPlay(){
				this.$store.state.isMiniPlay = false
				this.$store.commit('playSwitch')
			},
			// 接受数据
			acceptData(){
				Bus.$on('transportData',(item)=>{
					console.log(item)
					this.SongInfo = item
				})
			},
			popList(){
				this.$store.state.isMiniList = true
				setTimeout(()=>{
					this.isShandow = true
				},400)
			},
			closeList(){
				this.isShandow = false
				setTimeout(()=>{
					this.$store.state.isMiniList= false
				},100)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.v-enter{
		transform: translateY(100vh);
		opacity : 0
	}
	.v-leave-to{
		transform: translateY(100vh);
		opacity : 0
	}
	/* v-enter-active【入场动画的时间段】 */
	/* v-leave-active【离场动画的时间段】 */
	.v-enter-active, .v-leave-active {
		transition: 0.5s all ease;
	}
	@keyframes rotation
	{
	from {transform : rotate(0deg)}
	to {transform:rotate(360deg)}
	}
	.play_view
		position fixed
		top 0
		bottom 0
		left 0
		right 0
		width 100%
		background #F2F3F4
		z-index 200
		.background
			position absolute
			left -50%
			top -50%
			width 300%
			height 300%
			z-index -1
			opacity 0.6
			filter blur(30px)
			.fitter
				position absolute
				width 100%
				height 100%
				background black
				opacity 0.6
		.header
			position relative
			margin-bottom 25px
			.back
				position absolute
				top 0
				left 6px
				z-index 50
				i
					display block
					padding 5px 9px
					font-size 35px
					color #f1f1f1
			.title
				width 70%
				margin 0 auto
				padding-top 10px
				line-height 20px
				text-align center
				text-overflow ellipsis
				font-size 18px
				font-weight bold
				white-space nowrap
				color #f1f1f1
			.subtitle
				width 70%
				margin 0 auto
				line-height 20px
				text-align center
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
				font-size 12px
				color #f1f1f1
		.middle
			display flex
			align-items center
			position fixed
			top 80px
			bottom 170px
			white-space nowrap
			font-size 0
			width 100%
			.middle_one
				position relative
				display inline-block
				vertical-align top
				height 0
				padding-top 80%
				width 100%
				.cdwrapper
					position absolute
					left 10%
					top 0
					width 80%
					height 100%
					.cd_play
						width 100%
						height 100%
						box-sizing border-box
						border 15px solid rgba(255,255,255,0.1)
						border-radius 50%
						position relative
						animation rotation 8s linear infinite
						.img
							border-radius 50%
							width 100%
							height 100%
							position absolute
							left 0
							top 0
		.bottom
			position absolute
			bottom 50px
			width 100%
			.progress_wrapper
				display flex
				align-items center
				width 80%
				margin 0 auto
				padding 10px 0
				.time
					width 30px
					font-size 11px
					color #F1F1F1
					line-height 30px
				.time_l
					text-align left
				.time-r
					text-align right
				.progress_bar_wrapper
					flex 1
					.progress_bar
						height 30px
						.bar_inner
							position relative
							top 13px
							height 4px
							background rgba(0,0,0,0.3)
							.progress
								position relative
								height 100%
								background #D44439
								width 0
							.progress_btn_wrapper
								position absolute
								right -15px
								top -13px
								width 30px
								height 30px
								.progress_btn
									position relative
									top 7px
									left 7px
									box-sizing border-box
									width 16px
									height 16px
									border 5px solid #f1f1f1
									border-radius 50%
									background #d44439
			.opeartor
				display flex
				align-items center
				.roll
					transform: rotate(-180deg)
					text-align left !important
				.icon
					flex 1
					color #F1F1F1
					.mode
						font-size 28px
					i
						font-size 32px
				.i-left
					text-align right
				.i-right
					text-align left
				.i-center
					padding 0 20px
					text-align center
					i
						font-size 50px
	.mine_play
		position fixed
		bottom 0
		left 0
		height 60px
		background rgba(255,255,255,0.85)
		z-index 300
		display flex
		align-items center
		width 100%
		.icon
			width 40px
			padding 0 10px 0 20px
			img
				animation rotation 8s linear infinite
				width 100%
				border-radius 50%
		.text
			display flex
			justify-content center
			flex-direction column
			flex 1
			overflow hidden
			.name
				margin-bottom 2px
				line-height 14px
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
				font-size 14px
				color #2E3030
			.desc
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
				font-size 11px
				color #2E3030
		.control
			width 30px
			padding 0 10px
			color rgba(19,19,19,0.6)
			.play
				font-size 38px
	.mine_play_list
		position fixed
		top 0
		bottom 0
		width 100%
		// background  rgba(0,0,0,0.3)	
		z-index 800
		&.shandow
			background  rgba(0,0,0,0.3)	
		.list_wrapper
			position absolute
			left 0
			bottom 0
			width 100%
			border-radius 8px
			background #F2F3F4
			.list_header
				position relative
				padding 20px 30px 10px 20px
				.title
					display flex
					align-items center
					i
						color #757575
						font-size 20px
						margin-right 10px
					.text
						flex 1
						font-size 14px
						color #2E3030
					.delete
						position relative
						i
							font-size 16px
							color #757575
			.list_content
				max-height 240px
				overflow hidden
			.list_close
				text-align center
				line-height 50px
				background #F2F3F4
				font-size 16px
				color #2E3030
</style>

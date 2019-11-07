<template>
	<div class="singer">
		<div class="listView">
			<div class="wrapper" ref="wrapper">
				<ul id="zone">
					<li v-for="(unit,index) in sortBy" :key="unit" ref="$box" :class="auto_fixed">
						<h4>{{unit}}</h4>
						<ul>
							<li v-for="(item,index) in artists[unit]" :key="item.id" @click="jumpToDetail(item.id)">
								<img v-lazy="item.img1v1Url" alt="" class="head_photo">
								<span class="name">{{item.name}}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="indexList">
				<ul>
					<li v-for="(item,index) in sortBy" :key="index"  ref="$index" @click="jumpScroll(index)">{{item}}</li>
				</ul>
			</div>
		</div>
		<transition>
			<router-view :artistInfo="artistInfo" :artistListData="artistListData"/>
		</transition>
	</div>
</template>

<script>
	import { getArtistsList ,getArtistsDetail} from '@/api/singer.js'
	import BScroll from 'better-scroll'
	import pinyin from 'pinyin'
	export default{
		name:'Singer',
		data(){
			return({
				// 渲染数据
				artists : {},
				// 元数据
				data : [],
				scroll:"",
				// 索引值排序数组
				sortBy:[],
				auto_fixed:{
					fixed : false
				},
				// 盒子高度
				boxTop : Number,
				//区间数组
				heightArr:[],
				//当前滚动距离
				offsetHeight:"",
				artistInfo :'',
				artistListData :''
			})
		},
		mounted(){
			// 调用接口
			getArtistsList().then( res => {
				this.data = res.artists
				// 渲染视图修改数据结构
				this.getartistsData()
				// 绑定滚动事件
				this.getPositionTop()
				this.$nextTick(()=>{
					this.$refs.wrapper.addEventListener("scroll",this.handleScrollsss)
				})
			})
			
			
		},
		methods:{
			// 渲染视图修改数据结构
			getartistsData(){
				this.data.forEach((item,index)=>{
					var reg =  /^[a-zA-Z\/]/
					let pin = this.getPinyinFirst(item.name.substring(0,1))
					!reg.test(pin) ? !this.artists[pin]?this.artists["#"] = [item]:this.artists[pin].push(item)
								   : !this.artists[pin]?this.artists[pin] = [item]:this.artists[pin].push(item)
					// 将sortBy数组中加入索引值
					if(this.sortBy.indexOf(pin)==-1){
						!reg.test(pin) ? this.sortBy.push("#"): this.sortBy.push(pin)
					}
				})
				// 数组排序
				this.sortBy.sort(function(one,two){
					if(one > two){
						return 1
					}else{
						return -1
					}
				})
				this.sortBy.push(this.sortBy.shift());
			},
			// 返回拼音首字母
			getPinyinFirst(char){
				const firstLetter = pinyin(char,{
					style : pinyin.STYLE_FIRST_LETTER
				})
				return firstLetter[0][0].toUpperCase()
			},
			// 绑定滚动事件
			getPositionTop(){
				this.$nextTick( () => {
					// 计算高度区间数组
					this.$refs.$box.forEach( item => {
						this.heightArr.push(parseInt(item.offsetTop))
					})
				})
			},
			// 滚动事件
			handleScrollsss(){
				this.offsetHeight = this.$refs.wrapper.scrollTop;
				// console.log(this.offsetHeight);
				//确定滚动到了哪个index
				var index = this.heightArr.findIndex(this.checkIndex);
				console.log(index);
				this.$refs.$box.forEach( item => {
					item.className = " ";
				})
				this.$refs.$index.forEach( item => {
					item.className = " ";
				})
				this.$refs.$box[index].className = "fixed";
				this.$refs.$index[index].className = "current"
			},
			checkIndex(item,index,arr){
				return this.offsetHeight >= item && this.offsetHeight < arr[index+1];
			},
			// 滚动到指定位置
			jumpScroll(index){
				// console.log(this.$refs.$box[index].scrollTop)
				this.$refs.wrapper.scrollTop = this.heightArr[index]
			},
			// 打开详情页面
			jumpToDetail(sid){
				this.$refs.$box.forEach( item => {
					item.className = " ";
				})
				// 获取歌单列表数据
				getArtistsDetail({
					id : sid
					}).then(res => {
					this.artistInfo = res.artist
					this.artistListData = res.hotSongs
					this.$router.push("/singer/" + sid)
				})
			}
		},
		}
</script>

<style lang="stylus" scpoed>
	.v-enter{
		transform: translateX(100vw);
		opacity: 0;
	}
	.v-leave-to{
		transform: translateX(-100vw);
		opacity :0
	}
	/* v-enter-active【入场动画的时间段】 */
	/* v-leave-active【离场动画的时间段】 */
	.v-enter-active, .v-leave-active {
		transition: 0.5s all ease;
	}
	.singer
		position fixed
		top 88px
		bottom 0
		width 100%
		.listView
			position relative
			width 100%
			height 100%
			overflow hidden
			background #F2F3F4
			.wrapper
				width 100%
				height 100%
				overflow auto
				li.fixed
					h4
						position fixed
						top 88px
						height 20px
						width 100%
						z-index 40
						background gray
						opacity 1
				ul
					li
						h4
							height 20px
							line-height 20px
							padding-left 12px
							font-size 11px
							color #fff
							background gray
							opacity 0.8
						ul
							li
								display flex
								align-items center
								padding 5px 0
								margin 0 5px
								border-bottom 1px solid #e4e4e4
								.head_photo
									width 50px
									height 50px
									border-radius 3px
								.name
									margin-left 20px
									color #2E3030
									font-size 14px
							&:last-child
								border none
								margin-bottom 10px
			.indexList
				position absolute
				right 3px
				width 20px
				text-align center
				border-radius 3px
				font-family Helvetica
				transform translateY(-50%)
				top 50%
				ul
					list-style none
					li
						padding 5px 5px
						line-height 1
						font-size 11px
						font-weight bold
						color #757575
					& .current
						color #d44439
</style>

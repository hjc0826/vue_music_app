<template>
	<div class="rank">
		<div class="rank_list">
			<div class="wrapper" ref="wrapper">
			<ul>
				<MRankItem v-for="(item,index) in rankListData" :key="item.id" :itemData="item" @func="jumpRankDetail(item.id,index)"/>
			</ul>
			</div>
		</div>
		<transition>
			<router-view :artistInfo="artistInfo" :artistListData="artistListData"/>
		</transition>
	</div>
</template>

<script>
	import {rankList} from '@/api/rank.js'
	import MRankItem from '@/components/m-rankItem'
	import BScroll from 'better-scroll'
	export default{
		name:'Rank',
		data(){
			return({
				rankListData : [],
				// 传值使用
				busData : '',
				MUSIC_APP_TOP : [0,1,2,3,22,23],
				artistInfo:'',
				artistListData :''
			})
		},
		mounted(){
			this.MUSIC_APP_TOP.forEach(item => {
				this.getRankItemData(item)
			})
			this.$nextTick(() => {
					new BScroll(this.$refs.wrapper,{
						click:true
					})
			 })
		},
		components:{
			MRankItem
		},
		methods:{
			getRankItemData(id){
				rankList(id).then(res => {
					this.rankListData.push(res.playlist)
				})
			},
			jumpRankDetail(sid,index){
				console.log(sid,index)
				this.busData = this.rankListData[index]
				this.artistInfo = this.busData
				this.artistListData = this.busData.tracks
				this.$router.push('rank/' + sid)
			}
		}
	}
</script>

<style lang="stylus" scoped>
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
	.rank
		background: #F2F3F4;
		position fixed
		top 88px
		bottom 0
		width 100%
		.rank_list
			height 100%
			padding-top 5px
			overflow hidden
			.wrapper
				width 100%
				height 100%
				overflow hidden
</style>

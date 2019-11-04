<template>
	<div class="rank">
		<div class="rank_list">
			<div class="wrapper" ref="wrapper">
			<ul>
				<MRankItem v-for="item in rankListData" :key="item.id" :itemData="item"/>
			</ul>
			</div>
		</div>
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
				MUSIC_APP_TOP : [0,1,2,3,22,23]
			})
		},
		mounted(){
			this.MUSIC_APP_TOP.forEach(item => {
				this.getRankItemData(item)
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
		components:{
			MRankItem
		},
		methods:{
			getRankItemData(id){
				rankList(id).then(res => {
					this.rankListData.push(res.playlist)
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
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

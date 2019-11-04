<template>
	<div class="singer">
		<div class="listView">
			<ul>
		
			</ul>
			<div class="indexList">
				<ul>
					<li></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { getArtistsList } from '@/api/singer.js'
	import pinyin from 'pinyin'
	export default{
		name:'Singer',
		data(){
			return({
				artists : [],
				indexListData : [],
				data : [],
			})
		},
		mounted(){
			getArtistsList().then( res => {
				this.data = res.artists
				this.getartistsData()
			})
			console.log(this.artists)
		},
		methods:{
			getartistsData(){
				// for(let i = 0 ; i < this.data.length ; i++){
				// 	if(this.artists.length != 0){
				// 		for(let j = 0 ; j < this.artists.length;j++){
				// 			if(this.artists[j].index == this.getPinyinFirst(this.data[i].name)){
				// 				this.artists[j].singers.push(this.data[i])
				// 				break;
				// 			}else{
				// 				this.artists.push({
				// 					index : this.getPinyinFirst(this.data[i].name),
				// 					singers : [this.data[i]]
				// 				})
				// 			}
				// 		}
				// 	}else{
				// 		this.artists.push({
				// 			index : this.getPinyinFirst(this.data[i].name),
				// 			singers : [this.data[i]]
				// 		})
				// 	}
				// }
				this.data.forEach((item,index)=>{
					
				})
			},
			// 返回拼音首字母
			getPinyinFirst(char){
				const firstLetter = pinyin(char,{
					style : pinyin.STYLE_FIRST_LETTER
				})
				return firstLetter[0][0]
			}
		}
	}
</script>

<style lang="stylus" scpoed>
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
			.indexList
				position absolute
				right 3px
				width 20px
				text-align center
				border-radius 3px
				font-family Helvetica
				transform translateY(-50%)
				top 50%
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  // 是否弹出播放列表
	  isPlay : false,
	  // 当前播放歌曲id
	  curSongId : '',
	  // 是否打开mini列表
	  isMiniList : false,
	  // 是否打开mini播放
	  isMiniPlay: false,
	  // 播放列表歌单
	  playList : []
  },
  mutations: {
	  playSwitch(state){
		return state.isPlay = !state.isPlay
	  },
	  setCurSongId(state,payload){
		state.curSongId = payload.id
	  }
  },
  actions: {
  },
  modules: {
  }
})

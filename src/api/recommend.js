// 推荐api
import http from './httpRequest.js'

// 推荐歌单
export const personalized = params => {
	return http({
		url:'/personalized',
        method : 'get',
        params
	})
}

//推荐歌曲
export const newsong = params => {
	return http({
		url:'/personalized/newsong',
        method : 'get',
        params
	})
}

// 跳转推荐歌单
export const recommendList = params => {
	return http({
		url:'/playlist/detail',
        method : 'get',
        params
	})
}
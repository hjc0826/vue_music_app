import http from './httpRequest.js'

// 排行歌单
export const rankList = id => {
	return http({
		url:`/top/list?idx=${id}`,
		method : 'get'
	})
}
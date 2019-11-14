import http from './httpRequest.js'

// 播放音乐地址
export const SongMusci = params => {
	return http({
		url : '/song/url',
		method : 'get',
		params
	})
}
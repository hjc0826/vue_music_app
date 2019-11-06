import http from './httpRequest.js'

// 获取歌手列表
export const getArtistsList = params => {
	return http({
		url : `/top/artists?limit=100`,
		method: 'get',
		params
	})
}

// 获取歌手作品
export const getArtistsDetail = params => {
	return http({
		url : '/artists',
		method: 'get',
		params
	})
}

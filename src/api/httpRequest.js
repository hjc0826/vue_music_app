import axios from 'axios'
import qs from 'qs'

const http = axios.create({
	// 在axios请求之前在请求路径中添加baseurl
	// baseURL: process.env.VUE_APP_BASE_API,
	baseURL : 'http://localhost:3000',
	timeout: 5000
})

// 请求参数处理
http.interceptors.request.use(config => {
	
		config.method === 'post' ?
			config.data = qs.stringify({ 
				...config.data
			}) 
			:
			config.params = { 
				...config.params
			};
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		return config;
	}, 
	//请求错误处理
	error => {

		Promise.reject(error)
	})

// 请求响应处理
http.interceptors.response.use(
	response => {
		// 成功请求到数据
		//这里根据后端提供的数据进行对应的处理
		if (response.data.code === 200) {
			return response.data;
		} else {
			//常规错误处理
			console.log('error')
		}
	},
	//响应错误处理
	error => {
		console.log('错误了');
		console.log(error);
		console.log(JSON.stringify(error));

		let text = JSON.parse(JSON.stringify(error)).response.status === 404 ?
			'404' :
			'网络异常，请重试';


		return Promise.reject(error)
	}
);

export default http

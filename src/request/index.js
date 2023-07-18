import axios from 'axios';

// 创建一个 axios 实例
const http = axios.create({
	baseURL: 'http://localhost:8080', // 所有的请求地址前缀部分
	timeout: 6000, // 请求超时时间毫秒
})

export default http
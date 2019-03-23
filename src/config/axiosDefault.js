import axios from 'axios'
import qs from 'qs'
import config from '@/config/config'

axios.defaults.baseURL = config.host
// axios.defaults.withCredentials = true   //跨域时携带cookie凭证。axios默认跨域请求不带cookie

//设置post请求的请求头，防止post请求以Request Payload的形式传递参数。设置utf-8格式防止传递中文参数，后端接收是乱码
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'


//请求拦截器，在向服务器请求之前执行
axios.interceptors.request.use(config => {
    //修正post请求，传参以request payload的形式。改为和jq.ajax相同的Form Data形式传参
    // if (config.method === 'post') {
    //     //参数是否需要qs处理判定
    //     config.noQs || (config.data = qs.stringify(config.data))
    // }
    // console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器，在服务器响应回调函数之前执行
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export {axios}













// //创建一个axios实例，并在上面进行配置
// var instance = axios.create({
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//     }
// })
// export default instance
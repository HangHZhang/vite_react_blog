import axios from 'axios'
import {message} from 'antd'

const instance = axios.create({
    baseURL: "http://127.0.0.1:4523/m1/2258972-0-default",
    timeout: 5000,
})

// instance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// })

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const status = error.response.status;
    let errorMsg = '请求出错了';
    switch (status) {
        case 401:
            errorMsg = '未登录或登录过期，请重新登陆';
            break;
        case 404: 
            errorMsg = '请求资源不存在';
            break;
        case 500: 
            errorMsg = '服务器内部错误，请稍后再试';
            break;
    }
    message.error(errorMsg);
    return Promise.reject(errorMsg);
})

export default function ajax(url='',data={},type='GET') {
    return new Promise(resolve => {
        var promise
        if (type === 'GET') {
            promise = axios.get(instance.defaults.baseURL + url,{ /* 第二个参数为配置对象 */
                params: data
            })
        } else {
            promise = axios.post(instance.defaults.baseURL + url,data) /* 第三个参数为配置对象 */
        }
        promise.then((data)=>{
            resolve(data.data)
        }).catch (err => {
            message.error('请求出错了:' + err.message)
        })
    })
}
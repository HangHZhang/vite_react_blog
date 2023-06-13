import axios from 'axios'
import {message} from 'antd'

export default function ajax(url='',data={},type='GET') {
    return new Promise(resolve => {
        var promise
        if (type === 'GET') {
            promise = axios.get(url,{ /* 第二个参数为配置对象 */
                params: data
            })
        } else {
            promise = axios.post(url,data) /* 第三个参数为配置对象 */
        }
        promise.then((data)=>{
            resolve(data.data)
        }).catch (err => {
            message.error('请求出错了:' + err.message)
        })
    })
}
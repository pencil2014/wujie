import axios from 'axios'
import { getToken, parseTime, logOut } from '@/utils'
import { MessageBox } from 'element-ui'
// token 是否过期
let expired_time = localStorage.getItem('expired_time')
if (expired_time && expired_time < Date.now()) {
    MessageBox.confirm('请重新登录', '提示', {
      showCancelButton: false,
      confirmButtonText: '去登录',
      // cancelButtonText: '取消',
      type: 'warning'
    }).then(res => {
      logOut()
    })
}

// create an axios instance
const service = axios.create({
  timeout: 60 * 1000 //超时时间
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    config.headers['Authorization'] = token
    const defaultParams = {
      fromSystem: 'web_H5',
      toSystem: 'mng_base_server', //---必填，通过网关转发系统时会校验
      reqId: new Date().getTime(), // 改成时间戳
      reqTime: parseTime(new Date().getTime()) // 时间格式 yyyy-mm-dd hh:mm:ss
    }
    if (config.method === 'post') {
      config.data = Object.assign(defaultParams, { data: config.data })
    }
    if (config.method === 'get') {
      Object.assign(config.params, defaultParams)
    }
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 0) {
      // token验证失败，失效
      if (res.code === 100004 || res.code === 100005) {
        MessageBox.confirm('请重新登录', '提示', {
          showCancelButton: false,
          confirmButtonText: '去登录',
          // cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          logOut()
        })  
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default service
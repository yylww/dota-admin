import { message } from 'antd'
import axios from 'axios'
import { redirect } from 'next/navigation'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const isServer = typeof window === 'undefined'

const service = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

service.interceptors.request.use(async config => {
  if (isServer) {
    // 服务端组件
    const { cookies } = (await import('next/headers'))
    const token = cookies().get('token').value
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } else {
    // 客户端组件
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
})

service.interceptors.response.use(response => {
  const res = response.data
  if (res.statusCode === 200) {
    return res.data
  } else {
    if (res.statusCode === 401) {
      console.log('登录失效')
      window.location.replace('/login')
    } else {
      message.error(res.message)
    }
  }
})

export default service

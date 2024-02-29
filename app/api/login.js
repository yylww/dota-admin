import request from '@/app/utils/request'

export function login(data) {
  return request({
    url: `/auth/login`,
    method: 'POST',
    data,
  })
}
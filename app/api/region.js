import request from '@/app/utils/request'

export function createRegion(data) {
  return request({
    url: `/regions`,
    method: 'POST',
    data,
  })
}

export function updateRegion(id, data) {
  return request({
    url: `/regions/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getRegionList(params) {
  return request({
    url: `/regions`,
    method: 'GET',
    params,
  })
}

export function getRegion(id) {
  return request({
    url: `/regions/${id}`,
    method: 'GET',
  })
}

export function deleteRegion(id) {
  return request({
    url: `/regiones/${id}`,
    method: 'DELETE',
  })
}
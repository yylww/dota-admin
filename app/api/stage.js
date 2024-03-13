import request from '@/app/utils/request'

export function createStage(data) {
  return request({
    url: `/stages`,
    method: 'POST',
    data,
  })
}

export function updateStage(id, data) {
  return request({
    url: `/stages/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getStageList(params) {
  return request({
    url: `/stages`,
    method: 'GET',
    params,
  })
}

export function getAllStage() {
  return request({
    url: `/stages/all`,
    method: 'GET',
  })
}

export function getStage(id) {
  return request({
    url: `/stages/${id}`,
    method: 'GET',
  })
}

export function deleteStage(id) {
  return request({
    url: `/stages/${id}`,
    method: 'DELETE',
  })
}
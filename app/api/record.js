import request from '@/app/utils/request'

export function createRecord(data) {
  return request({
    url: `/records`,
    method: 'POST',
    data,
  })
}

export function updateRecord(id, data) {
  return request({
    url: `/records/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getRecordList(params) {
  return request({
    url: `/records`,
    method: 'GET',
    params,
  })
}

export function getAllRecord() {
  return request({
    url: `/records/all`,
    method: 'GET',
  })
}

export function getRecord(id) {
  return request({
    url: `/records/${id}`,
    method: 'GET',
  })
}

export function deleteRecord(id) {
  return request({
    url: `/records/${id}`,
    method: 'DELETE',
  })
}
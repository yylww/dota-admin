import request from '@/app/utils/request'

export function createMatch(data) {
  return request({
    url: `/matches`,
    method: 'POST',
    data,
  })
}

export function updateMatch(id, data) {
  return request({
    url: `/matches/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getMatchList(params) {
  return request({
    url: `/matches`,
    method: 'GET',
    params,
  })
}

export function getAllMatch() {
  return request({
    url: `/matches/all`,
    method: 'GET',
  })
}

export function getMatch(id) {
  return request({
    url: `/matches/${id}`,
    method: 'GET',
  })
}

export function deleteMatch(id) {
  return request({
    url: `/matches/${id}`,
    method: 'DELETE',
  })
}
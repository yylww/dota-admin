import request from '@/app/utils/request'

export function createTeam(data) {
  return request({
    url: `/teams`,
    method: 'POST',
    data,
  })
}

export function updateTeam(id, data) {
  return request({
    url: `/teams/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getTeamList(params) {
  return request({
    url: `/teams`,
    method: 'GET',
    params,
  })
}

export function getTeam(id) {
  return request({
    url: `/teams/${id}`,
    method: 'GET',
  })
}

export function deleteTeam(id) {
  return request({
    url: `/teams/${id}`,
    method: 'DELETE',
  })
}
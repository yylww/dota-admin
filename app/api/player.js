import request from '@/app/utils/request'

export function createPlayer(data) {
  return request({
    url: `/players`,
    method: 'POST',
    data,
  })
}

export function updatePlayer(id, data) {
  return request({
    url: `/players/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getPlayerList(params) {
  return request({
    url: `/players`,
    method: 'GET',
    params,
  })
}

export function getAllPlayer() {
  return request({
    url: `/players/all`,
    method: 'GET',
  })
}

export function getPlayer(id) {
  return request({
    url: `/players/${id}`,
    method: 'GET',
  })
}

export function deletePlayer(id) {
  return request({
    url: `/players/${id}`,
    method: 'DELETE',
  })
}
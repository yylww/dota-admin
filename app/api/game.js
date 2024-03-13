import request from '@/app/utils/request'

export function createGame(data) {
  return request({
    url: `/games`,
    method: 'POST',
    data,
  })
}

export function updateGame(id, data) {
  return request({
    url: `/games/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getGameList(params) {
  return request({
    url: `/games`,
    method: 'GET',
    params,
  })
}

export function getAllGame() {
  return request({
    url: `/games/all`,
    method: 'GET',
  })
}

export function getGame(id) {
  return request({
    url: `/games/${id}`,
    method: 'GET',
  })
}

export function deleteGame(id) {
  return request({
    url: `/games/${id}`,
    method: 'DELETE',
  })
}
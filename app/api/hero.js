import request from '@/app/utils/request'

export function createHero(data) {
  return request({
    url: `/heroes`,
    method: 'POST',
    data,
  })
}

export function updateHero(id, data) {
  return request({
    url: `/heroes/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getHeroList(params) {
  return request({
    url: `/heroes`,
    method: 'GET',
    params,
  })
}

export function getAllHero() {
  return request({
    url: `/heroes/all`,
    method: 'GET',
  })
}

export function getHero(id) {
  return request({
    url: `/heroes/${id}`,
    method: 'GET',
  })
}

export function deleteHero(id) {
  return request({
    url: `/heroes/${id}`,
    method: 'DELETE',
  })
}
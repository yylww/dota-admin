import request from '@/app/utils/request'

export function createTournament(data) {
  return request({
    url: `/tournaments`,
    method: 'POST',
    data,
  })
}

export function updateTournament(id, data) {
  return request({
    url: `/tournaments/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getTournamentList(params) {
  return request({
    url: `/tournaments`,
    method: 'GET',
    params,
  })
}

export function getAllTournament(params) {
  return request({
    url: `/tournaments/all`,
    method: 'GET',
    params,
  })
}

export function getTournament(id) {
  return request({
    url: `/tournaments/${id}`,
    method: 'GET',
  })
}

export function deleteTournament(id) {
  return request({
    url: `/tournaments/${id}`,
    method: 'DELETE',
  })
}
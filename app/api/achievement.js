import request from '@/app/utils/request'

export function createAchievement(data) {
  return request({
    url: `/achievements`,
    method: 'POST',
    data,
  })
}

export function updateAchievement(id, data) {
  return request({
    url: `/achievements/${id}`,
    method: 'PATCH',
    data,
  })
}

export function getAchievementList(params) {
  return request({
    url: `/achievements`,
    method: 'GET',
    params,
  })
}

export function getAllAchievement() {
  return request({
    url: `/achievements/all`,
    method: 'GET',
  })
}

export function getAchievement(id) {
  return request({
    url: `/achievements/${id}`,
    method: 'GET',
  })
}

export function deleteAchievement(id) {
  return request({
    url: `/achievements/${id}`,
    method: 'DELETE',
  })
}
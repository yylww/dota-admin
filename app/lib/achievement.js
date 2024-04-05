'use server'

import prisma from "@/app/utils/db"

export async function getAchievement(id) {
  return prisma.achievement.findUnique({
    where: { id },
  })
}

export async function getAchievements() {
  return prisma.achievement.findMany()
}

export async function getAchievementList(query, take, skip) {
  return {
    list: await prisma.achievement.findMany({
      where: {
        tournament: {
          title: { contains: query },
        },
      },
      take,
      skip,
      include: {
        tournament: true,
        teams: true,
      },
    }),
    total: await prisma.achievement.count(),
  } 
}

export async function createAchievement(data) {
  return prisma.achievement.create({
    data,
  })
}

export async function updateAchievement(id, data) {
  return prisma.achievement.update({
    where: { id },
    data,
  })
}

export async function deleteAchievement(id) {
  return prisma.achievement.delete({
    where: { id },
  })
}
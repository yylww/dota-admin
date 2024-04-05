'use server'

import prisma from "@/app/utils/db"

export async function getStage(id) {
  return prisma.stage.findUnique({
    where: { id },
    include: {
      tournament: true,
      matches: {
        include: {
          games: {
            include: {
              records: true,
            }
          },
          homeTeam: true,
          awayTeam: true,
        }
      },
    },
  })
}

export async function getStages() {
  return prisma.stage.findMany({
    include: {
      tournament: true,
    }
  })
}

export async function getStageList(query, take, skip) {
  const whereCondition = query ? {
    tournament: {
      title: { contains: query },
    },
  } : {}
  return {
    list: await prisma.stage.findMany({
      where: whereCondition,
      take,
      skip,
      include: {
        tournament: true,
      },
    }),
    total: await prisma.stage.count({ where: whereCondition }),
  } 
}

export async function createStage(data) {
  return prisma.stage.create({
    data,
  })
}

export async function updateStage(id, data) {
  return prisma.stage.update({
    where: { id },
    data,
  })
}

export async function deleteStage(id) {
  return prisma.stage.delete({
    where: { id },
  })
}
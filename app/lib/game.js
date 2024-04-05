'use server'

import prisma from "@/app/utils/db"

export async function getGame(id) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      teams: true,
    },
  })
}

export async function getGames() {
  return prisma.game.findMany({
    include: {
      teams: true,
    }
  })
}

export async function getGameList(query, take, skip) {
  const whereCondition = query ? {
    matchId: query,
  } : {}
  return {
    list: await prisma.game.findMany({
      where: whereCondition,
      take,
      skip,
      include: {
        radiant: true,
        dire: true,
        records: true,
      },
    }),
    total: await prisma.game.count({ where: whereCondition }),
  } 
}

export async function createGame(data) {
  return prisma.game.create({
    data,
  })
}

export async function updateGame(id, data) {
  return prisma.game.update({
    where: { id },
    data,
  })
}

export async function deleteGame(id) {
  // 删除game时，先删除相关records
  await prisma.game.update({
    where: { id },
    data: {
      records: {
        deleteMany: {},
      },
    },
  })
  return prisma.game.delete({
    where: { id },
  })
}
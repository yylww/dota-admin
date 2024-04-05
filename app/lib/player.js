'use server'

import prisma from "@/app/utils/db"

export async function getPlayer(id) {
  return prisma.player.findUnique({
    where: { id },
    include: {
      team: true,
    },
  })
}

export async function getPlayers() {
  return prisma.player.findMany()
}

export async function getPlayerList(query, take, skip) {
  const or = query ? { nickname: { contains: query } } : {}
  return {
    list: await prisma.player.findMany({
      where: {
        ...or,
      },
      take,
      skip,
      include: {
        team: true,
      },
    }),
    total: await prisma.player.count({ where: { ...or }}),
  } 
}

export async function createPlayer(data) {
  return prisma.player.create({
    data,
  })
}

export async function updatePlayer(id, data) {
  return prisma.player.update({
    where: { id },
    data,
  })
}

export async function deletePlayer(id) {
  return prisma.player.delete({
    where: { id },
  })
}
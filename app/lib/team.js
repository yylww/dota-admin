'use server'

import prisma from "@/app/utils/db"

export async function getTeam(id) {
  return prisma.team.findUnique({
    where: { id },
  })
}

export async function getTeams() {
  return prisma.team.findMany()
}

export async function getTeamList(query, take, skip) {
  const or = query ? {
    OR: [
      { name: { contains: query } },
      { tag: { contains: query } },
    ]
  } : {}
  return {
    list: await prisma.team.findMany({
      where: {
        ...or,
      },
      take,
      skip,
      include: {
        region: true,
        players: true,
      },
    }),
    total: await prisma.team.count({ where: { ...or }}),
  } 
}

export async function createTeam(data) {
  return prisma.team.create({
    data,
  })
}

export async function updateTeam(id, data) {
  return prisma.team.update({
    where: { id },
    data,
  })
}

export async function deleteTeam(id) {
  return prisma.team.delete({
    where: { id },
  })
}
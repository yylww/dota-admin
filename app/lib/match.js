'use server'

import prisma from "@/app/utils/db"

export async function getMatch(id) {
  return prisma.match.findUnique({
    where: { id },
    include: {
      tournament: true,
      stage: true,
      homeTeam: true,
      awayTeam: true,
    },
  })
}

export async function getMatches() {
  return prisma.match.findMany({
    include: {
      games: true,
      homeTeam: true,
      awayTeam: true,
    }
  })
}

export async function getMatchList(query, take, skip) {
  const whereCondition = query ? {
    OR: [
      { homeTeam: { name: { contains: query } }},
      { awayTeam: { name: { contains: query } }},
    ],
  } : {}
  return {
    list: await prisma.match.findMany({
      where: whereCondition,
      take,
      skip,
      include: {
        tournament: true,
        stage: true,
        homeTeam: true,
        awayTeam: true,
        games: {
          include: {
            records: true,
          }
        }
      },
    }),
    total: await prisma.match.count({ where: whereCondition }),
  } 
}

export async function createMatch(data) {
  return prisma.match.create({
    data,
  })
}

export async function updateMatch(id, data) {
  return prisma.match.update({
    where: { id },
    data,
  })
}

export async function deleteMatch(id) {
  return prisma.match.delete({
    where: { id },
  })
}
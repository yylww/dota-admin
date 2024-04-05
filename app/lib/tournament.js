'use server'

import prisma from "@/app/utils/db"

export async function getTournament(id) {
  return prisma.tournament.findUnique({
    where: { id },
    include: {
      achievements: {
        include: {
          teams: true,
        },
      },
      teams: true,
    },
  })
}

export async function getTournaments() {
  return prisma.tournament.findMany({
    include: {
      stages: {
        include: {
          matches: {
            include: {
              homeTeam: true,
              awayTeam: true,
            }
          },
        }
      },
    }
  })
}

export async function getTournamentList(query, take, skip) {
  const whereCondition = query ? {
    title: { contains: query },
  } : {}
  return {
    list: await prisma.tournament.findMany({
      where: whereCondition,
      take,
      skip,
      include: {
        teams: true,
      },
    }),
    total: await prisma.tournament.count({ where: whereCondition }),
  } 
}

export async function createTournament(data) {
  return prisma.tournament.create({
    data,
  })
}

export async function updateTournament(id, data) {
  return prisma.tournament.update({
    where: { id },
    data,
  })
}

export async function deleteTournament(id) {
  return prisma.tournament.delete({
    where: { id },
  })
}
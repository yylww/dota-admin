'use server'

import prisma from "@/app/lib/db"

export const getLatestTournamentId = async () => {
  try {
    const tournaments = await prisma.tournament.findMany({
      orderBy: {
        id: 'desc'
      },
      take: 1,
    })
    return tournaments[0].id
  } catch (error) {
    throw error
  }
}

export const getTournament = async (id) => {
  try {
    return prisma.tournament.findUnique({ 
      where: { id },
      include: {
        achievements: {
          include: {
            teams: true,
          },
        },
        stages: {
          orderBy: {
            startDate: 'asc',
          },
          include: {
            matches: {
              include: {
                homeTeam: true,
                awayTeam: true,
              },
            },
          },
        },
        teams: {
          include: {
            players: true,
          },
        },
      }
    })
  } catch (error) {
    throw error
  }
}

export const getTournaments = async ({ take, skip, orderBy, include } = {}) => {
  try {
    return prisma.tournament.findMany({
      take,
      skip,
      orderBy: orderBy ?? { startDate: 'desc' },
      include: include ? {
        stages: {
          include: {
            matches: {
              orderBy: {
                startTime: 'desc',
              },
              include: {
                homeTeam: true,
                awayTeam: true,
              },
            },
          },
        },
      } : undefined,
    })
  } catch (error) {
    throw error
  }
}

export const createTournament = async (data) => {
  try {
    return prisma.tournament.create({
      data: {
        ...data,
        teams: {
          connect: data.teams.map(id => ({ id })),
        },
      }
    })
  } catch (error) {
    throw error
  }
}

export const updateTournament = async (id, data) => {
  try {
    return prisma.tournament.update({ 
      where: { id },
      data: {
        ...data,
        teams: {
          set: data.teams.map(id => ({ id })),
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const deleteTournament = async (id) => {
  try {
    return prisma.tournament.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
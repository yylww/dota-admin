'use server'

import prisma from "@/app/lib/db";

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

export const getTournaments = async ({ take, skip }) => {
  try {
    const tournaments = await prisma.tournament.findMany({
      orderBy: [
        { createdAt: 'desc' },
      ],
      take,
      skip,
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
        matches: {
          include: {
            homeTeam: true,
            awayTeam: true,
          }
        },
      }
    })
    return tournaments
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
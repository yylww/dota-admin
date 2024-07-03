'use server'

import prisma from "@/app/lib/db"

export const getMatch = async (id) => {
  try {
    return prisma.match.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        stage: true,
        homeTeam: true,
        awayTeam: true,
        games: {
          orderBy: {
            startTime: 'asc',
          },
          include: {
            radiant: true,
            dire: true,
            records: {
              include: {
                player: true,
                hero: true,
              },
            },
            bans: {
              include: {
                hero: true,
              },
            },
            picks: {
              include: {
                hero: true,
              },
            },
          }
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const getMatches = async ({ 
  tournamentId,
  teamId,
  teamIds,
  status, 
  orderBy, 
  take, 
  skip,
} = {}) => {
  const where = {}
  if (tournamentId) {
    where.tournament = { id: tournamentId }
  }
  if (teamId) {
    where.OR = [
      { homeTeamId: teamId },
      { awayTeamId: teamId },
    ]
  }
  if (teamIds) {
    where.OR = [
      { homeTeamId: teamIds[0], awayTeamId: teamIds[1] },
      { homeTeamId: teamIds[1], awayTeamId: teamIds[0] },
    ]
  }
  if (status) {
    where.status = { in: status }
  }
  try {
    return prisma.match.findMany({
      where,
      take,
      skip,
      orderBy: orderBy ?? [{ status: 'asc'}, { startTime: 'desc' }],
      include: {
        tournament: true,
        stage: true,
        homeTeam: true,
        awayTeam: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const createMatch = async (data) => {
  try {
    return prisma.match.create({ data })
  } catch (error) {
    throw error
  }
}

export const updateMatch = async (id, data) => {
  try {
    return prisma.match.update({ 
      where: { id },
      data, 
    })
  } catch (error) {
    throw error
  }
}

export const deleteMatch = async (id) => {
  try {
    return prisma.match.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
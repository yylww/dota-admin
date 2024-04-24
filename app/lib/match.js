'use server'

import prisma from "@/app/lib/db";

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

export const getMatches = async ({ status, ids, orderBy, take, skip }) => {
  const where = {}
  if (status !== undefined) {
    where.status = { equals: status }
  }
  if (ids) {
    where.OR = [
      { homeTeamId: ids[0], awayTeamId: ids[1] },
      { homeTeamId: ids[1], awayTeamId: ids[0] },
    ]
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
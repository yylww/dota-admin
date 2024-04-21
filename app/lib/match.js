'use server'

import prisma from "@/app/utils/db";

export const getMatch = async (id) => {
  try {
    const match = await prisma.match.findUnique({ 
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
    return match
  } catch (error) {
    console.log('Failed', error)
    return { 
      success: false,
      message: error.message, 
    }
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
    const matches = await prisma.match.findMany({
      where,
      take,
      skip,
      orderBy: orderBy ?? [{ status: 'asc'}, { startTime: 'desc' }],
      include: {
        tournament: true,
        stage: true,
        homeTeam: true,
        awayTeam: true,
      }
    })
    return matches
  } catch (error) {
    console.log('Failed', error)
    return { 
      success: false,
      message: error.message,  
    }
  }
}

export const updateMatch = async (id, data) => {
  try {
    await prisma.match.update({ 
      where: { id },
      data, 
    })
    return { 
      success: true,
      message: 'success', 
    }
  } catch (error) {
    console.log('Failed', error)
    return { 
      success: false,
      message: error.message,  
    }
  }
}
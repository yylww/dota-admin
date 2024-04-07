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
  const { stageId, teamId } = query
  const or = !!teamId ? {
    OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
  } : {}
  const whereCondition = {
    stageId,
    ...or,
  }
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
  try {
    const match = await prisma.match.create({ data })
    return match
  } catch (error) {
    console.log('Failed', error)
    throw new Error(error)
  }
}

export async function updateMatch(id, data) {
  try {
    const match = await prisma.match.update({ 
      where: { id },
      data, 
    })
    return match
  } catch (error) {
    console.log('Failed', error)
    throw new Error(error)
  }
}

export async function deleteMatch(id) {
  return prisma.match.delete({
    where: { id },
  })
}
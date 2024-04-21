'use server'

import prisma from "@/app/lib/db";

export const getGame = async (id) => {
  try {
    return prisma.game.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        stage: true,
        radiant: true,
        dire: true,
        records: true,
        bans: true,
        picks: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getGames = async () => {
  try {
    return prisma.game.findMany({
      orderBy: [
        { startTime: 'desc' },
      ],
      include: {
        radiant: true,
        dire: true,
        records: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const createGame = async (data) => {
  try {
    const game = await prisma.game.create({
      data: {
        ...data,
        records: {
          create: data.records,
        },
        bans: {
          create: data.bans
        },
        picks: {
          create: data.picks
        },
      },
      include: {
        match: true,
      },
    })
    // 创建game之后，更新match状态和比分
    let { homeTeamId, homeScore, awayScore, status, bo } = game.match
    if (homeTeamId === game.radiantTeamId) {
      game.radiantWin ? (homeScore += 1) : (awayScore += 1)
    } else {
      !game.radiantWin ? (homeScore += 1) : (awayScore += 1)
    }
    if (homeScore + awayScore === bo) {
      status = 2
    } else {
      status = [homeScore, awayScore].some(item => Number(item) > (bo / 2)) ? 2 : 1
    }
    await prisma.match.update({
      where: { id: game.matchId },
      data: {
        homeScore,
        awayScore,
        status,
      }
    })
    return game
  } catch (error) {
    throw error
  }
}

export const updateGame = async (id, data) => {
  try {
    return prisma.game.update({ 
      where: { id },
      data,
    })
  } catch (error) {
    throw error
  }
}

export const deleteGame = async (id) => {
  try {
    // 删除game时，先删除相关records、bans、picks
    await prisma.game.update({
      where: { id },
      data: {
        records: {
          deleteMany: {},
        },
        bans: {
          deleteMany: {},
        },
        picks: {
          deleteMany: {},
        },
      },
    })
    return prisma.game.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
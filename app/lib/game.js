'use server'

import prisma from "@/app/utils/db"

export async function getGame(id) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      teams: true,
    },
  })
}

export async function getGames() {
  return prisma.game.findMany({
    include: {
      radiant: true,
      dire: true,
      records: true,
    }
  })
}

export async function getGameList(query, take, skip) {
  const whereCondition = query ? {
    matchId: query,
  } : {}
  return {
    list: await prisma.game.findMany({
      where: whereCondition,
      take,
      skip,
      include: {
        radiant: true,
        dire: true,
        records: true,
      },
    }),
    total: await prisma.game.count({ where: whereCondition }),
  } 
}

export async function createGame(data) {
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
    }
  })
  // 创建game之后，更新match状态和比分
  const match = await prisma.match.findUnique({
    where: { id: game.matchId },
  })
  let { homeTeamId, homeScore, awayScore, status, bo } = match
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
}

export async function updateGame(id, data) {
  return prisma.game.update({
    where: { id },
    data,
  })
}

export async function deleteGame(id) {
  // 删除game时，先删除相关records
  await prisma.game.update({
    where: { id },
    data: {
      records: {
        deleteMany: {},
      },
    },
  })
  return prisma.game.delete({
    where: { id },
  })
}
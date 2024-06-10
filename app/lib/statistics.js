'use server'

import prisma from "@/app/lib/db"

export const getStatisticData = async ({ tournamentId, teamId, take, skip } = {}) => {
  const whereCondition = {}
  if (tournamentId) {
    whereCondition.tournamentId = tournamentId
  }
  if (teamId) {
    whereCondition.OR = [
      { radiantTeamId: teamId },
      { direTeamId: teamId },
    ]
  }
  try {
    return prisma.game.findMany({
      where: whereCondition,
      take,
      skip,
      include: {
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
      },
    })
  } catch (error) {
    throw error
  }
}

export const getStatistics = async ({ tournamentId, teamId }) => {
  const whereCondition = {}
  if (tournamentId) {
    whereCondition.tournamentId = tournamentId
  }
  if (teamId) {
    whereCondition.OR = [
      { radiantTeamId: teamId },
      { direTeamId: teamId },
    ]
  }
  try {
    const games = await prisma.game.findMany({
      include: {
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
      },
    })
    const heroes = await prisma.hero.findMany()
    
    const banObj = {}
    const pickObj = {}
    games.map(game => {
      const { bans, picks, radiantWin } = game
      bans.map(ban => {
        const { heroId, hero } = ban
        if (banObj[heroId]) {
          banObj[heroId].count += 1
        } else {
          banObj[heroId] = { 
            ...hero, 
            count: 1,
          }
        }
      })
      picks.map(pick => {
        const { heroId, hero, radiant } = pick
        if (pickObj[heroId]) {
          pickObj[heroId].count += 1
          if (radiantWin === radiant) {
            pickObj[heroId].winCount += 1
          }
        } else {
          pickObj[heroId] = { 
            ...hero, 
            count: 1,
            winCount: radiantWin === radiant ? 1 : 0,
          }
        }
      })
    })
    const banRanking = Object.values(banObj).map(item => ({ ...item, percent: (item.count / games.length).toFixed(3) }))
    const pickRanking = Object.values(pickObj).map(item => ({ ...item, percent: (item.count / games.length).toFixed(3) }))
    const rateRanking = Object.values(pickObj).map(item => ({ ...item, percent: (item.winCount / item.count).toFixed(3) }))

    const pickHeroIds = Object.keys(pickObj).map(id => +id)
    const noplays = heroes.filter(hero => !pickHeroIds.includes(hero.id))

    return {
      banRanking,
      pickRanking,
      rateRanking,
      noplays,
    }
  } catch (error) {
    throw error
  }
}
'use server'

import prisma from "@/app/lib/db";

export const getAchievement = async (id) => {
  try {
    return prisma.achievement.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        teams: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getAchievements = async () => {
  try {
    return prisma.achievement.findMany({
      orderBy: [
        {
          tournament: {
            createdAt: 'desc'
          },
        },
        { bonus: 'desc' },
      ],
      include: {
        tournament: true,
        teams: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const createAchievement = async (data) => {
  try {
    return prisma.achievement.create({
      data: {
        ...data,
        teams: {
          connect: data.teams.map(id => ({ id })),
        },
        players: {
          connect: data.players.map(id => ({ id }))
        },
      }
    })
  } catch (error) {
    throw error
  }
}

export const updateAchievement = async (id, data) => {
  try {
    return prisma.achievement.update({ 
      where: { id },
      data: {
        ...data,
        teams: {
          set: data.teams.map(id => ({ id })),
        },
        players: {
          set: data.players.map(id => ({ id })),
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const deleteAchievement = async (id) => {
  try {
    // 删除achievement时，先删除相关teams、players
    await prisma.game.update({
      where: { id },
      data: {
        teams: {
          deleteMany: {},
        },
        players: {
          deleteMany: {},
        },
      },
    })
    return prisma.achievement.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
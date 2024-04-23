'use server'

import prisma from "@/app/lib/db";

export const getPlayer = async (id) => {
  try {
    return prisma.player.findUnique({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}

export const getPlayers = async () => {
  try {
    return prisma.player.findMany({
      include: {
        team: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const createPlayer = async (data) => {
  try {
    return prisma.player.create({ data })
  } catch (error) {
    throw error
  }
}

export const updatePlayer = async (id, data) => {
  try {
    return prisma.player.update({ 
      where: { id },
      data: {
        ...data,
        teamId: data.teamId ? data.teamId : null,
      }, 
    })
  } catch (error) {
    throw error
  }
}

export const deletePlayer = async (id) => {
  try {
    return prisma.player.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
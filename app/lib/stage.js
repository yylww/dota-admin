'use server'

import prisma from "@/app/lib/db";

export const getStage = async (id) => {
  try {
    return prisma.stage.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        matches: {
          include: {
            games: {
              include: {
                records: true,
              }
            },
            homeTeam: true,
            awayTeam: true,
          }
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const getStages = async () => {
  try {
    return prisma.stage.findMany({
      orderBy: [
        { createdAt: 'desc' },
      ],
      include: {
        tournament: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const createStage = async (data) => {
  try {
    return prisma.stage.create({ data })
  } catch (error) {
    throw error
  }
}

export const updateStage = async (id, data) => {
  try {
    return prisma.stage.update({ 
      where: { id },
      data, 
    })
  } catch (error) {
    throw error
  }
}

export const deleteStage = async (id) => {
  try {
    return prisma.stage.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
'use server'

import prisma from "@/app/lib/db";

export const getRecord = async (id) => {
  try {
    return prisma.record.findUnique({ 
      where: { id },
      include: {
        player: true,
        hero: true,
        game: {
          include: {
            radiant: true,
            dire: true,
          }
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const getRecords = async () => {
  try {
    return prisma.record.findMany({
      orderBy: [
        { createdAt: 'desc' },
      ],
      include: {
        player: {
          include: {
            team: true,
          },
        },
        hero: true,
        game: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const createRecord = async (data) => {
  try {
    return prisma.record.create({ data })
  } catch (error) {
    throw error
  }
}

export const updateRecord = async (id, data) => {
  try {
    return prisma.record.update({ 
      where: { id },
      data,
    })
  } catch (error) {
    throw error
  }
}

export const deleteRecord = async (id) => {
  try {
    return prisma.record.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
'use server'

import prisma from "@/app/lib/db";

export const getRegion = async (id) => {
  try {
    return prisma.region.findUnique({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}

export const getRegions = async () => {
  try {
    return prisma.region.findMany({
      orderBy: [{ id: 'asc' }],
      include: {
        teams: true,
      },
    })
  } catch (error) {
    throw error
  }
}

export const createRegion = async (data) => {
  try {
    return prisma.region.create({ data })
  } catch (error) {
    throw error
  }
}

export const updateRegion = async (id, data) => {
  try {
    return prisma.region.update({ 
      where: { id },
      data, 
    })
  } catch (error) {
    throw error
  }
}

export const deleteRegion = async (id) => {
  try {
    return prisma.region.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
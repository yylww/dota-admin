'use server'

import prisma from "@/app/lib/db";

export const getHero = async (id) => {
  try {
    return prisma.hero.findUnique({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}

export const getHeroes = async () => {
  try {
    return prisma.hero.findMany({
      orderBy: [{ id: 'asc' }],
    })
  } catch (error) {
    throw error
  }
}

export const createHero = async (data) => {
  try {
    return prisma.hero.create({ data })
  } catch (error) {
    throw error
  }
}

export const updateHero = async (id, data) => {
  try {
    return prisma.hero.update({ 
      where: { id },
      data, 
    })
  } catch (error) {
    throw error
  }
}

export const deleteHero = async (id) => {
  try {
    return prisma.hero.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
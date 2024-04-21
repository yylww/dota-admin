'use server'

import prisma from "@/app/lib/db";

export const getTeam = async (id) => {
  try {
    return prisma.team.findUnique({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}

export const getTeams = async () => {
  try {
    return prisma.team.findMany({
      include: {
        players: true,
        region: true,
      }
    })
  } catch (error) {
    throw error
  }
}

export const createTeam = async (data) => {
  try {
    return prisma.team.create({ data })
  } catch (error) {
    throw error
  }
}

export const updateTeam = async (id, data) => {
  try {
    return prisma.team.update({ 
      where: { id },
      data, 
    })
  } catch (error) {
    throw error
  }
}

export const deleteTeam = async (id) => {
  try {
    return prisma.team.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
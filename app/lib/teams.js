'use server'

import prisma from "@/app/utils/db";

export const getTeams = async () => {
  try {
    return prisma.team.findMany()
  } catch (error) {
    console.log('Failed', error)
    return { message: error.message, status: 400 }
  }
}

export const updateMatch = async (id, data) => {
  try {
    await prisma.match.update({ 
      where: { id },
      data, 
    })
    return { message: 'success', status: 200 }
  } catch (error) {
    console.log('Failed', error)
    return { message: error.message, status: 400 }
  }
}
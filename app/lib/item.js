'use server'

import prisma from "@/app/lib/db";

export const getItems = async () => {
  try {
    return prisma.item.findMany()
  } catch (error) {
    throw error
  }
}
